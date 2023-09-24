<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-23 21:57:59
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
    {{ t("page.page") }}
    <lay-button :disabled="disabled" @click="handleJumpPage" size="xs"
      >确定</lay-button
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPageSkip",
};
</script>
<script setup lang="ts">
import LayButton from "../../button/index";
import LayInput from "../../input/index";
import { useI18n } from "../../../language";
import { usePage } from "../usePage";
const { t } = useI18n();
const { disabled, jumpNumber, handleBlur, handleJumpPage } = usePage();
</script>
