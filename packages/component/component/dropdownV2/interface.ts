import type { InjectionKey, StyleValue, TeleportProps } from "vue";
import type { PopperTrigger, Placement } from "../popper/index";

export type DropdownContext = {
  onMouseenter: Function;
  onMouseleave: Function;
  addChildRef: Function;
  removeChildRef: Function;
  hide: Function;
};

export const DROPDOWN_INJECTION_KEY: InjectionKey<DropdownContext> =
  Symbol("LayDropdown");

export interface DropdownProps {
  visible?: boolean;
  trigger?: PopperTrigger | Array<PopperTrigger>;
  placement?: Placement;
  disabled?: boolean;
  autoFitPosition?: boolean;
  autoFitWidth?: boolean;
  autoFitMinWidth?: boolean;
  clickToClose?: boolean;
  blurToClose?: boolean;
  clickOutsideToClose?: boolean;
  contentOffset?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  alignPoint?: boolean;
  popperClass?: string | Array<string | object> | object;
  popperStyle?: StyleValue;
  teleportProps?: Partial<TeleportProps>;
}

export type DropdownEmits = {
  show: [value: boolean];
  hide: [value: boolean];
};

export interface pointType {
  x: number;
  y: number;
}
