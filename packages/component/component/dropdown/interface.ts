import type { Placement, PopperProps, PopperTrigger } from "@layui/component/component/popper/index";
import type { InjectionKey, StyleValue } from "vue";

export interface DropdownContext {
  hide?: () => void;
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<DropdownContext>
  = Symbol("LayDropdown");

export type DropdownTeleportProps = PopperProps["teleportProps"];

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
  contentOffset?: string | number;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  alignPoint?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  teleportProps?: DropdownTeleportProps;
}

export interface DropdownEmits {
  (e: "show", value: boolean): void;
  (e: "hide", value: boolean): void;
}

export interface pointType {
  x: number;
  y: number;
}
