::: anchor
:::

::: title 基本介绍
:::

::: describe json-schema-form 是基于 layui-vue form 封装的组件。
:::

::: describe 通过简单的 JSON 配置来定义表单的结构和验证规则，从而实现动态生成表单的功能。
:::

::: title 安装
:::

::: describe 不内置在 layui-vue 中，需要单独安装。
:::

```
npm install @layui/json-schema-form --save
```

::: describe 全局注册
:::

```js
import App from "./App.vue";
import { createApp } from "vue";
import LayJsonSchemaForm from "@layui/json-schema-form";
import "@layui/json-schema-form/lib/index.css";

createApp(App).use(LayJsonSchemaForm).mount("#app");
```

::: title 基本使用
:::

::: demo 使用 `lay-json-schema-form` 标签, 创建一个 JSON 表单。内置包含 `text` `password` `textarea` `select` `switch` `rate` `radio` `checkbox`（日期）`date` `datetime` `year` `month` `time` `yearmonth` 通用 type 类型

<template>
  <lay-json-schema-form :model="form" :inputs="inputs1" ></lay-json-schema-form>
  <lay-button type="primary" @click="submit1">提交</lay-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { layer } from '@layui/layer-vue'

const form = reactive({
  name: '凡凡',
  password: '',
  like: '',
  textarea: '',
  switch: true,
  date: '',
  rate: 0,
  radio: 0,
  checkbox: [0]
})

