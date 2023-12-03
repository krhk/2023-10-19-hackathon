import { NavbarItemType } from "@/types/navbar.types";
import Link from "next/link";

/** Komponenta představující NavbarItem */
export default function NavbarItem({
  children,
  url,
  target,
  hideHoverColor,
  className,
}: NavbarItemType) {
  return (
    <Link
      href={url}
      target={target}
      className={`h-full px-3 min-w-[200px] flex justify-center items-center cursor-pointer ${
        !hideHoverColor && "hover:bg-redberry"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
