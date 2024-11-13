import type { InjectionKey, StyleValue, TeleportProps } from "vue";
import type { PopperTrigger, Placement } from "../popper/index";

export type DropdownContext = {
  hide?: () => void;
};

export const DROPDOWN_INJECTION_KEY: InjectionKey<DropdownContext> =
  Symbol("LayDropdown");

export type DropdownTeleportProps = Partial<TeleportProps>;

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

export type DropdownEmits = {
  show: [value: boolean];
  hide: [value: boolean];
};

export interface pointType {
  x: number;
  y: number;
}
