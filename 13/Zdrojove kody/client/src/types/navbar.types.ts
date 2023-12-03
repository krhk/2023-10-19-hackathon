import { HTMLAttributeAnchorTarget, ReactNode } from "react";

/** Typ pro NavbarItem */
export interface NavbarItemType {
  children: ReactNode | string;
  url: string;
  hideHoverColor?: boolean;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
}
