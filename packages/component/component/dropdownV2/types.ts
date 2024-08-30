import type { StyleValue, TeleportProps } from "vue";
import type { PopperTrigger, Placement } from "../popper/index";

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
  teleportProps?: TeleportProps;
}

export type DropdownEmits = {
  show: [value: boolean];
  hide: [value: boolean];
};
