import { ButtonType, Unit } from "@/types/commons.types";

/** Komponenta představující Button */
export default function Button({
  text,
  onClick,
  width = 90,
  widthUnit = Unit.Percentages,
  height = 80,
  heightUnit = Unit.Pixels,
  className,
}: ButtonType) {
  return (
    <button
      style={{
        width: `${width}${widthUnit}`,
        height: `${height}${heightUnit}`,
      }}
      className={`rounded-md text-xl bg-darkGray text-white hover:bg-redberry ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
