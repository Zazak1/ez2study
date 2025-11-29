import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, Shield, Smartphone, Info, Download } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const router = useRouter();
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const currentVersion = Constants.expoConfig?.version || '1.0.0';

  const handleCheckUpdate = () => {
    setCheckingUpdate(true);
    // Mock update check
    setTimeout(() => {
      setCheckingUpdate(false);
      Alert.alert('版本检查', '当前已是最新版本 (v' + currentVersion + ')');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">设置</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Account Section */}
        <Text className="text-gray-500 font-bold mb-3 ml-2">账号与安全</Text>
        <View className="bg-white rounded-xl overflow-hidden mb-6 shadow-sm">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
             <View className="flex-row items-center">
               <Shield size={20} color="#4B5563" />
               <Text className="text-gray-800 ml-3 text-base">隐私设置</Text>
             </View>
             <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between p-4">
             <View className="flex-row items-center">
               <Smartphone size={20} color="#4B5563" />
               <Text className="text-gray-800 ml-3 text-base">账号绑定</Text>
             </View>
             <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <Text className="text-gray-500 font-bold mb-3 ml-2">关于应用</Text>
        <View className="bg-white rounded-xl overflow-hidden mb-6 shadow-sm">
          <TouchableOpacity 
            className="flex-row items-center justify-between p-4 border-b border-gray-50"
            onPress={handleCheckUpdate}
          >
             <View className="flex-row items-center">
               <Download size={20} color="#4B5563" />
               <Text className="text-gray-800 ml-3 text-base">检查更新</Text>
             </View>
             {checkingUpdate ? (
               <ActivityIndicator size="small" color="#4F46E5" />
             ) : (
               <View className="flex-row items-center">
                 <Text className="text-gray-400 mr-2">v{currentVersion}</Text>
                 <ChevronRight color="#9CA3AF" size={20} />
               </View>
             )}
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
             <View className="flex-row items-center">
               <Info size={20} color="#4B5563" />
               <Text className="text-gray-800 ml-3 text-base">关于我们</Text>
             </View>
             <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
             <View className="flex-row items-center">
               <Text className="text-gray-800 ml-9 text-base">用户协议与隐私政策</Text>
             </View>
             <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        </View>

        <Text className="text-center text-gray-400 text-xs mt-4">
          EduAI © 2025 All Rights Reserved
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

