import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../store/auth';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('提示', '请填写完整信息');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Mock success
      login({
        id: Math.random().toString(),
        username: username,
        email: email,
        token: 'mock-jwt-token',
      });
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <ArrowLeft color="#374151" size={24} />
      </TouchableOpacity>

      <View className="mb-10">
        <Text className="text-3xl font-bold text-gray-900">创建账号</Text>
        <Text className="text-gray-500 mt-2">加入 EduAI，开启智能学习新体验</Text>
      </View>

      <View className="space-y-4">
        <View className="bg-gray-50 p-4 rounded-xl flex-row items-center border border-gray-100">
          <User color="#9CA3AF" size={20} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 text-base"
            placeholder="用户名"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View className="bg-gray-50 p-4 rounded-xl flex-row items-center border border-gray-100">
          <Mail color="#9CA3AF" size={20} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 text-base"
            placeholder="电子邮箱"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="bg-gray-50 p-4 rounded-xl flex-row items-center border border-gray-100">
          <Lock color="#9CA3AF" size={20} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 text-base"
            placeholder="设置密码"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          className="bg-primary py-4 rounded-xl items-center justify-center shadow-lg shadow-indigo-200 mt-4"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">注册并登录</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row justify-center">
        <Text className="text-gray-500">已有账号？ </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary font-bold">直接登录</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

