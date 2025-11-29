import { Tabs } from 'expo-router';
import { Camera, Home, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'AI 问答',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: '拍照搜题',
          tabBarIcon: ({ color, size }) => (
            <View className="bg-primary rounded-full p-3 -mt-8 shadow-lg">
              <Camera color="white" size={size} />
            </View>
          ),
          tabBarLabelStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '错题本',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

