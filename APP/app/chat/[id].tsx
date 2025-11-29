import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Sparkles, Image as ImageIcon, HelpCircle } from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { chatWithAI, analyzeImage } from '../../services/ai';

export default function ChatScreen() {
  const { id, initialQuery, imageUri } = useLocalSearchParams();
  const router = useRouter();
  const [input, setInput] = useState((initialQuery as string) || '');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { messages, addMessage } = useStore();

  useEffect(() => {
    if (initialQuery) {
      // Avoid duplicate if already sent
      if (messages.length === 0 || messages[messages.length - 1].content !== initialQuery) {
        handleSend(initialQuery as string);
      }
    } else if (imageUri) {
       if (messages.length === 0) { // Simple check to avoid re-triggering on hot reload
        handleImageAnalysis(imageUri as string);
       }
    }
  }, [initialQuery, imageUri]);

  const handleImageAnalysis = async (uri: string) => {
    setIsLoading(true);
    addMessage({
      role: 'user',
      content: '请帮我解答这道题',
      type: 'image',
      imageUrl: uri
    });

    try {
      const response = await analyzeImage(uri);
      addMessage({
        role: 'assistant',
        content: response.text,
        relatedQuestions: response.relatedQuestions
      });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: '抱歉，图片解析失败，请重试。'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg = text;
    setInput('');
    addMessage({
      role: 'user',
      content: userMsg,
      type: 'text'
    });
    
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMsg);
      addMessage({
        role: 'assistant',
        content: response.text,
        relatedQuestions: response.relatedQuestions
      });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: '抱歉，网络似乎开小差了。'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">智能解答</Text>
          <Text className="text-xs text-green-600">AI 在线中</Text>
        </View>
        <TouchableOpacity>
           <Sparkles color="#EC4899" size={24} />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView 
        className="flex-1 px-4" 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <View className="h-4" />
        {messages.map((msg) => (
          <View key={msg.id} className={`mb-6 flex-row ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
               <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-2 self-start mt-1">
                 <Sparkles color="white" size={16} />
               </View>
            )}
            
            <View className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <View 
                className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary rounded-tr-none' 
                    : 'bg-white border border-gray-100 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.type === 'image' && msg.imageUrl && (
                  <Image 
                    source={{ uri: msg.imageUrl }} 
                    className="w-48 h-48 rounded-lg mb-2 bg-gray-200" 
                    resizeMode="cover"
                  />
                )}
                <Text className={`text-base leading-6 ${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  {msg.content}
                </Text>

                {/* Related Questions Suggestions */}
                {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                  <View className="mt-4 pt-3 border-t border-gray-100">
                    <Text className="text-xs font-bold text-gray-500 mb-2 flex-row items-center">
                      <HelpCircle size={12} color="#6B7280" /> 猜你想问：
                    </Text>
                    {msg.relatedQuestions.map((q, idx) => (
                      <TouchableOpacity 
                        key={idx}
                        className="bg-gray-50 px-3 py-2 rounded-lg mb-2"
                        onPress={() => handleSend(q)}
                      >
                        <Text className="text-primary text-sm">{q}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              {/* Timestamp could go here */}
            </View>

            {msg.role === 'user' && (
              <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center ml-2 self-start mt-1">
                <Text className="text-xs font-bold text-gray-500">Me</Text>
              </View>
            )}
          </View>
        ))}
        
        {isLoading && (
          <View className="flex-row justify-start mb-6 ml-10">
             <View className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
               <ActivityIndicator color="#4F46E5" />
               <Text className="text-xs text-gray-400 mt-2">思考中...</Text>
             </View>
          </View>
        )}
        <View className="h-4" />
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View className="p-4 bg-white border-t border-gray-100 flex-row items-end space-x-2">
          <TouchableOpacity className="p-3 bg-gray-100 rounded-full mb-1">
            <ImageIcon size={24} color="#6B7280" />
          </TouchableOpacity>
          <View className="flex-1 bg-gray-100 rounded-2xl min-h-[48px] px-4 py-2 justify-center">
            <TextInput
              className="text-base text-gray-800 max-h-32"
              placeholder="追问一下..."
              multiline
              value={input}
              onChangeText={setInput}
            />
          </View>
          <TouchableOpacity 
            onPress={() => handleSend()}
            className={`p-3 rounded-full mb-1 ${!input.trim() ? 'bg-gray-200' : 'bg-primary'}`}
            disabled={!input.trim() || isLoading}
          >
            <Send size={24} color={!input.trim() ? '#9CA3AF' : 'white'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
