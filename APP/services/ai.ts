// Mock AI service with remote override
// In production, this would call your backend which interfaces with the LLM

import { useConfigStore } from '../store/config';

export interface AIResponse {
  text: string;
  relatedQuestions?: string[];
  analysis?: string; // For photo search
}

const MOCK_IMAGE_RESPONSE: AIResponse = {
  text: '根据您上传的图片，这似乎是一道关于【二次函数】的数学题。\n\n题目要求求解抛物线的顶点坐标。\n\n解析步骤：\n1. 将方程化为顶点式 y = a(x-h)² + k\n2. 读取 (h, k) 即为顶点坐标\n\n答案是 (-1, 3)。',
  analysis: '二次函数; 顶点坐标; 抛物线',
  relatedQuestions: [
    '如何求二次函数的对称轴？',
    '二次函数与x轴的交点怎么求？',
    '抛物线的开口方向由什么决定？',
  ],
};

const MOCK_CHAT_RESPONSE = (message: string): AIResponse => ({
  text: `针对您的问题 "${message}"，\n这里是详细的解答...\n\n（此处为模拟的AI回答，实际应用中将接入大模型API）\n\n关键点在于理解核心概念。`,
  relatedQuestions: ['能举个例子吗？', '这个概念在物理中有什么应用？'],
});

const stripTrailingSlash = (url?: string) =>
  url ? url.replace(/\/+$/, '') : undefined;

const callBackend = async (
  path: string,
  payload: Record<string, unknown>
): Promise<AIResponse> => {
  const baseUrl = stripTrailingSlash(useConfigStore.getState().config.apiBaseUrl);
  if (!baseUrl) {
    throw new Error('API 基础地址未配置');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`服务器返回异常: ${response.status}`);
  }

  const data = (await response.json()) as AIResponse;
  return data;
};

export const analyzeImage = async (imageUri: string): Promise<AIResponse> => {
  try {
    return await callBackend('/ai/analyze-image', { imageUri });
  } catch (error) {
    console.warn('analyzeImage fallback:', error);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return MOCK_IMAGE_RESPONSE;
  }
};

export const chatWithAI = async (message: string): Promise<AIResponse> => {
  try {
    return await callBackend('/ai/chat', { message });
  } catch (error) {
    console.warn('chatWithAI fallback:', error);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_CHAT_RESPONSE(message);
  }
};

