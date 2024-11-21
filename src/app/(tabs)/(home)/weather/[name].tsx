import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { ChevronLeft } from "lucide-react-native";

export default function WeatherPage() {
  const params = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Pressable onPress={() => router.back()} className="">
        <View className="flex flex-row items-center rounded-full self-start">
          <ChevronLeft />
          <Text className="text-blue-700 text-lg">Back</Text>
        </View>
      </Pressable>
      <Text className="text-4xl font-bold">{params.name}</Text>
    </ScreenWrapper>
  );
}
