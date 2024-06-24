import type { ComponentPublicInstance, StyleValue } from "vue";

import type { Placement, OffsetOptions } from "./usePopper/index";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

export type PopperProps = {
  modelValue?: boolean;
  trigger?: PopperTrigger;
  disabled?: boolean;
  placement?: Placement;
  showArrow?: boolean;
  offset?: OffsetOptions;
  enterable?: boolean;
  showAfter?: number;
  hideAfter?: number;
  popperClass?: string | Array<string | object> | object;
  popperStyle?: StyleValue;
};

export type ContentProps = PopperProps;

export type TriggerProps = Pick<PopperProps, "trigger">;

export type ContentComponentInstance = ComponentPublicInstance<{
  show: () => void;
  hidden: () => void;
  update: () => void;
}>;
