<script lang="ts">
export default {
  name: "Shade",
};
</script>

<script lang="ts" setup>
import { computed, defineEmits } from "vue";

const emit = defineEmits(["shadeClick"]);

export interface ShadeProps {
  index: number;
  opacity: string;
  visible: boolean;
}

const props = defineProps<ShadeProps>();

const styles = computed(() => {
  return {
    opacity: props.opacity,
    zIndex: props.index,
  };
});

const shadeClick = () => {
  emit("shadeClick");
};
</script>

<template>
  <div
    class="layui-layer-shade"
    :style="styles"
    @click="shadeClick"
    v-if="visible"
  ></div>
</template>
