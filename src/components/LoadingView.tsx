import { ActivityIndicator, Text } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";

export const LoadingView = () => {
  return (
    <ScreenWrapper>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </ScreenWrapper>
  );
};
