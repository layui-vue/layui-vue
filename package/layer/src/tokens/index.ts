import { inject, ref } from "vue";

const mainIndex = ref(-1);

export const zIndexKey = Symbol("zIndex");

export const nextIndex = function () {
  if (mainIndex.value == -1) {
    mainIndex.value = inject(zIndexKey, 99999);
  } else {
    mainIndex.value = mainIndex.value + 1;
  }
  return mainIndex.value;
};
