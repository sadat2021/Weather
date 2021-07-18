import React from "react";
import { FormWeatherState } from "../page";
import "./styles.scss";

interface WidegtFormProps {
  title?: string;
  isFahrenheit?: boolean;
  displaywindSpeed?: boolean;
  setFormWeather: Function;
}
function WidgetForm({
  title,
  isFahrenheit,
  displaywindSpeed,
  setFormWeather,
}: WidegtFormProps) {
  return (
    <div className="form">
      <div>
        <label htmlFor="title" className="label">
          Title <small>15 characters</small>
        </label>
        <input
          id="title"
          className="text-input"
          type="text"
          placeholder="Title of widget"
          value={title}
          maxLength={15}
          data-testid="title-input"
          onChange={(e) => {
            setFormWeather((item: FormWeatherState) => {
              return { ...item, title: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <span className="label">Temperature</span>
        <div>
          <input
            name="temperature"
            type="radio"
            data-testid="c-input"
            id="deg-c"
            checked={!isFahrenheit}
            onChange={(e) => {
              setFormWeather((item: FormWeatherState) => {
                return { ...item, isFahrenheit: false };
              });
            }}
          />
          <label htmlFor="deg-c">
            <sup>&deg;</sup>C
          </label>
        </div>
        <div>
          <input
            name="temperature"
            type="radio"
            data-testid="f-input"
            id="deg-f"
            checked={isFahrenheit}
            onChange={(e) => {
              setFormWeather((item: FormWeatherState) => {
                return { ...item, isFahrenheit: true };
              });
            }}
          />
          <label htmlFor="deg-f">
            <sup>&deg;</sup>F
          </label>
        </div>
      </div>
      <div>
        <span className="label">Wind</span>
        <div>
          <input
            name="wind"
            type="radio"
            id="on"
            data-testid="wind-on"
            checked={displaywindSpeed}
            onChange={(e) => {
              setFormWeather((item: FormWeatherState) => {
                return { ...item, displaywindSpeed: true };
              });
            }}
          />
          <label htmlFor="on">On</label>
        </div>
        <div>
          <input
            name="wind"
            type="radio"
            id="off"
            data-testid="wind-off"
            checked={!displaywindSpeed}
            onChange={(e) => {
              setFormWeather((item: FormWeatherState) => {
                return { ...item, displaywindSpeed: false };
              });
            }}
          />
          <label htmlFor="off">Off</label>
        </div>
      </div>
    </div>
  );
}

export default WidgetForm;
