<script lang="ts">
export default {
  name: "LayException",
};
</script>
<script setup lang="ts">
import { useSlots } from "vue";
import "./index.less";

export interface DropdownProps {
  title?: string;
  status?: "401" | "403" | "404" | "500";
  describe?: string;
}

const slots = useSlots();

const props = withDefaults(defineProps<DropdownProps>(), {
  title: "exception",
  describe: "describe",
});
</script>
<template>
  <div class="layui-exception">
    <div class="layui-exception-image">
      <slot name="image" v-if="slots.default"></slot>
      <template v-else>
        <div v-if="status == '401'" class="error-401" />
        <div v-if="status == '403'" class="error-403" />
        <div v-if="status == '404'" class="error-404" />
        <div v-if="status == '500'" class="error-500" />
      </template>
    </div>
    <div class="layui-exception-details">
      <div class="layui-exception-details-content">
        <div class="layui-exception-details-title">{{ title }}</div>
        <div class="layui-exception-details-describe">{{ describe }}</div>
        <div class="layui-exception-details-extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
