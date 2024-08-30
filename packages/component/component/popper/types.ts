import type { ComponentPublicInstance, StyleValue, TeleportProps } from "vue";

import type { Placement, OffsetOptions, Middleware } from "./usePopper/index";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

export type PopperProps = {
  modelValue?: boolean;
  trigger?: PopperTrigger | PopperTrigger[];
  disabled?: boolean;
  placement?: Placement;
  showArrow?: boolean;
  offset?: OffsetOptions;
  enterable?: boolean;
  showAfter?: number;
  hideAfter?: number;
  popperClass?: string | Array<string | object> | object;
  popperStyle?: StyleValue;
  clickOutsideToClose?: boolean;
  middlewares?: Array<Middleware>;
  teleportProps?: TeleportProps;
};

export type ContentProps = PopperProps;

export type TriggerProps = Pick<PopperProps, "trigger"> & {
  customEvents?: {
    click?: () => void;
    mouseenter?: () => void;
    mouseleave?: () => void;
    contextmenu?: (e: Event) => void;
    focusin?: () => void;
    focusout?: () => void;
  };
};

export type ContentComponentInstance = ComponentPublicInstance<{
  show: () => void;
  hidden: () => void;
  update: () => void;
}>;
