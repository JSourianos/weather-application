import { Text, TouchableOpacity, View } from "react-native";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useUserPreference } from "@/src/context/user-preference";
import { DegreeType } from "@/src/lib/utils/types";
import { cn } from "@/src/lib/utils/utils";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "../lib/utils/async-storage-keys";
import { useStoredUrls } from "../context/stored-urls";
import { TrashIcon } from "../lib/icons";

export const SettingsScreen = () => {
  const { degreeType, updateDegreeType } = useUserPreference();
  const { removeItem, getItem } = useAsyncStorage(ASYNC_STORAGE_KEYS.MY_LOCATION);
  const { storedUrls, removeStoredUrl } = useStoredUrls();

  const hasMyLocation = storedUrls.some((url) => url.name === "My Location");

  const handleUpdateDegreeType = (selected: DegreeType) => {
    if (selected !== "celsius" && selected !== "fahrenheit") {
      throw new Error("Invalid degree type");
    }
    updateDegreeType(selected);
  };

  const handleRemoveMyLocation = async () => {
    const myLocation = await getItem();

    if (myLocation) {
      removeStoredUrl("My Location");
    }

    await removeItem();
  };

  return (
    <ScreenWrapper>
      <Text
        className="text-2xl font-bold
      "
      >
        Settings
      </Text>

      <Text className="text-lg font-medium mt-4 mb-1 font-medium">Select Degree Type</Text>
      <View className="flex flex-row items-center rounded-full w-full gap-4 ">
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

      {hasMyLocation && (
        <View className="flex flex-row items-center justify-between mt-auto mb-4 w-full">
          <TouchableOpacity className="bg-white border-red-500 p-4  text-center border-2 rounded-xl flex flex-row items-center gap-2" onPress={handleRemoveMyLocation}>
            <TrashIcon className="text-red-500" />
            <Text className="text-red-500">Remove Stored Location</Text>
          </TouchableOpacity>
        </View>
      )}
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
