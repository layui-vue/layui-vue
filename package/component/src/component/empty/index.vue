<script setup lang="ts">
import "./index.less";
import { useSlots, computed } from "vue";
import { useI18n } from "../../language";

export interface EmptyProps {
  description?: string;
  image?: string;
}

defineOptions({
  name: "LayEmpty",
});

const props = withDefaults(defineProps<EmptyProps>(), {});

const { t } = useI18n();
const slots = useSlots();

const description = computed(() =>
  props.description ? props.description : t("empty.description")
);
</script>

<template>
  <div class="layui-empty">
    <div class="layui-empty-image">
      <slot v-if="slots.image" name="image"></slot>
      <img v-else class="layui-empty-image-default" src="./index.svg" />
    </div>
    <div class="layui-empty-description">{{ description }}</div>
    <div class="layui-empty-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
