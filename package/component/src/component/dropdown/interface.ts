export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";
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
  | "left-end";

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
