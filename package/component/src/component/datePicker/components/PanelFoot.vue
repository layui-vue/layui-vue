<template>
  <div class="layui-laydate-footer">
    <slot></slot>
    <div class="laydate-footer-btns">
      <span lay-type="clear" class="laydate-btns-clear" @click="handelClear">{{
        t("datePicker.clear")
      }}</span>
      <span lay-type="now" class="laydate-btns-now" @click="handelNow">{{
        t("datePicker.now")
      }}</span>
      <span lay-type="confirm" class="laydate-btns-confirm" @click="handelOk">{{
        t("datePicker.confirm")
      }}</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PanelFoot",
};
</script>
<script lang="ts" setup>
import { useI18n } from "../../../language";

const { t } = useI18n();

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
