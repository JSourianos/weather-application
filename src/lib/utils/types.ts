// TODO: Update to get more data?
export type YRAPIResponse = {
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
      time: string;
    }[];
  };
};

export type ResponseStatus = "idle" | "loading" | "error";

export type YRTimeseries = YRAPIResponse["properties"]["timeseries"][0];

export type DegreeType = "celsius" | "fahrenheit";

export type YRSunriseResponse = {
  copyright: string;
  licenseURL: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  when: {
    interval: [string, string];
  };
  properties: {
    body: string;
    sunrise: {
      time: string;
      azimuth: number;
    };
    sunset: {
      time: string;
      azimuth: number;
    };
    solarnoon: {
      time: string;
      disc_centre_elevation: number;
      visible: boolean;
    };
    solarmidnight: {
      time: string;
      disc_centre_elevation: number;
      visible: boolean;
    };
  };
};
