import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  digitalHumanService,
  DigitalHumanEvent,
  DigitalHumanStatus,
} from '../services/digitalHuman';

interface UseDigitalHumanSessionOptions {
  avatarId?: string;
}

export const useDigitalHumanSession = (
  options: UseDigitalHumanSessionOptions = {}
) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<DigitalHumanStatus>('idle');
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = digitalHumanService.subscribe((event: DigitalHumanEvent) => {
      if (event.type === 'status') {
        setStatus(event.status);
      } else if (event.type === 'response') {
        setTranscript((prev) => [...prev, event.text]);
        setSuggestions(event.suggestions ?? []);
        setLastUpdated(Date.now());
      } else if (event.type === 'error') {
        setError(event.message);
      }
    });

    return unsubscribe;
  }, []);

  const startSession = useCallback(async (): Promise<string> => {
    try {
      setError(null);
      const session = await digitalHumanService.startSession(options.avatarId);
      setSessionId(session.sessionId);
      setStreamUrl(session.streamUrl);
      setLastUpdated(Date.now());
      return session.sessionId;
    } catch (err) {
      setError(err instanceof Error ? err.message : '无法启动数字人会话');
      throw err;
    }
  }, [options.avatarId]);

  const stopSession = useCallback(async () => {
    await digitalHumanService.stopSession();
    setSessionId(null);
    setStreamUrl(null);
    setSuggestions([]);
    setStatus('idle');
  }, []);

  const askDigitalHuman = useCallback(
    async (content: string) => {
      let activeSessionId = sessionId;

      if (!activeSessionId) {
        activeSessionId = await startSession();
      }

      await digitalHumanService.sendText(activeSessionId, content);
    },
    [sessionId, startSession]
  );

  const resetTranscript = useCallback(() => {
    setTranscript([]);
    setSuggestions([]);
    setError(null);
  }, []);

  const isActive = useMemo(
    () => status !== 'idle' && !!sessionId,
    [status, sessionId]
  );

  return {
    status,
    sessionId,
    streamUrl,
    transcript,
    suggestions,
    error,
    lastUpdated,
    isActive,
    startSession,
    stopSession,
    askDigitalHuman,
    resetTranscript,
  };
};


