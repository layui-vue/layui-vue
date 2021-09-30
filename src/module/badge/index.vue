<template>
    <span :class="classList" :style="styleList">
        <slot v-if="type != 'dot'"></slot>
    </span>
</template>

<script setup name="LayBadge" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
   	type?: string
	  theme?: string
	  color?: string
  }>()

const classList = [{
				    'layui-badge': !props.type,
                    'layui-badge-dot': props.type == 'dot',
                    'layui-badge-rim': props.type == 'rim',
                },
				'layui-bg-' + props.theme];

const styleList = props.color ? 'background-color: ' + props.color : '';

</script>