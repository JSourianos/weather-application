import { YR_API_URL } from "@/src/utils/api";
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

const KorfuUrl = new URL(YR_API_URL);
KorfuUrl.searchParams.append("lat", KorfuCoords.lat.toString());
KorfuUrl.searchParams.append("lon", KorfuCoords.lon.toString());

const OsloUrl = new URL(YR_API_URL);
OsloUrl.searchParams.append("lat", OsloCoords.lat.toString());
OsloUrl.searchParams.append("lon", OsloCoords.lon.toString());

const randomId = () => Math.floor(Math.random() * 1000);

type Url = {
  id: string;
  name: string;
  url: string;
};

const DEFAULT_URLS: Url[] = [
  {
    id: randomId().toString(),
    name: "Korfu",
    url: KorfuUrl.toString(),
  },
  {
    id: randomId().toString(),
    name: "Oslo",
    url: OsloUrl.toString(),
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

  const removeStoredUrl = useCallback(
    (id: string) => {
      setStoredUrls(storedUrls.filter((url) => url.id !== id));
    },
    [storedUrls],
  );

  const contextValue = useMemo(
    () => ({
      storedUrls,
      addStoredUrl,
      removeStoredUrl,
    }),
    [addStoredUrl, removeStoredUrl, storedUrls],
  );

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
