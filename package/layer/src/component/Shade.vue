<script lang="ts">
export default {
  name: "Shade",
};
</script>

<script lang="ts" setup>
import { computed, defineEmits, StyleValue } from "vue";

export interface ShadeProps {
  visible: boolean | string;
  opacity: string;
  index: number | Function;
  teleport: string;
  teleportDisabled: boolean;
  shadeStyle?: StyleValue;
}

const props = defineProps<ShadeProps>();

const emit = defineEmits(["shadeClick"]);

const styles = computed<any>(() => {
  return [{
    opacity: props.opacity,
    position: props.teleportDisabled || props.teleport != "body" ? "absolute" : "fixed",
    zIndex: props.index,
  }, props.shadeStyle];
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
