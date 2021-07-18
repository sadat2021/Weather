import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders application", () => {
  it("renders form and card", () => {
    const { container } = render(<App />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getAllByText("Wind")).toHaveLength(2);
    expect(screen.getByText("TITLE OF WIDGET")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
