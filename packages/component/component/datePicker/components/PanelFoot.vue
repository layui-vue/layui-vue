<template>
  <div class="layui-laydate-footer">
    <slot></slot>
    <div class="laydate-footer-btns">
      <span
        lay-type="now"
        v-if="props.showNow"
        class="laydate-btns-now"
        @click="handelNow"
        >{{ t("datePicker.now") }}</span
      >
      <span lay-type="confirm" class="laydate-btns-confirm" @click="handelOk">{{
        t("datePicker.confirm")
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "../../../language";

export interface PanelFoot {
  showNow?: boolean;
}

defineOptions({
  name: "PanelFoot",
});

const props = withDefaults(defineProps<PanelFoot>(), {
  showNow: true,
});

const { t } = useI18n();

const emits = defineEmits(["ok", "clear", "now"]);

const handelOk = () => {
  emits("ok");
};

const handelNow = () => {
  emits("now");
};
</script>
