<script lang="ts">
export default {
  name: "LayJsonSchemaForm",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { Rule, ValidateMessages, ValidateError } from "async-validator";
import { FormCallback, modelType } from "@layui/layui-vue/types";

export interface JsonSchemaFormProps {
  model: any;
  rules?: Rule;
  pane?: boolean;
  space?: number;
  required?: boolean;
  initValidate?: boolean;
  labelPosition?: string;
  requiredIcons?: string;
  validateMessage?: ValidateMessages;
  requiredErroerMessage?: string;
  useCN?: boolean;
  jsonSchema: any;
}

const props = withDefaults(defineProps<JsonSchemaFormProps>(), {});

const formRef = ref();

const validate = (
  fields?: string | string[] | FormCallback | null,
  callback?: FormCallback | null
) => { 
  return formRef.value.validate(fields, callback);
}

const clearValidate = (fields?: string | string[]) => {
  formRef.value.clearValidate(fields);
}

const reset = () => {
  formRef.value.reset();
}

const emits = defineEmits(["submit"]);

const handleSubmit = (isValidate: boolean, model: modelType, errorsArrs: ValidateError[]) => {
  emits('submit', isValidate, model, errorsArrs);
}

defineExpose({ validate, clearValidate, reset });
</script>

<template>
  <lay-form 
    :pane="pane" 
    :model="model"
    :rules="rules"
    :required="required" 
    :initValidate="initValidate" 
    :labelPosition="labelPosition"
    :validateMessage="validateMessage"
    :requiredErroerMessage="requiredErroerMessage"
    :requiredIcons="requiredIcons"
    :useCN="useCN"
    @submit="handleSubmit"
    >
    <lay-row :space="space">
      <template v-for="(val, key, index) in jsonSchema" :key="index">
        <lay-col v-bind="val.grid">
          <lay-form-item :label="val.label">
            <template v-if="val.slots && val.slots.customRender">
              <slot
                :name="val.slots.customRender"
                :schema="val"
                :model="model[key]"
              ></slot>
            </template>
            <template v-else>
              <template v-if="val.type === 'lay-checkbox'">
                <lay-checkbox-group v-model="model[key]">
                  <template v-for="option in val.props.options">
                    <lay-checkbox
                      :label="option.label"
                      :value="option.value"
                      :disabled="option.disabled"
                      skin="primary"
                    ></lay-checkbox>
                  </template>
                </lay-checkbox-group>
              </template>
              <template v-else-if="val.type === 'lay-radio'">
                <lay-radio-group v-model="model[key]">
                  <template v-for="option in val.props.options">
                    <lay-radio
                      :label="option.label"
                      :value="option.value"
                      :disabled="option.disabled"
                    ></lay-radio>
                  </template>
                </lay-radio-group>
              </template>
              <template v-else>
                <component
                  :is="val.type"
                  v-bind="val.props"
                  v-model="model[key]"
                ></component>
              </template>
            </template>
          </lay-form-item>
        </lay-col>
      </template>
    </lay-row>
  </lay-form>
</template>