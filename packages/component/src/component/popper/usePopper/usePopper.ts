import type {
  FloatingElement,
  ReferenceElement,
  MiddlewareData,
} from "@floating-ui/dom";
import type { Ref } from "vue";

import type { UsePopperOptions } from "./types";

import { computePosition, autoUpdate } from "@floating-ui/dom";
import { computed, watch, ref, unref, shallowRef } from "vue";
import { unRefRealElement, customError } from "./utils";

export function usePopper(
  reference: Ref<ReferenceElement>, // 参照元素
  popper: Ref<FloatingElement>, // 定位元素
  options: UsePopperOptions = {}
) {
  const customMiddleware = computed(() => unref(options.middleware));
  const customStrategy = computed(() => unref(options.strategy) || "absolute");
  const customPlacement = computed(() => unref(options.placement) || "bottom");

  const referenceElement = computed(() => unRefRealElement(reference.value));
  const popperElement = computed(() => unRefRealElement(popper.value));

  const x = ref(0);
  const y = ref(0);
  const strategy = ref(customStrategy.value);
  const placement = ref(customPlacement.value);
  const middlewareData = shallowRef<MiddlewareData>({});

  const position = computed(() => {
    return { x: unref(x), y: unref(y), strategy: unref(strategy) };
  });

  const popperStyle = computed(() => {
    return {
      top: `${y.value}px`,
      left: `${x.value}px`,
      position: strategy.value,
    };
  });

  // return autoUpdate
  let cleanup: (() => void) | undefined;

  function update() {
    if (referenceElement.value == null || popperElement.value == null) {
      customError('either "reference" or "popper" is missing');
      return;
    }

    computePosition(referenceElement.value, popperElement.value, {
      placement: customPlacement.value,
      strategy: customStrategy.value,
      middleware: customMiddleware.value,
    }).then((data) => {
      x.value = data.x;
      y.value = data.y;
      strategy.value = data.strategy;
      placement.value = data.placement;
      middlewareData.value = data.middlewareData;
    });
  }

  function runCleanup() {
    if (typeof cleanup === "function") {
      cleanup();
      cleanup = undefined;
    }
  }

  function init() {
    runCleanup();

    if (referenceElement.value != null && popperElement.value != null) {
      cleanup = autoUpdate(referenceElement.value, popperElement.value, update);
    }
  }

  watch([referenceElement, popperElement], init, {
    flush: "sync",
  });

  return {
    position,
    strategy,
    placement,
    popperStyle,
    middlewareData,
    update,
  };
}
