import * as React from "react";
import { useEffect, useRef } from "react";
import "./slider.css";

type ColorType =
  | "orange"
  | "black"
  | "white"
  | "crimson"
  | "blue"
  | "green"
  | "purple"
  | "pink"
  | "yellow"
  | "red";
type RangeSliderProps = {
  min?: number;
  max?: number;
  value: number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: ColorType;
};

const RangeSlider = ({
  min = 0,
  max = 100,
  value,
  changeHandler,
  color = "white",
}: RangeSliderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const progress = (value / max) * 100;

    if (inputRef.current) {
      inputRef.current.style.background = `linear-gradient(to right,${
        color === "orange" ? "#f50" : color
      } ${progress}%, #ccc ${progress}%)`;
    }
  }, [color, max, value]);

  return (
    <input
      className={`_sa2-basic-slider slider-theme-${color}`}
      ref={inputRef}
      type="range"
      min={min}
      max={max}
      value={value}
      id="range"
      onChange={changeHandler}
    />
  );
};

export { RangeSlider };
