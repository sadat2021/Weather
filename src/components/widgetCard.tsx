import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormWeatherState } from "../page";
import sunnyCloudy from "../assets/images/sunny-cloudy.jpeg";
import { getCoordinates, getWindDirection } from "../helper/helperFunctions";

interface WeatherInfoState {
  name?: string;
  deg?: string;
  windSpeed?: string;
  windDeg?: number;
  icon?: string;
}

function WidgetCard({
  title,
  isFahrenheit,
  displaywindSpeed,
}: FormWeatherState) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoState>({
    name: "",
    deg: "0",
    windSpeed: "",
    windDeg: -1,
    icon: "",
  });

  const getWeatherInfo = async () => {
    let position: any;
    try {
      position = await getCoordinates();
    } catch {
      position = { coords: { latitude: 0, longitude: 0 } };
    }
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=287899b912ebb42f54298d4195fc6ecc&units=imperial`
      );
      if (res && res.data) {
        setWeatherInfo({
          name: res.data.name,
          deg: res.data.main.temp,
          windSpeed: res.data.wind.speed,
          windDeg: res.data.wind.deg,
          icon: res.data.weather[0].icon,
        });
      }
    } catch {
      setWeatherInfo({
        name: "Api Error",
        deg: "0",
        windSpeed: "0",
        windDeg: 0,
        icon: undefined,
      });
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  const { name, deg, windSpeed, icon, windDeg } = weatherInfo;

  return (
    <div className="card">
      <div>
        <h3 data-testid="card-title">
          {title?.toLocaleUpperCase() || "TITLE OF WIDGET"}
        </h3>
        <div className="display-details">
          <img
            data-testId="icon"
            src={
              icon ? `http://openweathermap.org/img/w/${icon}.png` : sunnyCloudy
            }
            className="img"
            alt="icon"
          />
          <div className="details">
            <span data-testId="name">{name}</span>
            <span data-testid="temperature">
              {deg !== "0"
                ? isFahrenheit
                  ? Number(deg).toFixed(0)
                  : ((Number(deg) - 32) / 1.8).toFixed(0)
                : "--"}
              <span>&deg;</span>
            </span>
            <span data-testId="wind">
              {displaywindSpeed && (
                <>
                  <span data-testid="wind-display">Wind </span>{" "}
                  <span data-testid="wind-deg">
                    {windDeg === -1 ? "--" : getWindDirection(windDeg)}{" "}
                  </span>{" "}
                  <span data-testid="wind-speed">
                    {windSpeed || "--"}
                    km/h
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetCard;
