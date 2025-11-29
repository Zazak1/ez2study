import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, ChevronRight, TrendingUp, Clock, Settings, LogOut, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../store/auth';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('退出登录', '确定要退出当前账号吗？', [
      { text: '取消', style: 'cancel' },
      { 
        text: '退出', 
        style: 'destructive', 
        onPress: () => {
          logout();
          // The root layout will automatically redirect to login
        } 
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        <View className="flex-row items-center justify-between mb-8 mt-4">
           <View>
            <Text className="text-3xl font-bold text-gray-900">我的</Text>
            <Text className="text-gray-500">{user?.username || '同学'}，今天也要加油哦</Text>
           </View>
           <TouchableOpacity onPress={() => router.push('/settings')}>
             <Settings color="#374151" size={24} />
           </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex-row items-center space-x-4">
           <View className="w-16 h-16 bg-indigo-100 rounded-full items-center justify-center">
             {user?.avatar ? (
               <Image source={{ uri: user.avatar }} className="w-16 h-16 rounded-full" />
             ) : (
               <Text className="text-2xl font-bold text-indigo-600">{user?.username?.[0]?.toUpperCase() || 'U'}</Text>
             )}
           </View>
           <View className="flex-1">
             <Text className="text-xl font-bold text-gray-900">{user?.username || '未登录'}</Text>
             <Text className="text-gray-500 text-sm">{user?.email || '点击登录开启学习'}</Text>
           </View>
        </View>

        {/* Statistics Card */}
        <View className="bg-primary rounded-2xl p-6 mb-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white/80 font-medium">本周收录</Text>
            <TrendingUp color="white" size={20} />
          </View>
          <Text className="text-4xl font-bold text-white mb-2">12</Text>
          <Text className="text-white/60 text-sm">较上周增加 4 题</Text>
        </View>

        {/* Sections */}
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-white p-4 rounded-xl shadow-sm flex-row items-center justify-between"
            onPress={() => router.push('/question/list?type=math')}
          >
            <View className="flex-row items-center space-x-4">
              <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <BookOpen size={20} className="text-indigo-600" color="#4F46E5" />
              </View>
              <View>
                <Text className="font-bold text-gray-800 text-lg">数学错题</Text>
                <Text className="text-gray-500 text-sm">共 24 题待复习</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white p-4 rounded-xl shadow-sm flex-row items-center justify-between"
             onPress={() => router.push('/question/list?type=physics')}
          >
            <View className="flex-row items-center space-x-4">
               <View className="w-10 h-10 bg-pink-100 rounded-full items-center justify-center">
                <BookOpen size={20} className="text-pink-600" color="#EC4899" />
              </View>
              <View>
                <Text className="font-bold text-gray-800 text-lg">物理错题</Text>
                <Text className="text-gray-500 text-sm">共 8 题待复习</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" />
          </TouchableOpacity>

           <TouchableOpacity 
            className="bg-white p-4 rounded-xl shadow-sm flex-row items-center justify-between"
             onPress={() => router.push('/question/list?type=chemistry')}
          >
            <View className="flex-row items-center space-x-4">
               <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center">
                <BookOpen size={20} className="text-amber-600" color="#D97706" />
              </View>
              <View>
                <Text className="font-bold text-gray-800 text-lg">化学错题</Text>
                <Text className="text-gray-500 text-sm">共 15 题待复习</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        <View className="mt-8 pb-10">
           <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center justify-center p-4 bg-red-50 rounded-xl border border-red-100"
           >
             <LogOut size={20} color="#EF4444" className="mr-2" />
             <Text className="text-red-500 font-bold">退出登录</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
