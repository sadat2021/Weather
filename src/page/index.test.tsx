import React from "react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import Main from ".";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("renders application", () => {
  it("should change title of the card once the input in form changes", () => {
    const { container } = render(<Main />);

    const titleInput = screen.getByTestId("title-input");
    fireEvent.change(titleInput, { target: { value: "test" } });
    expect(screen.getByTestId("card-title").textContent).toBe("TEST");
    expect(container).toMatchSnapshot();
  });

  it("should manage displaying wind speed on card once the wind is on/off inthe form", () => {
    const { container } = render(<Main />);

    const windInputOff = screen.getByTestId("wind-off");
    expect(screen.getByTestId("wind-display")).toBeInTheDocument();
    fireEvent.click(windInputOff);
    expect(screen.queryByTestId("wind-display")).not.toBeInTheDocument();

    const windInputOn = screen.getByTestId("wind-on");
    fireEvent.click(windInputOn);
    expect(screen.getByTestId("wind-display")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should display default details on the card before api call", async () => {
    render(<Main />);

    expect(screen.getByTestId("temperature").textContent).toBe("--°");
    expect(screen.getByTestId("wind-deg").textContent?.trim()).toBe("--");
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "src",
      "sunny-cloudy.jpeg"
    );
    expect(screen.getByTestId("name").textContent).toBe("");
    expect(screen.getByTestId("wind").textContent).toContain("--");
  });

  it("should display api response on the form on api call", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          name: "Sydney",
          weather: [{ icon: "icon1" }],
          main: { temp: "75" },
          wind: { speed: 17, deg: 5 },
        },
      })
    );

    await act(async () => {
      render(<Main />);
    });

    expect(screen.getByTestId("temperature").textContent).toBe("24°");
    expect(screen.getByTestId("wind-deg").textContent?.trim()).toBe("N");

    expect(screen.getByTestId("icon")).toHaveAttribute(
      "src",
      "http://openweathermap.org/img/w/icon1.png"
    );
    expect(screen.getByTestId("name").textContent).toBe("Sydney");
    expect(screen.getByTestId("wind").textContent).toContain("17");
  });

  it("should display error if api call does not work", async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject());

    await act(async () => {
      render(<Main />);
    });

    expect(screen.getByTestId("temperature").textContent).toBe("--°");
    expect(screen.getByTestId("wind-deg").textContent?.trim()).toBe("");
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "src",
      "sunny-cloudy.jpeg"
    );
    expect(screen.getByTestId("name").textContent).toBe("Api Error");
    expect(screen.getByTestId("wind-speed").textContent).toContain("0");
  });

  it("should Display the correct temperature by changing the temperature to f/c", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          name: "Sydney",
          weather: [{ icon: "icon1" }],
          main: { temp: "75" },
          wind: { speed: 17 },
        },
      })
    );

    await act(async () => {
      await render(<Main />);
    });

    expect(screen.getByTestId("temperature").textContent).toBe("24°");
    const FahrenheitRadioInput = screen.getByTestId("f-input");
    expect(screen.getByTestId("wind-display")).toBeInTheDocument();
    fireEvent.click(FahrenheitRadioInput);
    expect(screen.getByTestId("temperature").textContent).toBe("75°");

    const CentigradeRadioInput = screen.getByTestId("c-input");
    expect(screen.getByTestId("wind-display")).toBeInTheDocument();
    fireEvent.click(CentigradeRadioInput);
    expect(screen.getByTestId("temperature").textContent).toBe("24°");
  });
});
