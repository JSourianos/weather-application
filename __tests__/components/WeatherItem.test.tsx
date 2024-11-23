import { render, screen } from "@testing-library/react-native";
import { WeatherItem } from "@/src/components/WeatherItem";
import * as UserPreferenceContext from "@/src/context/user-preference";

jest.mock("@/src/context/user-preference", () => ({
  ...jest.requireActual("@/src/context/user-preference"),
  useUserPreference: jest.fn(),
}));

const mockWeatherData = {
  properties: {
    timeseries: [
      {
        data: {
          instant: {
            details: {
              air_temperature: 20,
              relative_humidity: 65,
              wind_speed: 5,
            },
          },
        },
      },
    ],
  },
};

describe("WeatherItem", () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWeatherData),
      }),
    ) as jest.Mock;

    // Mock useUserPreference hook
    (UserPreferenceContext.useUserPreference as jest.Mock).mockReturnValue({
      degreeType: "celsius",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders weather data correctly in celsius", async () => {
    const { findByText } = render(
      <WeatherItem url="https://test.url" name="Test Location" id="test-id" />,
    );

    // Check for initial loading
    expect(await findByText("Loading...")).toBeTruthy();

    expect(await findByText("Test Location")).toBeTruthy();
    expect(await findByText("20°C")).toBeTruthy();
    expect(await findByText("Humidity: 65%")).toBeTruthy();
    expect(await findByText("Wind: 5 km/h")).toBeTruthy();
  });

  it("renders weather data correctly in fahrenheit", async () => {
    (UserPreferenceContext.useUserPreference as jest.Mock).mockReturnValue({
      degreeType: "fahrenheit",
    });

    const { findByText } = render(
      <WeatherItem url="https://test.url" name="Test Location" id="test-id" />,
    );

    expect(await findByText("68°F")).toBeTruthy();
  });

  it("shows error view when fetch fails", async () => {
    global.fetch = jest.fn(() => Promise.reject("API Error")) as jest.Mock;

    const { findByText } = render(
      <WeatherItem url="https://test.url" name="Test Location" id="test-id" />,
    );

    expect(await findByText("Oops, something went wrong...")).toBeTruthy();
  });
});
