<template>
  model:{{ model }}

  <lay-json-schema-form
    ref="jsonFormRef"
    :model="model"
    v-bind="props"
    :inputs="inputs"
  ></lay-json-schema-form>
  <lay-button @click="handleClick1">提交</lay-button>
  <lay-button @click="handleClick2">重置</lay-button>
  <lay-button @click="handleClick3">清除验证</lay-button>
  <lay-button @click="handleClick4">改变model</lay-button>
</template>

<script setup lang="ts">
import demo from "./demo.vue";
import { reactive, ref } from "vue";

const model = reactive({
  name: "1",
});

const jsonFormRef = ref();
const handleClick1 = () => {
  jsonFormRef.value.validate();
};
const handleClick2 = () => {
  jsonFormRef.value.resetFields();
};
const handleClick3 = () => {
  jsonFormRef.value.clearValidate();
};
const handleClick4 = () => {
  model.name3 = "设置value";
};

const props = {
  labelWidth: "100",
};

const inputs = [
  {
    label: "json-from-text",
    type: "text",
    name: "name",
    required: true,
    placeholder: "提示信息",
    errorMessage: {
      requiredErrorMessage: "123",
    },
    colProps: {
      md: 12,
    },
  },
  {
    label: "json-from-select",
    type: "select",
    name: "name1",
    value: "2",
    required: true,
    rules: {
      validator(rule, value, callback, source, options) {
        if (value < 18) {
          callback(new Error(`${rule.field}太过于年轻`));
        } else {
          return true;
        }
      },
    },
    options: [
      {
        label: "运动",
        value: 0,
      },
      {
        label: "编码",
        value: 1,
      },
      {
        label: "运动",
        value: 2,
      },
    ],
    colProps: {
      md: 12,
    },
  },
  {
    label: "getComponent",
    name: "name2",
    getComponent: () => demo,
  },
  {
    label: "json-from1",
    name: "name3",
    type: "text",
    onInput: (v) => {
      console.log(v, "input>>>>>>");
    },
  },
];
</script>
