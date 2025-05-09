import type {
  FloatingElement,
  MiddlewareData,
  ReferenceElement,
} from "@floating-ui/dom";
import type { Ref } from "vue";

import type { UsePopperOptions } from "./types";

import { autoUpdate, computePosition } from "@floating-ui/dom";
import { computed, ref, shallowRef, unref, watch } from "vue";
import { unRefRealElement } from "./utils";

export function usePopper(
  reference: Ref<ReferenceElement>, // 参照元素
  popper: Ref<FloatingElement>, // 定位元素
  options: UsePopperOptions = {},
) {
  const customMiddleware = computed(() => unref(options.middleware));
  const customStrategy = computed(() => unref(options.strategy) || "fixed");
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
  const cleanup = ref<(() => void) | undefined>();
  const init = ref<(() => void) | undefined>();

  function update() {
    if (referenceElement.value === null || popperElement.value === null) {
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
    if (typeof cleanup.value === "function") {
      cleanup.value();
      cleanup.value = undefined;
    }
  }

  init.value = () => {
    runCleanup();

    if (referenceElement.value !== null && popperElement.value !== null) {
      cleanup.value = autoUpdate(
        referenceElement.value,
        popperElement.value,
        update,
      );
    }
  };

  watch([referenceElement, popperElement], init.value, {
    flush: "sync",
  });

  return {
    position,
    strategy,
    placement,
    popperStyle,
    middlewareData,
    update,
    stopAutoUpdate: cleanup,
    startAutoUpdate: init,
  };
}
