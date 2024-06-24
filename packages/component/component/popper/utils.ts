import type { InjectionKey, Ref } from "vue";
import type {
  Middleware,
  Padding,
  Placement,
  MiddlewareState,
} from "./usePopper/index";

import { unref } from "vue";
import { arrow } from "./usePopper/index";

export type PopperContext = {
  TriggerRef: Ref<HTMLElement | null>;
  onShow: () => void;
  onHidden: () => void;
};

export const POPPER_INJECTION_KEY: InjectionKey<PopperContext> =
  Symbol("LayPopperV2");

type arrowMiddlewareParamsType = {
  arrowRef: Ref<HTMLDivElement | null>;
  padding?: Padding;
};

export const arrowMiddleware = ({
  arrowRef,
  padding,
}: arrowMiddlewareParamsType): Middleware => {
  return {
    name: "arrow",
    options: {
      element: arrowRef,
      padding,
    },

    fn(args) {
      const arrowEl = unref(arrowRef);
      if (!arrowEl) return {};

      return arrow({
        element: arrowEl,
        padding,
      }).fn(args);
    },
  };
};

export const getArrowPlacement = () => {
  return {
    name: "ArrowPlacement",
    fn: (args: MiddlewareState) => {
      const _placement = args.placement.split("-")[0];
      args.elements.floating.setAttribute("data-popper-placement", _placement);
      return {};
    },
  };
};

export const getArrowOffer = ({
  arrowRef,
}: Pick<arrowMiddlewareParamsType, "arrowRef">) => {
  return {
    name: "ArrowOffer",
    fn: (args: MiddlewareState) => {
      const arrowEl = unref(arrowRef);
      if (!arrowEl) return {};

      arrowEl.style.cssText = "";
      if (["top", "bottom"].includes(args.placement)) {
        arrowEl.style.left = "0";
        arrowEl.style.transform = `translate(${args.middlewareData.arrow?.x}px, 0px)`;
      }

      if (["left", "right"].includes(args.placement)) {
        arrowEl.style.top = "0";
        arrowEl.style.transform = `translate(0px, ${args.middlewareData.arrow?.y}px)`;
      }

      return {};
    },
  };
};
