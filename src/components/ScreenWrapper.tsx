import { SafeAreaView, View } from "react-native";
import { ReactNode } from "react";

export const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-4" style={{ flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  );
};
