<script lang="ts" setup>
import "./index.less";
import type { modelType, InputsProps, FormCallback } from "./types";

import { provide, ref } from "vue";
import { LayForm, LayFormItem, LayRow, LayCol } from "@layui/layui-vue";
import FormBlock from "../form-block";
import { useForm } from "./useForm";

export interface JsonSchemaFormProps {
  model?: modelType;
  initValidate?: boolean;
  useCN?: boolean;
  requiredIcons?: string;
  pane?: boolean;
  labelPosition?: string;
  size?: string;
  labelWidth?: string;
  space?: number | string;
  inputs: InputsProps[];
}

const props = withDefaults(defineProps<JsonSchemaFormProps>(), {
  model: () => ({}),
  space: 10,
});

const { nInputs, formProps } = useForm(props);

defineOptions({
  name: "LayJsonSchemaForm",
  inheritAttrs: false,
});

const formRef = ref();
/**
 * 验证字段
 */
const validate = (
  fields?: string | string[] | FormCallback | null,
  callback?: FormCallback | null
) => {
  return formRef.value.validate(fields, callback);
};

/**
 * 重置字段
 */
const resetFields = () => {
  return formRef.value.reset();
};

/**
 * 清除验证
 */
const clearValidate = (fields?: string | string[]) => {
  return formRef.value.clearValidate(fields);
};

provide("LayJsonSchemaForm", { model: props.model });

defineExpose({ validate, resetFields, clearValidate });
</script>

<template>
  <lay-form ref="formRef" :model="model" v-bind="formProps">
    <lay-row :space="space">
      <template v-for="(input, inputIndex) in nInputs" :key="inputIndex">
        <lay-col v-bind="input.colProps" v-if="!input.hidden">
          <lay-form-item
            :label="input.label"
            :prop="input.name"
            :required="input.required"
            :rules="input.rules"
            v-bind="{ ...input.errorMessage }"
          >
            <template v-if="typeof input.customRender === 'string'">
              <slot :name="input.customRender" :input="input"></slot>
            </template>

            <form-block v-else :input="input"></form-block>
          </lay-form-item>
        </lay-col>
      </template>
    </lay-row>
  </lay-form>
</template>
