import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as reactTestRenderer from "react-test-renderer";

import Alumnos from "../app/(tabs)/alumnos";

describe("Alumnos screen", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("shows a loading state then renders a list of alumnos", async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Alumnos />,
    );

    // initial loading state
    expect(getByText("Cargando alumnos...")).toBeTruthy();

    reactTestRenderer.act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => expect(queryByText("Cargando alumnos...")).toBeNull());

    // Loaded list contains a known student
    expect(getByText("CANDELARIA MORA SAMANTHA")).toBeTruthy();

    // Searching filters the list
    const input = getByPlaceholderText("ejemplo: David Garza");
    fireEvent.changeText(input, "CARMONA");

    expect(getByText("CARMONA LOZANO ANGEL EMILIANO")).toBeTruthy();
    expect(queryByText("CANDELARIA MORA SAMANTHA")).toBeNull();
  });
});
