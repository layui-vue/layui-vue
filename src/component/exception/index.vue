<script lang="ts">
import { useSlots } from '@vue/runtime-core';
export default {
    name: "LayException"
}
</script>
<script setup lang="ts">
import "./index.less";

export interface LayDropdownProps {
  title?: string,
  status?: '401' | '403' | '404' | '500',
  describe?: string
}

const slot = useSlots();

const props = withDefaults(defineProps<LayDropdownProps>(), {
  title: "Exception",
  describe: "describe"
});
</script>
<template>
    <div class="layui-exception">
        <div class="layui-exception-image">
            <slot name="image" v-if="slot.default"></slot>
            <template v-else>
                <div v-if="status=='401'" class="error-401" />
                <div v-if="status=='403'" class="error-403" />
                <div v-if="status=='404'" class="error-404" />
                <div v-if="status=='500'" class="error-500" />
            </template>
        </div>
        <div class="layui-exception-details">
            <div class="layui-exception-details-content">
                <div class="layui-exception-details-title">{{title}}</div>
                <div class="layui-exception-details-describe">{{describe}}</div>
                <div class="layui-exception-details-operate">
                    <slot name="action"></slot>
                </div>
            </div>
        </div>
    </div>
</template>