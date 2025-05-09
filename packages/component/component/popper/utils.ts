import type { InjectionKey, Ref } from "vue";
import type {
  Middleware,
  MiddlewareState,
  Padding,
} from "./usePopper/index";

import { unref } from "vue";
import { arrow } from "./usePopper/index";

export interface PopperContext {
  TriggerRef: Ref<HTMLElement | null>;
  onShow: () => void;
  onHidden: () => void;
}

export const POPPER_INJECTION_KEY: InjectionKey<PopperContext>
  = Symbol("LayPopperV2");

interface arrowMiddlewareParamsType {
  arrowRef: Ref<HTMLDivElement | null>;
  padding?: Padding;
}

export function arrowMiddleware({
  arrowRef,
  padding,
}: arrowMiddlewareParamsType): Middleware {
  return {
    name: "arrow",
    options: {
      element: arrowRef,
      padding,
    },

    fn(args) {
      const arrowEl = unref(arrowRef);
      if (!arrowEl)
        return {};

      return arrow({
        element: arrowEl,
        padding,
      }).fn(args);
    },
  };
}

export function getArrowPlacement() {
  return {
    name: "ArrowPlacement",
    fn: (args: MiddlewareState) => {
      const _placement = args.placement.split("-")[0];
      args.elements.floating.setAttribute("data-popper-placement", _placement);
      return {};
    },
  };
}

export function getArrowOffer({
  arrowRef,
}: Pick<arrowMiddlewareParamsType, "arrowRef">) {
  return {
    name: "ArrowOffer",
    fn: (args: MiddlewareState) => {
      const arrowEl = unref(arrowRef);
      if (!arrowEl)
        return {};

      arrowEl.style.cssText = "";

      switch (args.placement) {
        case "bottom":
        case "top":
        case "bottom-start":
        case "top-start":
        case "bottom-end":
        case "top-end":
          arrowEl.style.left = "0";
          arrowEl.style.transform = `translate(${args.middlewareData.arrow?.x}px, 0px)`;
          break;

        case "left":
        case "right":
        case "left-start":
        case "right-start":
        case "left-end":
        case "right-end":
          arrowEl.style.top = "0";
          arrowEl.style.transform = `translate(0px, ${args.middlewareData.arrow?.y}px`;
          break;
      }

      return {};
    },
  };
}
