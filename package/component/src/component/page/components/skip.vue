<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-11-03 17:49:08
 * @LastEditors: baobaobao
-->
<template>
  <div class="layui-pager-jumper">
    {{ t("page.goTo") }}
    <lay-input
      :disabled="disabled"
      @blur="handleBlur"
      type="number"
      v-model="jumpNumber"
    ></lay-input>
    <lay-button :disabled="disabled" @click="handleJumpPage" size="xs">
      {{ t("page.confirm") }}
    </lay-button>
  </div>
</template>

<script setup lang="ts">
import LayButton from "../../button/index";
import LayInput from "../../input/index";
import { useI18n } from "../../../language";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageSkip",
});
const { t } = useI18n();
const { disabled, jumpNumber, handleBlur, handleJumpPage } = usePage();
</script>
