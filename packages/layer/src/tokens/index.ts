import { inject } from "vue";

(window as any).layer = {
  globalIndex: -1,
};

export const zIndexKey = Symbol("zIndex");

export const nextIndex = function () {
  if ((window as any).layer.globalIndex == -1) {
    (window as any).layer.globalIndex = inject(zIndexKey, 99999);
  } else {
    (window as any).layer.globalIndex =
      ((window as any).layer.globalIndex || 99999) + 1;
  }
  return (window as any).layer.globalIndex;
};
