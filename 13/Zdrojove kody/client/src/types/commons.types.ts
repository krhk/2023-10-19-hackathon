import { ChangeEvent } from "react";

/** Typ pro Input */
export interface InputType {
  label: string;
  value: string;
  width?: number;
  widthUnit?: Unit;
  type?: InputEnum;
  required?: boolean;
  helpers?: Array<string>;
  onChange: (content: string) => void;
}

export enum Unit {
  Percentages = "%",
  Pixels = "px",
}

export enum InputEnum {
  Text = "text",
  Time = "time",
}

/** Typ pro button */
export interface ButtonType {
  text: string;
  width?: number;
  widthUnit?: Unit;
  height?: number;
  heightUnit?: Unit;
  onClick: () => void;
  className?: string;
}
