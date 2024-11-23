import { DegreeType } from "@/src/lib/utils/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const resolveDegreeSelectionText = (
  celsius: number,
  selectedDegree: DegreeType,
) => {
  if (selectedDegree === "celsius") {
    return `${celsius.toFixed(2)}°C`;
  }

  const fahrenheit = celsius * 1.8 + 32;
  return `${fahrenheit.toFixed(2)}°F`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
