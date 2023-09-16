<script lang="ts">
export default {
  name: "Shade",
};
</script>

<script lang="ts" setup>
import { computed, defineEmits } from "vue";

export interface ShadeProps {
  opacity: string;
  index: number | Function;
  visible: boolean | string;
  teleportDisabled: boolean;
  teleport: string;
}

const props = defineProps<ShadeProps>();

const emit = defineEmits(["shadeClick"]);

const styles = computed<any>(() => {
  return {
    opacity: props.opacity,
    position: props.teleportDisabled || props.teleport != "body"  ? 'absolute' : 'fixed',
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
