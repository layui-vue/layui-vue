<template>
  <div class="layui-collapse">
    <slot />
  </div>
</template>

<script setup name="LayCollapse"></script>
<script setup lang="ts">
import { withDefaults, defineProps, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    openKeys: string[]
  }>(),
  {
    openKeys: function () {
      return []
    },
  }
)

provide("openKeys",props.openKeys)

</script>
