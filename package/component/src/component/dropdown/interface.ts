export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";
export type DropdownPlacement =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "right"
  | "right-top"
  | "right-bottom"
  | "left"
  | "left-top"
  | "left-bottom";

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
