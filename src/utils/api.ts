const YR_API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

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

const DEFAULT_URLS = [
  {
    name: "Korfu",
    url: KorfuUrl.toString(),
  },
  {
    name: "Oslo",
    url: OsloUrl.toString(),
  },
];

export { YR_API_URL, KorfuUrl, OsloUrl, DEFAULT_URLS };
