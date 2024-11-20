import { View, Text } from "react-native";
import { useFetchWeatherData } from "@/src/hooks/useFetchWeatherData";
import { ErrorView } from "@/src/components/ErrorView";
import { LoadingView } from "@/src/components/LoadingView";

export const WeatherItem = ({ url }: { url: string }) => {
  const { data, status } = useFetchWeatherData(url);

  if (status === "error" || data === null) {
    return <ErrorView />;
  }

  if (status === "loading") {
    return <LoadingView />;
  }

  return (
    <View>
      <Text>
        {JSON.stringify(
          data?.properties.timeseries[0].data.instant.details,
          null,
          2,
        )}
      </Text>
    </View>
  );
};
