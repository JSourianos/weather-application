import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useStoredUrls } from "@/src/context/stored-urls";
import { useFetchWeatherData } from "@/src/hooks/useFetchWeatherData";
import { ErrorView } from "@/src/components/ErrorView";
import { useMemo } from "react";
import { ChevronLeftIcon, SunsetIcon, SunriseIcon } from "@/src/lib/icons";

import dayjs from "dayjs";
import { LoadingView } from "@/src/components/LoadingView";
import { WeatherTimeseriesRenderItem } from "@/src/components/WeatherTimeseriesRenderItem";
import { useFetchSunriseSunsetData } from "@/src/hooks/useFetchSunriseSunsetData";

const CURRENT_DAY = dayjs();

export const SingleWeatherScreen = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { storedUrls } = useStoredUrls();
  const currentUrl = storedUrls.find((url) => url.id === params.id);

  const { data, status } = useFetchWeatherData(currentUrl?.url ?? "");
  const { data: sunriseData, status: sunriseStatus } =
    useFetchSunriseSunsetData(currentUrl?.sunriseUrl ?? "");

  const dataForCurrentDay = useMemo(() => {
    return data?.properties.timeseries.filter((item) =>
      dayjs(item.time).isSame(CURRENT_DAY, "day"),
    );
  }, [data]);

  if (status === "loading" || sunriseStatus === "loading") {
    return <LoadingView />;
  }

  if (status === "error" || sunriseStatus === "error") {
    return <ErrorView />;
  }

  if (!currentUrl) {
    return <ErrorView />;
  }

  if (!data || !sunriseData) {
    return <ErrorView />;
  }

  const sunrise = sunriseData?.properties.sunrise.time;
  const sunset = sunriseData?.properties.sunset.time;

  return (
    <ScreenWrapper>
      <Pressable onPress={() => router.back()} className="">
        <View className="flex flex-row items-center rounded-full self-start">
          <ChevronLeftIcon />
          <Text className="text-blue-700 text-lg">Back</Text>
        </View>
      </Pressable>

      <View className="flex flex-row items-center gap-2 w-full justify-between">
        <Text className="text-4xl font-bold mt-4">{currentUrl.name}</Text>
        <View className="flex flex-row gap-6">
          <View className="flex items-center gap-2">
            <Text className="font-medium">
              {sunrise ? dayjs(sunrise).format("HH:mm") : "No sunrise.."}
            </Text>
            <SunriseIcon className="text-yellow-500" />
          </View>
          <View className="flex items-center gap-2">
            <Text className="font-medium">
              {sunset ? dayjs(sunset).format("HH:mm") : "No sunset.."}
            </Text>
            <SunsetIcon className="text-red-500" />
          </View>
        </View>
      </View>

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
