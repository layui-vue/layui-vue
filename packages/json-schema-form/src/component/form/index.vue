<script lang="ts" setup>
import "./index.less";
import type {
  FormCallback,
  JsonSchemaFormProps as _JsonSchemaFormProps,
} from "./types";

import { provide, ref, useSlots } from "vue";
import { LayForm, LayFormItem, LayRow, LayCol } from "@layui/component";
import FormBlock from "../form-block";
import { useForm } from "./useForm";

export type JsonSchemaFormProps = _JsonSchemaFormProps;

const props = withDefaults(defineProps<JsonSchemaFormProps>(), {
  model: () => ({}),
  space: 10,
  useCN: true,
  schema: () => ({}),
});

const { Schema, formProps } = useForm(props);
const slots = useSlots();

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

provide("LayJsonSchemaForm", { model: props.model, slots });

defineExpose({ validate, resetFields, clearValidate });
</script>

<template>
  <lay-form ref="formRef" :model="model" v-bind="formProps">
    <lay-row :space="space">
      <template v-for="(schemaValue, schemaName) in Schema" :key="schemaName">
        <lay-col v-bind="schemaValue.colProps" v-if="!schemaValue.hidden">
          <lay-form-item v-bind="schemaValue" :prop="(schemaName as string)">
            <template
              v-if="
                schemaValue.slots &&
                typeof schemaValue.slots.customRender === 'string'
              "
            >
              <slot
                :name="schemaValue.slots.customRender"
                :schemaKey="schemaName"
                :schemaValue="schema[schemaName]"
                :model="model"
              ></slot>
            </template>
            <form-block
              v-else
              :schemaValue="schema[schemaName]"
              :fieldName="(schemaName as string)"
            ></form-block>
          </lay-form-item>
        </lay-col>
      </template>
    </lay-row>
  </lay-form>
</template>
