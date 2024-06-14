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
      // console.log(args, "args");
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
      const { width, height } = arrowEl.getBoundingClientRect();
      console.log(width, height, "width, height");
      console.log(args.rects.floating.width, "args.rects.floating.width");

      switch (args.placement) {
        case "bottom":
          arrowEl.style.transform = `translate(${
            args.rects.floating.width / 2 - width / 2
          }px, 0px)`;
        // return args.rects.floating.width / 2 - width/2;
      }

      return {};
    },
  };
};
