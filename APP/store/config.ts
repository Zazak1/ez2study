import { create } from 'zustand';
import {
  fetchRemoteConfig,
  RemoteAnnouncement,
  RemoteConfig,
  RemoteFeatureFlags,
} from '../services/config';

const FALLBACK_CONFIG: RemoteConfig = {
  apiBaseUrl: 'https://api.example.com/v1',
  announcement: {
    enabled: true,
    title: '离线模式',
    message: '目前使用默认配置，稍后会自动刷新远程数据。',
    level: 'info',
  },
  featureFlags: {
    digitalHuman: true,
    cameraSearch: true,
  },
  updatedAt: new Date(0).toISOString(),
};

interface ConfigState {
  config: RemoteConfig;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchConfig: () => Promise<void>;
  getFeatureFlag: (flag: keyof RemoteFeatureFlags, fallback?: boolean) => boolean;
  announcement: RemoteAnnouncement | null;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  config: FALLBACK_CONFIG,
  loading: false,
  error: null,
  lastFetched: null,
  announcement: FALLBACK_CONFIG.announcement ?? null,
  fetchConfig: async () => {
    set({ loading: true, error: null });
    try {
      const remote = await fetchRemoteConfig();
      set({
        config: remote,
        loading: false,
        error: null,
        lastFetched: Date.now(),
        announcement: remote.announcement ?? null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : '配置获取失败',
      });
    }
  },
  getFeatureFlag: (flag, fallback = true) => {
    const featureFlags = get().config.featureFlags;
    if (!featureFlags || typeof featureFlags[flag] === 'undefined') {
      return fallback;
    }
    return Boolean(featureFlags[flag]);
  },
}));

