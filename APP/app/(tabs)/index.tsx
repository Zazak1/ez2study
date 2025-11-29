import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import DigitalHumanPanel from '../components/DigitalHuman/Panel';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { useConfigStore } from '../../store/config';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const digitalHumanEnabled = useConfigStore((state) =>
    state.getFeatureFlag('digitalHuman', true)
  );

  const handleSearch = () => {
    if (!query.trim()) return;
    // In a real app, this would start a chat or search
    console.log('Searching for:', query);
    router.push({ pathname: '/chat/new', params: { initialQuery: query } });
    setQuery('');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <View className="mb-8 mt-4">
            <Text className="text-4xl font-bold text-gray-900">你好，</Text>
            <Text className="text-4xl font-bold text-primary">今天想学点什么？</Text>
          </View>

          <AnnouncementBanner />

          <View className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <View className="flex-row items-center space-x-2 mb-2">
              <Sparkles size={20} className="text-secondary" color="#EC4899" />
              <Text className="font-semibold text-gray-700">智能问答</Text>
            </View>
            <View className="flex-row items-center bg-gray-50 rounded-xl p-2 border border-gray-100">
              <TextInput
                className="flex-1 p-2 text-base text-gray-800"
                placeholder="输入你的问题..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity
                onPress={handleSearch}
                className="bg-primary p-2 rounded-lg"
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {digitalHumanEnabled && (
            <View className="mb-8">
              <DigitalHumanPanel />
            </View>
          )}

          <Text className="text-lg font-semibold text-gray-800 mb-4">推荐探索</Text>
          <View>
            <TouchableOpacity className="bg-indigo-50 p-4 rounded-xl mb-3 border border-indigo-100 flex-row items-center justify-between">
              <View>
                <Text className="text-indigo-900 font-bold text-lg">数学几何</Text>
                <Text className="text-indigo-600">三角形相似判定</Text>
              </View>
              <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <Text className="text-indigo-600 font-bold">Go</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-pink-50 p-4 rounded-xl mb-3 border border-pink-100 flex-row items-center justify-between">
              <View>
                <Text className="text-pink-900 font-bold text-lg">物理力学</Text>
                <Text className="text-pink-600">牛顿第二定律应用</Text>
              </View>
              <View className="w-10 h-10 bg-pink-100 rounded-full items-center justify-center">
                <Text className="text-pink-600 font-bold">Go</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-amber-50 p-4 rounded-xl mb-3 border border-amber-100 flex-row items-center justify-between">
              <View>
                <Text className="text-amber-900 font-bold text-lg">化学反应</Text>
                <Text className="text-amber-600">氧化还原反应配平</Text>
              </View>
              <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center">
                <Text className="text-amber-600 font-bold">Go</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

