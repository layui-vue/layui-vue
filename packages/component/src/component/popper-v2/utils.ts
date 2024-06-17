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

      switch (args.placement) {
        case "bottom":
        case "top":
          arrowEl.style.transform = `translate(${
            args.rects.floating.width / 2 - width / 2
          }px, 0px)`;
          break;

        case "bottom-start":
        case "top-start":
          arrowEl.style.transform = `translate(${
            args.rects.reference.width / 2 - width / 2
          }px, 0px)`;
          break;

        case "bottom-end":
        case "top-end":
          arrowEl.style.transform = `translate(${
            args.rects.floating.width -
            args.rects.reference.width +
            (args.rects.reference.width / 2 - width / 2)
          }px, 0px)`;
          break;

        case "left":
        case "right":
          arrowEl.style.top = "0";
          arrowEl.style.transform = `translate3d(0px, ${
            args.rects.floating.height / 2 - height / 2
          }px, 0px)`;
          break;

        case "left-start":
        case "right-start":
          arrowEl.style.top = "0";
          arrowEl.style.transform = `translate3d(0px, ${
            args.rects.reference.height / 2 - height / 2
          }px, 0px)`;
          break;

        case "left-end":
        case "right-end":
          arrowEl.style.top = "0";
          arrowEl.style.transform = `translate3d(0px, ${
            args.rects.floating.height -
            args.rects.reference.height +
            (args.rects.reference.height / 2 - height / 2)
          }px, 0px)`;
          break;
      }

      return {};
    },
  };
};
