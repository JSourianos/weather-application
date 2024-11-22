import React from "react";

import { render } from "@testing-library/react-native";
import { ErrorView } from "@/src/components/ErrorView";

describe("ErrorView component", () => {
  it("matches the snapshot", () => {
    const { toJSON } = render(<ErrorView />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the correct error message", () => {
    const { getByText } = render(<ErrorView />);
    expect(getByText("Oops, something went wrong...")).toBeTruthy();
  });
});
