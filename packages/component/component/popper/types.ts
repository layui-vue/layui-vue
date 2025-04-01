import type {
  Ref,
  ComponentPublicInstance,
  StyleValue,
  TeleportProps,
  InjectionKey,
} from "vue";

import type { Placement, OffsetOptions, Middlewares } from "./usePopper/index";

export type PopperTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface PopperProps {
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
  middlewares?: Middlewares;
  teleportProps?: TeleportProps;
}

export type ContentProps = PopperProps;

export type TriggerProps = Pick<PopperProps, "trigger"> & {
  customEvents?: {
    click?: (e: Event) => void;
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

export type ContentContext = {
  allContents?: Ref<HTMLElement>[][];
};

export const CONTENT_INJECTION_KEY: InjectionKey<ContentContext> =
  Symbol("LayPopperContent");
