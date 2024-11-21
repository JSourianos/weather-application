import { Text } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useUserPreference } from "@/src/context/user-preference";

export default function SettingsPage() {
  const { degreeType } = useUserPreference();

  return (
    <ScreenWrapper>
      <Text
        className="text-2xl font-bold
      "
      >
        Settings
      </Text>

      <Text className="text-lg">{degreeType}</Text>
    </ScreenWrapper>
  );
}
