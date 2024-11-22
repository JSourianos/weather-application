import { useLocalSearchParams } from "expo-router";
import { SingleWeatherScreen } from "@/src/screens/(home)/single-weather-screen";

export default function WeatherPage() {
  const params = useLocalSearchParams<{ id: string }>();
  return <SingleWeatherScreen params={params} />;
}
