import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RotateCcw,
  Zap,
  ZapOff,
  X,
  Check,
  Image as ImageIcon,
  CameraOff,
} from 'lucide-react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useConfigStore } from '../../store/config';

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const cameraEnabled = useConfigStore((state) =>
    state.getFeatureFlag('cameraSearch', true)
  );

  if (!cameraEnabled) {
    return (
      <SafeAreaView className="flex-1 bg-background p-6">
        <View className="flex-1 items-center justify-center">
          <View className="bg-white p-6 rounded-3xl border border-gray-100 items-center w-full">
            <CameraOff color="#9CA3AF" size={48} />
            <Text className="mt-4 text-lg font-semibold text-gray-900">
              拍照搜题已暂停
            </Text>
            <Text className="mt-2 text-center text-gray-500">
              管理端关闭了该功能，请稍后再试或联系管理员。
            </Text>
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)')}
              className="mt-6 rounded-2xl bg-primary/10 px-6 py-3"
            >
              <Text className="text-primary font-semibold">返回首页</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-background">
        <Text className="text-center text-lg mb-4">我们需要您的相机权限来拍摄题目</Text>
        <TouchableOpacity 
          onPress={requestPermission}
          className="bg-primary px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">授予权限</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const toggleFlash = () => {
    setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        setPhoto(photo.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  const confirmPicture = () => {
    // Proceed to analyze the picture
    router.push({
      pathname: '/chat/new', // Use 'new' or a specific ID
      params: { imageUri: photo }
    });
    setPhoto(null); // Reset for next time
  };

  if (photo) {
    return (
      <View className="flex-1 bg-black">
        <Image source={{ uri: photo }} className="flex-1" resizeMode="contain" />
        <View className="absolute bottom-0 w-full p-8 flex-row justify-between items-center bg-black/50">
          <TouchableOpacity onPress={retakePicture} className="p-4 bg-gray-700 rounded-full">
            <X color="white" size={32} />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmPicture} className="p-4 bg-primary rounded-full">
            <Check color="white" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Camera 
        ref={cameraRef}
        style={{ flex: 1 }} 
        type={type}
        flashMode={flash}
      >
        <SafeAreaView className="flex-1 justify-between p-4">
          {/* Header Controls */}
          <View className="flex-row justify-between items-center bg-black/30 p-2 rounded-full self-center w-full max-w-xs">
            <TouchableOpacity onPress={toggleFlash} className="p-2">
              {flash === FlashMode.on ? 
                <Zap color="#FFD700" size={24} /> : 
                <ZapOff color="white" size={24} />
              }
            </TouchableOpacity>
            <Text className="text-white font-semibold">拍照搜题</Text>
            <TouchableOpacity onPress={toggleCameraType} className="p-2">
              <RotateCcw color="white" size={24} />
            </TouchableOpacity>
          </View>

          {/* Guide Box */}
          <View className="flex-1 justify-center items-center">
            <View className="w-64 h-64 border-2 border-white/50 rounded-2xl bg-transparent" />
            <Text className="text-white/80 mt-4 bg-black/50 px-4 py-1 rounded-full">
              将题目对准框内
            </Text>
          </View>

          {/* Capture Button & Gallery */}
          <View className="flex-row items-center justify-around mb-8 px-8 w-full">
             <TouchableOpacity onPress={pickImage} className="p-3 bg-white/20 rounded-full">
              <ImageIcon color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={takePicture}>
              <View className="w-20 h-20 rounded-full border-4 border-white items-center justify-center">
                <View className="w-16 h-16 rounded-full bg-white" />
              </View>
            </TouchableOpacity>

             {/* Placeholder for symmetry or another feature */}
             <View className="w-12" /> 
          </View>
        </SafeAreaView>
      </Camera>
    </View>
  );
}
