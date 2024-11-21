import { useEffect, useState } from "react";

type ResponseStatus = "idle" | "loading" | "error";

type YRAPIResponse = {
  properties: {
    timeseries: {
      data: {
        instant: {
          details: {
            air_pressure_at_sea_level: number;
            air_temperature: number;
            cloud_area_fraction: number;
            relative_humidity: number;
            wind_from_direction: number;
            wind_speed: number;
          };
        };
      };
    }[];
  };
};

export const useFetchWeatherData = (
  url: string,
): { data: YRAPIResponse | null; status: ResponseStatus } => {
  const [data, setData] = useState<YRAPIResponse | null>(null);
  const [status, setStatus] = useState<ResponseStatus>("idle");

  useEffect(() => {
    async function fetchData() {
      setStatus("loading");

      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setStatus("error");
      } finally {
        setStatus("idle");
      }
    }

    fetchData().catch((e) => setStatus("error"));
  }, [url]);

  return { data, status };
};
