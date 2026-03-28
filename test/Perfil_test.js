import { render } from "@testing-library/react-native";

import Perfil from "../app/(tabs)/perfil";

describe("Perfil screen", () => {
  it("renders the perfil text", () => {
    const { getByText } = render(<Perfil />);
    expect(getByText("Perfil")).toBeTruthy();
  });
});
