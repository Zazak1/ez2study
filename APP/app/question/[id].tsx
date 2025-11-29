import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share2, Star } from 'lucide-react-native';

export default function QuestionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">题目详情</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <Star color="#374151" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Share2 color="#374151" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <View className="flex-row justify-between mb-4">
            <Text className="text-xs font-bold bg-indigo-100 text-indigo-600 px-2 py-1 rounded">数学 / 二次函数</Text>
            <Text className="text-gray-400 text-xs">2023.11.28</Text>
          </View>
          <Text className="text-xl font-semibold text-gray-900 leading-relaxed mb-4">
            已知二次函数 y = ax² + bx + c 的图像经过点 (-1, 0) 和 (3, 0)，求其对称轴方程。
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">参考解析</Text>
          <View className="bg-green-50 p-6 rounded-2xl border border-green-100">
             <Text className="text-gray-800 leading-relaxed">
               由题意可知，二次函数图像与 x 轴的两个交点分别为 (-1, 0) 和 (3, 0)。
               {"\n\n"}
               根据二次函数的对称性，对称轴 x = (x₁ + x₂) / 2
               {"\n\n"}
               代入数据：
               x = (-1 + 3) / 2 = 1
               {"\n\n"}
               所以，该二次函数的对称轴方程为 x = 1。
             </Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-bold text-gray-800 mb-3">举一反三</Text>
          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100">
            <Text className="font-medium text-gray-800">练习题 1：求顶点坐标</Text>
          </TouchableOpacity>
           <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100">
            <Text className="font-medium text-gray-800">练习题 2：求函数解析式</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

