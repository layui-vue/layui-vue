<template>
  <div class="lay-table-box">
    <slot></slot>
  </div>
</template>
<style>
.lay-table-box table {
  width: 100%; /*表格宽度*/
  border-collapse: collapse; /*使用单一线条的边框*/
  empty-cells: show; /*单元格无内容依旧绘制边框*/
  border-right: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  border-radius: 4px;
}
.lay-table-box table tbody {
  border-bottom: 1px solid whitesmoke;
}
.lay-table-box table th,
.lay-table-box table td {
  font-size: 14px;
  width: 160px;
  max-width: 160px;
  height: 50px; /*统一每一行的默认高度*/
  border-top: 1px solid whitesmoke; /*内部边框样式*/
  padding: 0 10px; /*内边距*/
  padding-left: 28px;
}
.lay-table-box table th {
  color: #666;
  font-weight: 500;
  background-color: #fafafa;
}
.lay-table-box table th,
.lay-table-box table td {
  white-space: nowrap;
}
</style>
