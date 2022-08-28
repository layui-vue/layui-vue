export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export type DropdownPlacementLegacy =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "right-top"
  | "right-bottom"
  | "left-top"
  | "left-bottom";

export type DropdownPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end"
  | DropdownPlacementLegacy;

export interface ElementScrollRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  scrollTop: number;
  scrollBottom: number;
  scrollLeft: number;
  scrollRight: number;
  width: number;
  height: number;
}

export interface DropdownContext {
  onMouseenter: Function;
  onMouseleave: Function;
  addChildRef: Function;
  removeChildRef: Function;
  hide: Function;
}

export const dropdownInjectionKey = Symbol("dropdownInjectKey");
