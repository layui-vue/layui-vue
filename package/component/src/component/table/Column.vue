<template>
  <th
    v-if="tableColumnKeys.includes(column.key)"
    class="layui-table-cell"
    :style="{
      textAlign: column.align,
      flex: column.width ? '0 0 ' + column.width : '1',
    }"
  >
    <span>
      <template v-if="column.titleSlot">
        <slot :name="column.titleSlot"></slot>
      </template>
      <template v-else>
        {{ column.title }}
      </template>
    </span>
    <!-- 插槽 -->
    <slot></slot> 
  </th>
</template>

<script lang="ts">
export default {
  name: "Column",
};
</script>

<script lang="ts" setup>

export interface LayTableProps {
  column?: any;
  tableColumnKeys?: any;
}

const props = withDefaults(defineProps<LayTableProps>(), {
});
</script>
