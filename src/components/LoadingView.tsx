import { ActivityIndicator, Text, View } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { ItemWrapper } from "@/src/components/ItemWrapper";

export const LoadingView = () => {
  return (
    <ScreenWrapper>
      <ItemWrapper>
        <View className="flex items-center justify-center h-full gap-4">
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading...</Text>
        </View>
      </ItemWrapper>
    </ScreenWrapper>
  );
};
