import {
  YR_LOCATION_FORECAST_API_URL,
  YR_SUNRISE_API_URL,
} from "@/src/lib/utils/api";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const KorfuCoords = {
  lat: 39.6218413,
  lon: 19.9179603,
};

const OsloCoords = {
  lat: 59.911491,
  lon: 10.757933,
};

const osloForecastUrl = `${YR_LOCATION_FORECAST_API_URL}?lat=${OsloCoords.lat}&lon=${OsloCoords.lon}`;
const osloSunriseUrl = `${YR_SUNRISE_API_URL}?lat=${OsloCoords.lat}&lon=${OsloCoords.lon}`;

const korfuForecastUrl = `${YR_LOCATION_FORECAST_API_URL}?lat=${KorfuCoords.lat}&lon=${KorfuCoords.lon}`;
const korfuSunriseUrl = `${YR_SUNRISE_API_URL}?lat=${KorfuCoords.lat}&lon=${KorfuCoords.lon}`;

const randomId = () => Math.floor(Math.random() * 1000);

type Url = {
  id: string;
  name: string;
  url: string;
  sunriseUrl?: string;
};

const DEFAULT_URLS: Url[] = [
  {
    id: randomId().toString(),
    name: "Korfu",
    url: korfuForecastUrl,
    sunriseUrl: korfuSunriseUrl,
  },
  {
    id: randomId().toString(),
    name: "Oslo",
    url: osloForecastUrl,
    sunriseUrl: osloSunriseUrl,
  },
];

type StoredUrlsContextType = {
  storedUrls: Url[];
  addStoredUrl: (url: Url) => void;
  removeStoredUrl: (id: string) => void;
};

const StoredUrlsContext = createContext<StoredUrlsContextType>({
  storedUrls: [],
  addStoredUrl: () => {},
  removeStoredUrl: () => {},
});

export const StoredUrlsProvider = ({ children }: { children: ReactNode }) => {
  const [storedUrls, setStoredUrls] = useState<Url[]>(DEFAULT_URLS);

  const addStoredUrl = useCallback((url: Url) => {
    setStoredUrls((storedUrls) => [...storedUrls, url]);
  }, []);

  const removeStoredUrl = useCallback((name: string) => {
    setStoredUrls((currentUrls) => currentUrls.filter((url) => url.name !== name));
  }, []);

  const contextValue = useMemo(
    () => ({
      storedUrls,
      addStoredUrl,
      removeStoredUrl,
    }),
    [addStoredUrl, removeStoredUrl, storedUrls],
  );

  console.log("storedUrls", JSON.stringify(storedUrls, null, 2));

  return (
    <StoredUrlsContext.Provider value={contextValue}>
      {children}
    </StoredUrlsContext.Provider>
  );
};

export const useStoredUrls = () => {
  const context = useContext(StoredUrlsContext);
  if (context === undefined) {
    throw new Error(
      "Please use useStoredUrlsContext inside StoredUrlsProvider.",
    );
  }
  return context;
};
