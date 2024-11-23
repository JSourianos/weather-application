import { Text, TouchableOpacity, View } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useUserPreference } from "@/src/context/user-preference";
import { DegreeType } from "@/src/lib/utils/types";
import { cn } from "@/src/lib/utils/utils";

export const SettingsScreen = () => {
  const { degreeType, updateDegreeType } = useUserPreference();

  const handleUpdateDegreeType = (selected: DegreeType) => {
    if (selected !== "celsius" && selected !== "fahrenheit") {
      throw new Error("Invalid degree type");
    }
    updateDegreeType(selected);
  };

  return (
    <ScreenWrapper>
      <Text
        className="text-2xl font-bold
      "
      >
        Settings
      </Text>

      <View className="flex flex-row items-center rounded-full w-full gap-4 mt-4">
        <DegreeTypeButton
          degree="celsius"
          currentDegreeTypeSelected={degreeType}
          onPress={() => handleUpdateDegreeType("celsius")}
        />

        <DegreeTypeButton
          degree="fahrenheit"
          currentDegreeTypeSelected={degreeType}
          onPress={() => handleUpdateDegreeType("fahrenheit")}
        />
      </View>
    </ScreenWrapper>
  );
};

type DegreeTypeButtonProps = {
  degree: DegreeType;
  currentDegreeTypeSelected: DegreeType;
  onPress: () => void;
};

const DegreeTypeButton = ({
  degree,
  currentDegreeTypeSelected,
  onPress,
}: DegreeTypeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "bg-slate-50 p-4 w-[45%] text-center border-2 rounded-xl",
        currentDegreeTypeSelected === degree
          ? "bg-slate-50  border-blue-500 rounded-2xl"
          : "bg-slate-200 border-slate-500 rounded-2xl",
      )}
    >
      <Text className="text-2xl">{degree}</Text>
    </TouchableOpacity>
  );
};
