<script lang="ts">
export default {
  name: "TeleportWrapper",
};
</script>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

export interface TeleportWrapperProps {
  to?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TeleportWrapperProps>(), {
  to: "",
  disabled: false,
});

const target = ref<Element | null>(null);

onMounted(() => {
  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type !== "childList") continue;
      const el = document.querySelector(props.to);
      if (!el) continue;
      target.value = el;
      observer.disconnect();
      break;
    }
  });
  observer.observe(document, { childList: true, subtree: true });
  return () => observer.disconnect();
});
</script>
<template>
  <Teleport :to="target" :disabled="!target || disabled">
    <slot></slot>
  </Teleport>
</template>
