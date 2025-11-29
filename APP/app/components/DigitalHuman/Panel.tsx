import { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Video } from 'expo-av';
import {
  Mic,
  Square,
  Sparkles,
  Radio,
  AlertTriangle,
} from 'lucide-react-native';
import { useDigitalHumanSession } from '../../../hooks/useDigitalHumanSession';
import { DigitalHumanStatus } from '../../../services/digitalHuman';

const STATUS_COPY: Record<
  DigitalHumanStatus,
  { label: string; tone: string }
> = {
  idle: { label: '待命中', tone: 'text-gray-500' },
  preparing: { label: '加载素材', tone: 'text-amber-600' },
  listening: { label: '正在聆听', tone: 'text-emerald-600' },
  thinking: { label: '思考中', tone: 'text-indigo-600' },
  speaking: { label: '播报讲解', tone: 'text-pink-600' },
};

const QUICK_PROMPTS = [
  '请用 30 秒讲明这个概念',
  '生成一个互动式提问脚本',
  '帮我整理板书内容',
];

export default function DigitalHumanPanel() {
  const {
    status,
    isActive,
    streamUrl,
    suggestions,
    transcript,
    error,
    startSession,
    stopSession,
    askDigitalHuman,
  } = useDigitalHumanSession();

  const currentStatus = STATUS_COPY[status];
  const latestTranscript = transcript[transcript.length - 1];

  const handleToggle = async () => {
    if (isActive) {
      await stopSession();
      return;
    }
    await startSession();
  };

  const handleAsk = async (prompt: string) => {
    try {
      await askDigitalHuman(prompt);
    } catch (err) {
      Alert.alert('提示', err instanceof Error ? err.message : '发送失败');
    }
  };

  const statusTag = useMemo(() => {
    return (
      <View className="flex-row items-center space-x-2">
        <Radio size={16} color={isActive ? '#22C55E' : '#9CA3AF'} />
        <Text className={`text-xs font-bold ${currentStatus.tone}`}>
          {currentStatus.label}
        </Text>
      </View>
    );
  }, [currentStatus, isActive]);

  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-sm text-gray-500 font-semibold">
            数字人实时讲解
          </Text>
          <Text className="text-xl font-bold text-gray-900 mt-1">
            DH · Adaptive Tutor
          </Text>
        </View>
        {statusTag}
      </View>

      {streamUrl ? (
        <Video
          source={{ uri: streamUrl }}
          useNativeControls={false}
          shouldPlay={isActive}
          isLooping
          resizeMode="cover"
          className="w-full h-48 rounded-2xl bg-gray-100 mb-4"
        />
      ) : (
        <View className="w-full h-48 rounded-2xl bg-gray-100 mb-4 items-center justify-center border border-dashed border-gray-200">
          {status === 'preparing' ? (
            <ActivityIndicator color="#4F46E5" />
          ) : (
            <View className="items-center">
              <Sparkles size={28} color="#4F46E5" />
              <Text className="text-gray-500 mt-2">启动后显示实时形象</Text>
            </View>
          )}
        </View>
      )}

      {error && (
        <View className="flex-row items-center bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4">
          <AlertTriangle color="#EF4444" size={16} className="mr-2" />
          <Text className="text-red-500 text-xs flex-1">{error}</Text>
        </View>
      )}

      {latestTranscript && (
        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
          <Text className="text-xs text-gray-500 mb-2">数字人解读</Text>
          <Text className="text-gray-800 text-sm leading-6">
            {latestTranscript}
          </Text>
        </View>
      )}

      {suggestions.length > 0 && (
        <View className="mb-4">
          <Text className="text-xs text-gray-500 mb-2">可继续追问</Text>
          <View className="flex-row flex-wrap gap-2">
            {suggestions.map((text) => (
              <TouchableOpacity
                key={text}
                className="px-3 py-2 rounded-full bg-indigo-50 border border-indigo-100"
                onPress={() => handleAsk(text)}
              >
                <Text className="text-xs text-indigo-700">{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View className="mb-4">
        <Text className="text-xs text-gray-500 mb-2">快速开聊</Text>
        <View className="flex-row flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <TouchableOpacity
              key={prompt}
              className="px-3 py-2 rounded-full bg-gray-100"
              onPress={() => handleAsk(prompt)}
            >
              <Text className="text-xs text-gray-700">{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex-row space-x-3">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center rounded-2xl py-3 ${
            isActive ? 'bg-gray-100' : 'bg-primary'
          }`}
          onPress={handleToggle}
        >
          {isActive ? (
            <>
              <Square color="#374151" size={18} className="mr-2" />
              <Text className="text-gray-900 font-bold text-sm">结束会话</Text>
            </>
          ) : (
            <>
              <Mic color="#fff" size={18} className="mr-2" />
              <Text className="text-white font-bold text-sm">启动数字人</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="w-14 items-center justify-center rounded-2xl bg-white border border-gray-200"
          onPress={() => handleAsk('请继续讲解当前知识点')}
        >
          <Sparkles color="#F97316" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


