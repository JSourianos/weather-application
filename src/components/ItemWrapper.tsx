import { View } from "react-native";

export const ItemWrapper = ({ children }: { children: React.ReactNode }) => (
  <View className="bg-slate-200 rounded-2xl h-52 w-full">{children}</View>
);