const inputs1 = [
  {
    label: '姓名',
    type: 'text',
    name: "name",
    placeholder: '请输入姓名',
  },
  {
    label: '密码',
    type: 'password',
    name: "password",
    autocomplete: "off",
    placeholder: '请输入密码',
  },
   {
    label: '爱好',
    type: 'select',
    name: "like",
    placeholder: '请选择爱好',
    options: [
      { label: '唱', value: '1' },
      { label: '跳', value: '2' },
      { label: 'rap', value: '3' },
      { label: '篮球', value: '4' }
    ]
  },
  {
    label: '备注',
    type: 'textarea',
    name: "remark",
    placeholder: '请输入备注',
  },
  {
    label: '开关',
    type: 'switch',
    name: "switch",
  },
  {
    label: '评分',
    type: 'rate',
    name: "rate",
  },
  {
    label: '日期',
    type: 'date',
    name: "date",
  },
  {
    label: '单选',
    type: 'radio',
    name: "radio",
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
  },
  {
    label: '单选-button',
    type: 'radio',
    name: "radio1",
    button: true,
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
  },
  {
    label: '多选',
    type: 'checkbox',
    name: "checkbox",
    options: [
      {
        label: "运动",
        value: 0,
        skin: "primary"
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
  }
]

const submit1 = () => {
  layer.msg(`${JSON.stringify(form)}`, { time: 2000 });
}
</script>

:::

::: title 栅格布局
:::

::: demo 使用 `space` `colProps` 参数设置栅格布局

<template>
  <lay-json-schema-form :space="space" :inputs="inputs2"></lay-json-schema-form>
</template>

<script setup>
import {ref} from 'vue'

const space = ref(20)

const inputs2 = ref([
  {
    label: '栅格布局12',
    name: 'text1',
    type: 'text',
    colProps: {
      md: 12
    }
  },
  {
    label: '栅格布局12',
    name: 'text2',
    type: 'text',
    colProps: {
      md: 12
    }
  },
  {
    label: '栅格布局6',
    name: 'text3',
    type: 'text',
    colProps: {
      md: 6
    }
  },
  {
    label: '栅格布局6',
    name: 'text4',
    type: 'text',
    colProps: {
      md: 6
    }
  },
  {
    label: '栅格布局6',
    name: 'text5',
    type: 'text',
    colProps: {
      md: 6
    }
  },
  {
    label: '栅格布局6',
    name: 'text6',
    type: 'text',
    colProps: {
      md: 6
    }
  }
])

</script>

:::

::: title 表单校验
:::

::: demo 使用 `required` 参数设置全部 form-item 校验

<template>
  <lay-json-schema-form :inputs="inputs3" required></lay-json-schema-form>
</template>

<script setup>
import {ref} from 'vue'
const inputs3 = ref([
  {
    label: '姓名',
    type: 'text',
    name: "name",
    placeholder: '请输入姓名',
  },
  {
    label: '密码',
    type: 'password',
    name: "password",
    autocomplete: "off",
    placeholder: '请输入密码',
  },
])
</script>

:::

::: title 自定义校验
:::

::: demo

<template>
  <lay-json-schema-form :model="form1" ref="formRef1" :inputs="inputs4"></lay-json-schema-form>
  <div style="text-align: center">
    <lay-button @click="submit2" type="primary">提交</lay-button>
    <lay-button @click="reset1">重置表单</lay-button>
    <lay-button @click="clear1">清除校验</lay-button>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'

const formRef1 = ref()
const form1 = reactive({
  name: '123',
  password: '',
  rules1: '',
  rules2: ''
})

const inputs4 = ref([
  {
    label: '姓名',
    type: 'text',
    name: "name",
    placeholder: '请输入姓名',
  },
  {
    label: '密码',
    type: 'password',
    name: "password",
    autocomplete: "off",
    placeholder: '通用必填',
    required: true,
  },
  {
    label: 'type-rules',
    type: 'text',
    name: "rules1",
    placeholder: 'type-rules',
    required: true,
    rules: {
      type :  'string',
      min : 1,
      max : 10
    }
  },
  {
    label: 'validator-rules',
    type: 'text',
    name: "rules2",
    placeholder: 'validator-rules',
    required: true,
    rules: {
      validator(rule, value, callback, source, options){
        if (value < 18) {
          callback(new Error(`${rule.field}太过于年轻`));
        } else {
          return true;
        }
      }
    }
  },
])

const submit2 = () => {
  formRef1.value.validate()
}

const reset1 = () => {
  formRef1.value.resetFields()
}

const clear1 = () => {
  formRef1.value.clearValidate()
}
</script>

:::

::: title 自定义渲染
:::

::: demo

<template>
  <lay-json-schema-form :model="form2" :inputs="inputs5">
    <template #string="{input, model}">
      <div style="height: 200px;background-color: var(--button-primary-background-color);">
        <p>input: {{input}}</p>
        <p>model: {{model}}</p>
      </div>
    </template>
  </lay-json-schema-form>
</template>

<script setup>
import {ref, reactive, h} from 'vue'

const form2 = reactive({
  customRender1: 'string'
})

const inputs5 = ref([
  {
    label: '参数为string',
    name: 'customRender1',
    customRender: 'string'
  },
  {
    label: '参数为function',
    name: 'customRender2',
    customRender: (input, model) => h('div', {style: 'height: 200px;background-color: var(--button-primary-background-color);'}, [h('p', {}, 'input: ' + JSON.stringify(input)), h('p', {}, 'model: ' + JSON.stringify(model))])
  }
])
</script>

:::

::: title 事件回调
:::

::: demo

<template>
  model: {{form6}}
  <lay-json-schema-form label-width="200" :model="form6" :inputs="inputs6" />
</template>

<script setup>
import {ref, reactive} from 'vue'

const form6 = reactive({
  input: '',
  select: ''
})

const inputs6 = ref([
  {
    label: '输入框-input事件',
    type: 'text',
    name: 'input',
    onInput: (v) => {
      console.log(v, 'input')
    }
  },
  {
    label: 'select-change事件',
    type: 'select',
    name: 'select',
    options: [
      {
        label: '唱',
        value: '1'
      },
      {
        label: '跳',
        value: '2'
      },
      {
        label: 'rep',
        value: '3'
      },
      {
        label: '篮球',
        value: '4'
      }
    ],
    onChange: (v) => {
      console.log(v, 'select-change')
    }
  }
])

</script>

:::

::: title Props
:::

::: table
| 属性 | 描述 | 类型 | 默认值 |
| ----------------------- | --------------------------- | --------- | ------------ |
| model | 表单数据对象 | `object` | - |
| inputs | 表单输入项配置 | `InputsProps[]` | - |
| space | 表单组件之间的间距 | `number` `string` | 10 |
| [formProps 快捷查看](http://www.layui-vue.com/zh-CN/components/form)|
:::

::: title InputsProps
:::

::: table
| 属性 | 描述 | 类型 | 默认值 |
| ----------------------- | --------------------------- | --------- | ------------ |
|label | 标签文本 | `string` | - |
|name | 表单字段名称，对应 `Props.model`表单数据对象 中属性名 | `string` | - |
|type | 内置渲染表单组件类型 `text` `password` `textarea` `select` `switch` `rate` `radio` `checkbox`，日期：`date` `datetime` `year` `month` `time` `yearmonth` | `string` | - |
|hidden | 是否隐藏当前 Input | `boolean` | `false` |
|required | 是否必填 | `boolean` | `false` |
|rules | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator) |`object` | -|
|customRender | 自定义渲染 | ` string` `() => VNode ` | - |
|colProps | 栅格布局参数，col 组件[props](http://www.layui-vue.com/zh-CN/components/grid) | `object` | { md: 24 } |
|errorMessage | form-item props ` errorMessage.required-error-message` `errorMessage.error-message ` | `object` | -|
:::

::: title types
:::

```ts
type InputsType =
  | "text"
  | "password"
  | "select"
  | "textarea"
  | "switch"
  | "radio"
  | "date"
  | "datetime"
  | "year"
  | "month"
  | "time"
  | "yearmonth"
  | "rate"
  | "checkbox";

type modelType = {
  [key: string]: any;
};

type customRenderFnType = (input: InputsProps, model: modelType) => VNode;
type customRenderType = string | customRenderFnType;

interface JsonSchemaFormProps {
  model?: modelType;
  initValidate?: boolean;
  useCN?: boolean;
  required?: boolean;
  requiredIcons?: string;
  pane?: boolean;
  labelPosition?: string;
  size?: string;
  labelWidth?: string;
  space?: number | string;
  inputs: InputsProps[];
}

interface InputsProps extends modelType {
  label: string;
  type: InputsType;
  name: string;
  required?: boolean;
  rules?: Rule;
  errorMessage: ErrorMessage;
  hidden?: boolean;
  colProps?: ColProps;
  customRender?: customRenderType;
}
```
