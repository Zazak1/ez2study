const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type DigitalHumanStatus =
  | 'idle'
  | 'preparing'
  | 'listening'
  | 'thinking'
  | 'speaking';

export interface DigitalHumanSession {
  sessionId: string;
  avatarId: string;
  streamUrl: string;
}

export interface DigitalHumanResponseEvent {
  type: 'response';
  text: string;
  suggestions?: string[];
}

export interface DigitalHumanStatusEvent {
  type: 'status';
  status: DigitalHumanStatus;
}

export interface DigitalHumanErrorEvent {
  type: 'error';
  message: string;
}

export type DigitalHumanEvent =
  | DigitalHumanResponseEvent
  | DigitalHumanStatusEvent
  | DigitalHumanErrorEvent;

const SAMPLE_STREAM_URL =
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';

class DigitalHumanService {
  private listeners = new Set<(event: DigitalHumanEvent) => void>();

  subscribe(listener: (event: DigitalHumanEvent) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(event: DigitalHumanEvent) {
    this.listeners.forEach((listener) => listener(event));
  }

  async startSession(avatarId = 'mate-alpha'): Promise<DigitalHumanSession> {
    try {
      this.emit({ type: 'status', status: 'preparing' });
      await delay(800);

      const session: DigitalHumanSession = {
        sessionId: `sess_${Date.now()}`,
        avatarId,
        streamUrl: SAMPLE_STREAM_URL,
      };

      this.emit({ type: 'status', status: 'listening' });
      return session;
    } catch (error) {
      this.emit({
        type: 'error',
        message: '数字人通道启动失败，请稍后再试。',
      });
      throw error;
    }
  }

  async stopSession() {
    this.emit({ type: 'status', status: 'idle' });
  }

  async sendText(sessionId: string, text: string) {
    this.emit({ type: 'status', status: 'thinking' });
    await delay(1200);

    this.emit({
      type: 'response',
      text: `「${text}」的问题我已经收到，现在为你进行讲解。\n\n1. 梳理关键信息\n2. 给出推理步骤\n3. 输出总结与下一步建议`,
      suggestions: [
        '换种方式再讲一次',
        '生成板书讲义',
        '继续追问一个练习题',
      ],
    });

    this.emit({ type: 'status', status: 'speaking' });

    setTimeout(() => {
      this.emit({ type: 'status', status: 'listening' });
    }, 3500);
  }
}

export const digitalHumanService = new DigitalHumanService();


