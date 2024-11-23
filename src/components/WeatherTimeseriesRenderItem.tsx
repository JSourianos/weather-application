import { YRTimeseries } from "@/src/lib/utils/types";
import { useUserPreference } from "@/src/context/user-preference";
import dayjs from "dayjs";
import { Text, View } from "react-native";
import { DropletsIcon, ThermometerIcon, WindIcon } from "@/src/lib/icons";
import { resolveDegreeSelectionText } from "@/src/lib/utils/utils";

type WeatherTimeseriesRenderItemProps = {
  item: YRTimeseries;
};

export const WeatherTimeseriesRenderItem = ({
  item,
}: WeatherTimeseriesRenderItemProps) => {
  const { degreeType } = useUserPreference();
  const details = item.data.instant.details;
  const time = dayjs(item.time).format("HH:mm");
  return (
    <View className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-300">
      <Text className="text-3xl font-medium mb-4">{time}</Text>
      <View className="flex flex-row justify-between items-center">
        <View className="flex items-center gap-2">
          <WindIcon className="h-5 w-5 text-blue-500" />
          <Text className="font-medium">{details.wind_speed} km/h</Text>
        </View>
        <View className="flex items-center gap-2">
          <ThermometerIcon className="h-5 w-5 text-blue-500" />
          <Text className="font-medium">
            {resolveDegreeSelectionText(details.air_temperature, degreeType)}
          </Text>
        </View>
        <View className="flex items-center gap-2">
          <DropletsIcon className="h-5 w-5 text-blue-500" />
          <Text className="font-medium">{details.relative_humidity}%</Text>
        </View>
      </View>
    </View>
  );
};
