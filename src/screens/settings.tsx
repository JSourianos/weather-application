import { Text, TouchableOpacity, View } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useUserPreference } from "@/src/context/user-preference";
import { DegreeType } from "@/src/utils/types";

export const SettingsPage = () => {
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
  // TODO: cn()
  const isSelectedClass =
    currentDegreeTypeSelected === degree
      ? "bg-slate-50  border-blue-500 rounded-2xl"
      : "bg-slate-200 border-slate-500 rounded-2xl";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        "bg-slate-50 p-4 w-[45%] text-center border-2 rounded-xl" +
        isSelectedClass
      }
    >
      <Text className="text-2xl">{degree}</Text>
    </TouchableOpacity>
  );
};
