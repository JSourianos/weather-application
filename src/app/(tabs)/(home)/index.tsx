import { FlatList, View } from "react-native";
import { useEffect } from "react";
import { WeatherItem } from "@/src/components/WeatherItem";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useStoredUrls } from "@/src/context/stored-urls";
import { AddUserLocation } from "@/src/components/AddUserLocation";
import { ASYNC_STORAGE_KEYS } from "@/src/utils/async-storage-keys";
/*
 *
 * TODO:
 *  1. Base Wrapper around Item, Loading and Error.
 *  6. Weather wind direction etc, on the window specific page.
 *  7. Add a refresh button.
 *  8. Wind from direction, and transform the icon.
 *  10. Add 5-10 location that are searchable, in an action sheet
 * */

export default function Homepage() {
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
}
