<template>
  <div class="lay-table-box">
    <slot></slot>
  </div>
</template>

<style>
.lay-table-box table {
  width: 100%;
  border-collapse: collapse;
  empty-cells: show;
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
  width: 50px;
  max-width: 180px;
  height: 50px;
  border-top: 1px solid whitesmoke;
  padding: 0 10px;
  padding-left: 28px;
}
.lay-table-box table th code,
.lay-table-box table td code {
  line-height: 26px;
  white-space: nowrap;
}
.lay-table-box table th {
  color: #666;
  font-weight: 500;
  background-color: #fafafa;
}
</style>
