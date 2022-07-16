<template>
  <div class="layui-laydate-footer">
    <slot></slot>
    <div class="laydate-footer-btns">
      <span lay-type="clear" class="laydate-btns-clear" @click="handelClear"
        >清空</span
      >
      <span lay-type="now" class="laydate-btns-now" @click="handelNow"
        >现在</span
      >
      <span lay-type="confirm" class="laydate-btns-confirm" @click="handelOk"
        >确定</span
      >
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PanelFoot",
};
</script>
<script lang="ts" setup>
//foot组件只负责 显示，具体逻辑在父组件中实现 不然太乱了
const emits = defineEmits(["ok", "clear", "now"]);

const handelOk = () => {
  emits("ok");
};

const handelNow = () => {
  emits("now");
};

const handelClear = () => {
  emits("clear");
};
</script>
