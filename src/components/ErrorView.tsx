import { Text, View } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";

import { Triangle } from "lucide-react-native";
import { ItemWrapper } from "@/src/components/ItemWrapper";

export const ErrorView = () => {
  return (
    <ScreenWrapper>
      <ItemWrapper>
        <View className="flex items-center justify-center h-full gap-4">
          <Triangle size={64} color="red" />
          <Text className="text-2xl">Oops, something went wrong...</Text>
        </View>
      </ItemWrapper>
    </ScreenWrapper>
  );
};
