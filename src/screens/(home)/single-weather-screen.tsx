import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { ChevronLeft, Droplet, Thermometer, Wind } from "lucide-react-native";
import { useStoredUrls } from "@/src/context/stored-urls";
import { useFetchWeatherData } from "@/src/hooks/useFetchWeatherData";
import { ErrorView } from "@/src/components/ErrorView";
import { useMemo } from "react";

import dayjs from "dayjs";

import { YRTimeseries } from "@/src/utils/types";
import { useUserPreference } from "@/src/context/user-preference";
import { resolveDegreeSelectionText } from "@/src/utils/utils";

const CURRENT_DAY = dayjs();

export const SingleWeatherScreen = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { storedUrls } = useStoredUrls();
  const currentUrl = storedUrls.find((url) => url.id === params.id);

  const { data } = useFetchWeatherData(currentUrl?.url ?? "");

  const dataForCurrentDay = useMemo(() => {
    return data?.properties.timeseries.filter((item) =>
      dayjs(item.time).isSame(CURRENT_DAY, "day"),
    );
  }, [data]);

  if (!currentUrl || !data) {
    return <ErrorView />;
  }

  return (
    <ScreenWrapper>
      <Pressable onPress={() => router.back()} className="">
        <View className="flex flex-row items-center rounded-full self-start">
          <ChevronLeft />
          <Text className="text-blue-700 text-lg">Back</Text>
        </View>
      </Pressable>
      <Text className="text-4xl font-bold mt-4">{currentUrl.name}</Text>

      <FlatList
        className="mt-4"
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
        data={dataForCurrentDay}
        renderItem={({ item }) => <WeatherTimeseriesRenderItem item={item} />}
      />
    </ScreenWrapper>
  );
};

type WeatherTimeseriesRenderItemProps = {
  item: YRTimeseries;
};

const WeatherTimeseriesRenderItem = ({
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
          <Wind className="h-5 w-5 text-blue-500" />
          <Text>{details.wind_speed} km/h</Text>
        </View>
        <View className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-red-500" />
          <Text>
            {resolveDegreeSelectionText(details.air_temperature, degreeType)}
          </Text>
        </View>
        <View className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-green-500" />
          <Text>{details.relative_humidity}%</Text>
        </View>
      </View>
    </View>
  );
};
