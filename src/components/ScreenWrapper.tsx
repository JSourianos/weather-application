import { SafeAreaView, View } from "react-native";
import { ReactNode } from "react";

export const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView className="bg-white h-full" style={{ flex: 1 }}>
      <View className="px-4" style={{ flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  );
};
