import { useUserPreference } from "@/src/context/user-preference";
import { Button, Text, View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import {
  MOCKED_USER_PREFERENCE_VALUE,
  MockedUserPreferenceProvider,
} from "@/__mocks__/context/mocked-user-preference-provider";

const TestChildComponent = () => {
  const { degreeType, updateDegreeType } = useUserPreference();
  return (
    <View>
      <Text>{degreeType}</Text>
      <Button
        title="Change"
        onPress={() => updateDegreeType("fahrenheit")}
        testID="changeButton"
      />
    </View>
  );
};

describe("user-preference.tsx", () => {
  it("children has access to user preference context value", async () => {
    const { getByTestId, getByText } = render(
      <MockedUserPreferenceProvider>
        <TestChildComponent />
      </MockedUserPreferenceProvider>,
    );

    expect(getByText("celsius")).toBeTruthy();

    const button = getByTestId("changeButton");
    fireEvent.press(button);

    expect(MOCKED_USER_PREFERENCE_VALUE.updateDegreeType).toHaveBeenCalledWith(
      "fahrenheit",
    );
  });
});
