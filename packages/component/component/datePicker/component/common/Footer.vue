<script lang="ts" setup>
import LayButton from "@layui/component/component/button/index.vue";
import { useI18n } from "@layui/component/language";

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

const emits = defineEmits(["confirm", "clear", "now"]);

const { t } = useI18n();

function handelOk() {
  emits("confirm");
}

function handelNow() {
  emits("now");
}
</script>

<template>
  <div class="layui-laydate-footer">
    <slot />
    <div class="laydate-footer-btns">
      <LayButton
        v-if="props.showNow"
        lay-type="now"
        class="laydate-btns-now"
        size="xs"
        @click="handelNow"
      >
        {{ t("datePicker.now") }}
      </LayButton>
      <LayButton
        v-if="props.showConfirm"
        lay-type="confirm"
        class="laydate-btns-confirm"
        size="xs"
        :disabled="disabledConfirm"
        @click="handelOk"
      >
        {{ t("datePicker.confirm") }}
      </LayButton>
    </div>
  </div>
</template>
