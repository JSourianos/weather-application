import { render } from "@testing-library/react-native";
import { LoadingView } from "@/src/components/LoadingView";

describe("LoadingviEW component", () => {
  it("matches the snapshot", () => {
    const { toJSON } = render(<LoadingView />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the correct loading message", () => {
    const { getByText } = render(<LoadingView />);
    expect(getByText("Loading...")).toBeTruthy();
  });
});
