import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, BookOpen, Search, Filter } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const MOCK_QUESTIONS = [
  { id: '1', subject: 'math', title: '二次函数极值问题', date: '2023.11.28', preview: '已知二次函数 y = ax² + bx + c...' },
  { id: '2', subject: 'physics', title: '动量守恒定律', date: '2023.11.27', preview: '在光滑水平面上，质量为 m 的...' },
  { id: '3', subject: 'chemistry', title: '氧化还原反应配平', date: '2023.11.26', preview: '配平下列化学方程式...' },
  { id: '4', subject: 'math', title: '三角函数诱导公式', date: '2023.11.25', preview: '化简 sin(π + α)...' },
  { id: '5', subject: 'physics', title: '牛顿第二定律应用', date: '2023.11.24', preview: '物体在斜面上滑下...' },
];

export default function QuestionsListScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const filteredQuestions = type && type !== 'all' 
    ? MOCK_QUESTIONS.filter(q => q.subject === type)
    : MOCK_QUESTIONS;

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'math': return 'bg-indigo-100 text-indigo-600';
      case 'physics': return 'bg-pink-100 text-pink-600';
      case 'chemistry': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getSubjectName = (subject: string) => {
    switch (subject) {
      case 'math': return '数学';
      case 'physics': return '物理';
      case 'chemistry': return '化学';
      default: return '其他';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900 flex-1">
          {type ? `${getSubjectName(type as string)}错题` : '所有错题'}
        </Text>
        <TouchableOpacity className="mr-4">
          <Search color="#374151" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Filter color="#374151" size={24} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredQuestions}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100"
            onPress={() => router.push(`/question/${item.id}`)}
          >
            <View className="flex-row justify-between mb-2">
              <View className={`px-2 py-1 rounded ${getSubjectColor(item.subject).split(' ')[0]}`}>
                <Text className={`text-xs font-bold ${getSubjectColor(item.subject).split(' ')[1]}`}>
                  {getSubjectName(item.subject)}
                </Text>
              </View>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900 mb-1">{item.title}</Text>
            <Text className="text-gray-500 text-sm" numberOfLines={2}>{item.preview}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <BookOpen size={48} color="#E5E7EB" />
            <Text className="text-gray-400 mt-4">暂无错题记录</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

