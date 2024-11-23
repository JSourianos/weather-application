import { View, Text, Pressable } from "react-native";
import { useFetchWeatherData } from "@/src/hooks/useFetchWeatherData";
import { ErrorView } from "@/src/components/ErrorView";
import { LoadingView } from "@/src/components/LoadingView";
import { Cloud, Droplets, Wind } from "lucide-react-native";
import { Link } from "expo-router";
import { resolveDegreeSelectionText } from "@/src/lib/utils/utils";
import { useUserPreference } from "@/src/context/user-preference";
import { ItemWrapper } from "@/src/components/ItemWrapper";

export const WeatherItem = ({
  url,
  name,
  id,
}: {
  url: string;
  name: string;
  id: string;
}) => {
  const { data, status } = useFetchWeatherData(url);
  const { degreeType } = useUserPreference();

  // TODO: Fix error flick, this is not correct.
  if (status === "error") {
    return <ErrorView />;
  }

  if (status === "loading") {
    return <LoadingView />;
  }

  if (!data) {
    return <ErrorView />;
  }

  const { air_temperature, relative_humidity, wind_speed } =
    data.properties.timeseries[0].data.instant.details;

  return (
    <Link href={`/weather/${id}`} asChild>
      <Pressable>
        <ItemWrapper>
          <Text className="text-2xl font-bold text-left p-4">{name}</Text>
          <View className="flex items-center justify-center mb-6">
            <View className="col-span-2 flex items-center justify-center">
              <Cloud className="h-12 w-12 text-blue-500 mr-4" />
              <Text className="text-4xl font-bold">
                {resolveDegreeSelectionText(air_temperature, degreeType)}
              </Text>
            </View>
            <View className="flex flex-row justify-center gap-8  mt-4 w-full">
              <View className="flex items-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                <Text>Humidity: {relative_humidity}%</Text>
              </View>
              <View className="flex items-center">
                <Wind className="h-5 w-5 text-blue-500 mr-2" />

                <Text>Wind: {wind_speed} km/h</Text>
              </View>
            </View>
          </View>
        </ItemWrapper>
      </Pressable>
    </Link>
  );
};
