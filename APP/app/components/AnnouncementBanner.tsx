import { View, Text, TouchableOpacity } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { useConfigStore } from '../../store/config';
import { getAnnouncementTheme } from '../../services/config';

export default function AnnouncementBanner() {
  const { announcement, loading, error, fetchConfig } = useConfigStore(
    (state) => ({
      announcement: state.announcement,
      loading: state.loading,
      error: state.error,
      fetchConfig: state.fetchConfig,
    })
  );

  if (!announcement || !announcement.enabled) {
    return null;
  }

  const theme = getAnnouncementTheme(announcement.level || 'info');

  return (
    <View
      className={`mb-6 rounded-3xl border ${theme.border} ${theme.background} p-4`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <View className="flex-row items-center mb-2 space-x-2">
            <View className={`px-2 py-0.5 rounded-full ${theme.badge}`}>
              <Text className="text-xs font-bold">系统公告</Text>
            </View>
            <Text className={`font-semibold ${theme.text}`}>
              {announcement.title}
            </Text>
          </View>
          <Text className={`text-sm leading-6 ${theme.text}`}>
            {announcement.message}
          </Text>
          {error && (
            <Text className="mt-2 text-xs text-red-500">
              配置同步失败：{error}（已使用本地缓存）
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={fetchConfig}
          className="flex-row items-center rounded-2xl bg-white/50 px-3 py-2"
          disabled={loading}
        >
          <RefreshCw
            size={16}
            color={loading ? '#9CA3AF' : '#4F46E5'}
          />
          <Text
            className={`ml-2 text-xs font-medium ${
              loading ? 'text-gray-400' : 'text-primary'
            }`}
          >
            {loading ? '同步中' : '刷新'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

