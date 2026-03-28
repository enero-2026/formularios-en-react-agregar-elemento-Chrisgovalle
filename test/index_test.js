import { render } from "@testing-library/react-native";

import Index from "../app/(tabs)/index";

describe("Index screen", () => {
  it("renders the index text", () => {
    const { getByText } = render(<Index />);
    expect(getByText("Indez")).toBeTruthy();
  });
});
