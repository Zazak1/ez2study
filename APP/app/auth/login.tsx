import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../store/auth';
import { Mail, Lock, User, ArrowRight } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('提示', '请输入邮箱和密码');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'demo' && password === '123456') {
         // Mock success
         login({
           id: '1',
           username: '同学你好',
           email: 'demo@eduai.com',
           token: 'mock-jwt-token',
           avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=4F46E5&color=fff'
         });
         router.replace('/(tabs)');
      } else {
        // For demo purposes, let's just log them in anyway with input values if not "demo"
        // In real app: Alert.alert('错误', '账号或密码错误');
         login({
           id: '2',
           username: email.split('@')[0],
           email: email,
           token: 'mock-jwt-token',
         });
         router.replace('/(tabs)');
      }
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6 justify-center">
      <View className="mb-10">
        <View className="w-16 h-16 bg-primary rounded-2xl mb-4 items-center justify-center transform rotate-3">
            <Text className="text-white text-3xl font-bold">E</Text>
        </View>
        <Text className="text-3xl font-bold text-gray-900">欢迎回来</Text>
        <Text className="text-gray-500 mt-2">登录 EduAI，继续你的学习之旅</Text>
      </View>

      <View className="space-y-4">
        <View className="bg-gray-50 p-4 rounded-xl flex-row items-center border border-gray-100">
          <Mail color="#9CA3AF" size={20} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 text-base"
            placeholder="邮箱 / 用户名"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View className="bg-gray-50 p-4 rounded-xl flex-row items-center border border-gray-100">
          <Lock color="#9CA3AF" size={20} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 text-base"
            placeholder="密码"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity className="items-end">
          <Text className="text-primary font-medium">忘记密码？</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-primary py-4 rounded-xl items-center justify-center shadow-lg shadow-indigo-200"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <View className="flex-row items-center">
               <Text className="text-white font-bold text-lg mr-2">登 录</Text>
               <ArrowRight color="white" size={20} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row justify-center">
        <Text className="text-gray-500">还没有账号？ </Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text className="text-primary font-bold">立即注册</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

