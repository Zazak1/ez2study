export type AnnouncementLevel = 'info' | 'warning' | 'critical';

export interface RemoteAnnouncement {
  enabled: boolean;
  title: string;
  message: string;
  level: AnnouncementLevel;
}

export interface RemoteFeatureFlags {
  digitalHuman?: boolean;
  cameraSearch?: boolean;
  [key: string]: boolean | undefined;
}

export interface RemoteConfig {
  apiBaseUrl: string;
  announcement?: RemoteAnnouncement;
  featureFlags?: RemoteFeatureFlags;
  updatedAt?: string;
}

const DEFAULT_ENDPOINT = 'http://115.190.195.114:8080/api/config';

const resolveEndpoint = () =>
  process.env.EXPO_PUBLIC_CONFIG_ENDPOINT || DEFAULT_ENDPOINT;

export const fetchRemoteConfig = async (): Promise<RemoteConfig> => {
  const response = await fetch(resolveEndpoint(), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('获取远程配置失败');
  }

  const data = (await response.json()) as RemoteConfig;
  return data;
};

export const getAnnouncementTheme = (level: AnnouncementLevel) => {
  switch (level) {
    case 'warning':
      return {
        background: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-900',
        badge: 'bg-amber-100 text-amber-700',
      };
    case 'critical':
      return {
        background: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-900',
        badge: 'bg-red-100 text-red-700',
      };
    case 'info':
    default:
      return {
        background: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-900',
        badge: 'bg-indigo-100 text-indigo-700',
      };
  }
};

