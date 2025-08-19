<script setup lang="ts">
import { useI18n } from "../../../language";
import LayButton from "../../button/index";
import LayInput from "../../input/index";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageSkip",
});

const { t } = useI18n();
const { disabled, jumpNumber, handleBlur, handleJumpPage } = usePage();
</script>

<template>
  <div class="layui-pager-jumper">
    {{ t("page.goTo") }}
    <LayInput
      v-model="jumpNumber"
      :disabled="disabled"
      type="number"
      @blur="handleBlur"
    />
    <LayButton :disabled="disabled" size="xs" @click="handleJumpPage">
      {{ t("page.confirm") }}
    </LayButton>
  </div>
</template>
