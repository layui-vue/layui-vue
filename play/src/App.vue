<template>
  model:{{ model }}

  <lay-json-schema-form
    ref="jsonFormRef"
    :model="model"
    v-bind="props"
    :inputs="inputs"
  >
    <template #customRender-string="{ input, model: model1 }">
      <div style="color: red">input: {{ input }}</div>
      <div style="color: red">model: {{ model1 }}</div>
      <div>customRender-string</div>
      <lay-button @click="handleClick4">改变model</lay-button>
    </template>
  </lay-json-schema-form>
  <lay-button @click="handleClick1">提交</lay-button>
  <lay-button @click="handleClick2">重置</lay-button>
  <lay-button @click="handleClick3">清除验证</lay-button>
  <lay-button @click="handleClick4">改变model</lay-button>
</template>

<script setup lang="ts">
import demo from "./demo.vue";
import { h, reactive, ref } from "vue";

const model = reactive({
  name: "1",
  radio: "1",
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
  model.text2 = "设置value";
  model.radio = "2";
  model.checkbox = ["1", "2", "3"];
};

const props = {
  labelWidth: "150",
};

const inputs = reactive([
  // {
  //   label: "json-form-text",
  //   type: "text",
  //   name: "text1",
  //   required: true,
  //   placeholder: "提示信息",
  //   errorMessage: {
  //     requiredErrorMessage: "123",
  //   },
  //   colProps: {
  //     md: 12,
  //   },
  // },
  // {
  //   label: "json-form-select",
  //   type: "select",
  //   name: "select",
  //   value: "2",
  //   required: true,
  //   rules: {
  //     validator(rule, value, callback, source, options) {
  //       if (value < 18) {
  //         callback(new Error(`${rule.field}太过于年轻`));
  //       } else {
  //         return true;
  //       }
  //     },
  //   },
  //   options: [
  //     {
  //       label: "运动",
  //       value: 0,
  //     },
  //     {
  //       label: "编码",
  //       value: 1,
  //     },
  //     {
  //       label: "运动",
  //       value: 2,
  //     },
  //   ],
  //   colProps: {
  //     md: 12,
  //   },
  // },
  {
    label: "customRender-function",
    name: "customRender1",
    customRender: (input, model) => h(demo, { input, model }),
    onClick() {
      console.log("click");
      inputs[0].hidden = !inputs[0].hidden;
      console.log(inputs, "inputs");
    },
  },
  {
    label: "customRender-string",
    name: "customRender2",
    customRender: "customRender-string",
    // onClick() {
    //   console.log("click");
    //   inputs[0].hidden = !inputs[0].hidden;
    //   console.log(inputs, "inputs");
    // },
  },
  // {
  //   label: "json-form-emit",
  //   name: "text2",
  //   type: "text",
  //   onInput: (v) => {
  //     console.log(v, "input>>>>>>");
  //   },
  // },
  // {
  //   label: "json-form-textarea",
  //   name: "textarea",
  //   type: "textarea",
  // },
  // {
  //   label: "json-form-switch",
  //   name: "switch",
  //   type: "switch",
  // },
  // {
  //   label: "json-form-radio",
  //   name: "radio",
  //   type: "radio",
  //   options: [
  //     {
  //       label: "写作",
  //       value: "1",
  //     },
  //     {
  //       label: "画画",
  //       value: "2",
  //     },
  //     {
  //       label: "运动",
  //       value: "3",
  //     },
  //   ],
  // },
  // {
  //   label: "json-form-rate",
  //   name: "rate",
  //   type: "rate",
  // },
  // {
  //   label: "json-form-checkbox",
  //   name: "checkbox",
  //   type: "checkbox",
  //   options: [
  //     {
  //       label: "写作",
  //       value: "1",
  //       skin: "primary",
  //       disabled: true,
  //     },
  //     {
  //       label: "画画",
  //       value: "2",
  //       skin: "primary",
  //     },
  //     {
  //       label: "运动",
  //       value: "3",
  //       skin: "primary",
  //     },
  //   ],
  // },
]);
</script>
