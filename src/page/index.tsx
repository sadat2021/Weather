import React, { useState } from "react";
import WidgetForm from "../components/widgetForm";
import WidgetCard from "../components/widgetCard";
import "./styles.scss";

export interface FormWeatherState {
  title?: string;
  isFahrenheit?: boolean;
  displaywindSpeed?: boolean;
}
function Main() {
  const [formWeather, setFormWeather] = useState<FormWeatherState>({
    title: "",
    isFahrenheit: false,
    displaywindSpeed: true,
  });

  return (
    <div className="main">
      <WidgetForm {...formWeather} setFormWeather={setFormWeather} />
      <div className="divider" />
      <WidgetCard {...formWeather} />
    </div>
  );
}

export default Main;
