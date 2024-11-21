import { DegreeType } from "@/src/utils/types";

export const resolveDegreeSelectionText = (
  celsius: number,
  selectedDegree: DegreeType,
) => {
  if (selectedDegree === "celsius") {
    return `${celsius}°C`;
  }

  const fahrenheit = celsius * 1.8 + 32;
  return `${fahrenheit}°F`;
};
