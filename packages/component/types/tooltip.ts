import { StyleValue } from "vue";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface LayTooltipContext {
  content?: number | string;
  position?: string;
  isDark?: boolean;
  disabled?: boolean;
  isAutoShow?: boolean;
  visible?: boolean;
  trigger?: PopperTrigger | PopperTrigger[];
  enterable?: boolean;
  popperClass?: string | Array<string | object> | object;
  popperStyle?: StyleValue;
}
