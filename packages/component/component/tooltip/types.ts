import type { StyleValue, TeleportProps } from "vue";
import type { PopperTrigger, Placement } from "../popper/index";

export type TooltipProps = {
  content?: number | string;
  position?: Placement;
  isDark?: boolean;
  disabled?: boolean;
  isAutoShow?: boolean;
  visible?: boolean;
  trigger?: PopperTrigger;
  enterable?: boolean;
  popperClass?: string | Array<string>;
  popperStyle?: StyleValue;
  teleportProps?: TeleportProps;
};
