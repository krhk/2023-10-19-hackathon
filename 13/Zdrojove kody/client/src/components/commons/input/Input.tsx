import { InputEnum, InputType, Unit } from "@/types/commons.types";
import { useEffect, useRef, useState } from "react";

/** Komponenta pro Input */
export default function Input({
  label,
  width = 90,
  widthUnit = Unit.Percentages,
  value,
  required,
  type = InputEnum.Text,
  helpers,
  onChange,
}: InputType) {
  const ref = useRef<any>(null);
  const [showHelper, setShowHelper] = useState<boolean>(false);
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);

  const getListTenHelpers = (): Array<string> => {
    if (helpers) {
      if (helpers.length < 0) {
        return [];
      }
      const currentHelpers = helpers?.filter((x) =>
        x.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
      );

      if (currentHelpers) return currentHelpers.slice(0, 5);
      else return [];
    }

    return [];
  };

  const handleClickOutside = (event: any) => {
    if (!ref.current.contains(event.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    if (clickedOutside) {
      setShowHelper(false);
    } else {
      setShowHelper(true);
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [clickedOutside]);

  return (
    <div
      style={{ width: `${width}${widthUnit}` }}
      className="rounded-md h-20 py-2 px-3 my-2 border-2 border-blue-400 ownInput"
      ref={ref}
      onClick={() => setClickedOutside(false)}
    >
      <div className="font-bold h-2/5">
        {label} {required && <em className="text-redberry">*</em>}
      </div>
      <div className="bg-gray-500 h-3/5 relative">
        <input
          className="border-none focus:outline-none"
          value={value}
          type={type}
          required={required}
          onChange={(e) => {
            onChange(e.target.value);
            setShowHelper(true);
          }}
          style={{ width: "100%", height: "100%" }}
        />
        {helpers && helpers.length > 0 && showHelper && (
          <HelpersWindow
            helpers={getListTenHelpers()}
            onClick={(helper) => {
              onChange(helper);
              setShowHelper(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function HelpersWindow({
  helpers,
  onClick,
}: {
  helpers: Array<string>;
  onClick: (helper: string) => void;
}) {
  if (helpers && helpers.length > 0) {
    return (
      <div className="absolute w-full z-50 cursor-pointer childOdd:bg-gray-500 childOdd:text-white childEven:bg-gray-400 hover:child:bg-darkGray hover:child:text-white">
        {helpers.map((helper, index) => (
          <div
            key={index}
            className="h-10 py-1 px-4 flex items-center"
            onClick={() => onClick(helper)}
          >
            {helper}
          </div>
        ))}
      </div>
    );
  } else return <></>;
}
