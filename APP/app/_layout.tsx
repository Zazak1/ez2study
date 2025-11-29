import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useAuth } from '../store/auth';
import { useConfigStore } from '../store/config';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const fetchConfig = useConfigStore((state) => state.fetchConfig);
  const lastFetched = useConfigStore((state) => state.lastFetched);

  useEffect(() => {
    // Check if user is authenticated and safeguard routes
    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if already authenticated and trying to access auth screens
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  useEffect(() => {
    // Bootstrap remote configuration and refresh every 5 minutes
    if (!lastFetched) {
      fetchConfig();
    }

    const interval = setInterval(() => {
      fetchConfig();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchConfig, lastFetched]);

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <Slot />
    </View>
  );
}
