import { useStoredUrls } from "@/src/context/stored-urls";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@/src/lib/utils/async-storage-keys";
import { useEffect } from "react";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { AddUserLocation } from "@/src/components/AddUserLocation";
import { FlatList, View } from "react-native";
import { WeatherItem } from "@/src/components/WeatherItem";

export const HomePageScreen = () => {
  const { storedUrls, addStoredUrl } = useStoredUrls();
  const { getItem } = useAsyncStorage(ASYNC_STORAGE_KEYS.MY_LOCATION);

  async function handleGetLocation() {
    const location = await getItem();

    const alreadyInUrls = storedUrls.some((url) => url.name === "My Location");
    if (alreadyInUrls) {
      return;
    }

    // TODO: Handle error
    if (location) {
      const { latitude, longitude } = JSON.parse(location);

      addStoredUrl({
        id: Math.floor(Math.random() * 1000).toString(),
        name: "My Location",
        url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
      });
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  const containsMyLocation = storedUrls.some(
    (url) => url.name === "My Location",
  );

  return (
    <ScreenWrapper>
      {!containsMyLocation && <AddUserLocation />}

      <FlatList
        style={{ flex: 1 }}
        data={storedUrls}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <WeatherItem {...item} />}
      />
    </ScreenWrapper>
  );
};
