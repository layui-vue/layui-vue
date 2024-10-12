<template>
  <div class="layui-laydate-footer">
    <slot></slot>
    <div class="laydate-footer-btns">
      <LayButton
        lay-type="now"
        class="laydate-btns-now"
        v-if="props.showNow"
        size="xs"
        @click="handelNow"
        >{{ t("datePicker.now") }}</LayButton
      >
      <LayButton
        lay-type="confirm"
        class="laydate-btns-confirm"
        v-if="props.showConfirm"
        size="xs"
        :disabled="disabledConfirm"
        @click="handelOk"
        >{{ t("datePicker.confirm") }}</LayButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayButton from "../../../button/index.vue";
import { useI18n } from "../../../../language";

export interface PanelFoot {
  showNow?: boolean;
  showConfirm?: boolean;
  disabledConfirm?: boolean;
}

defineOptions({
  name: "PanelFoot",
});

const props = withDefaults(defineProps<PanelFoot>(), {
  showNow: true,
  showConfirm: true,
});

const { t } = useI18n();

const emits = defineEmits(["confirm", "clear", "now"]);

const handelOk = () => {
  emits("confirm");
};

const handelNow = () => {
  emits("now");
};
</script>
