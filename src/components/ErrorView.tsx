import { Text } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";

import { Triangle } from "lucide-react-native";

export const ErrorView = () => {
  return (
    <ScreenWrapper>
      <Triangle size={64} color="red" />
      <Text>Oops, something went wrong...</Text>
    </ScreenWrapper>
  );
};
