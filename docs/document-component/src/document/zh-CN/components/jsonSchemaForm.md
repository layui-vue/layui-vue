::: anchor
:::

::: title 基本介绍
:::

::: describe Json-schema-form 是在 form 基础上封装的高级组件。
:::

::: describe 通过简单的 JSON 配置来定义表单的结构和验证规则，从而实现动态生成表单的功能。
:::

::: title 安装
:::

::: describe 该组件不内置在 layui-vue 中，需要单独安装。
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
  <lay-json-schema-form :model="form" :schema="schema1" ></lay-json-schema-form>
  <lay-button type="primary" @click="submit1">提交</lay-button>
</template>

<script>
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

const schema1 = reactive({
  name: {
    label: '姓名',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    }
  },
  password: {
    label: '密码',
    componentProps: {
      type: 'password',
      autocomplete: "off",
      placeholder: '请输入密码',
    }
  },
  like: {
    label: '爱好',
    componentProps: {
      type: 'select',
      options: [
        { label: '唱', value: '1' },
        { label: '跳', value: '2' },
        { label: 'rap', value: '3' },
        { label: '篮球', value: '4' }
      ],
      placeholder: '请选择爱好',
    }
  },
  remark: {
    label: '备注',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入备注',
    }
  },
  switch: {
    label: '备注',
    componentProps: {
      type: 'switch',
    }
  },
  rate: {
    label: '评分',
    componentProps: {
      type: 'rate',
    }
  },
  date: {
    label: '日期',
    componentProps: {
      type: 'date',
    }
  },
  radio: {
    label: '单选',
    componentProps: {
      type: 'radio',
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
    }
  },
  radio1: {
    label: '单选-button',
    componentProps: {
      type: 'radio',
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
    }
  },
  checkbox: {
    label: '多选',
    componentProps: {
      type: 'checkbox',
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
  },
})


const submit1 = () => {
  layer.msg(`${JSON.stringify(form)}`, { time: 2000 });
}
</script>

:::

::: title 栅格布局
:::

::: demo 使用 `space` `colProps` 参数设置栅格布局

<template>
  <lay-json-schema-form :space="space" :schema="schema2"></lay-json-schema-form>
</template>

<script setup>
import {ref, reactive} from 'vue'

const space = ref(20)

const schema2 = reactive({
  text1: {
    label: '栅格布局12',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 12
    }
  },
  text2: {
    label: '栅格布局12',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 12
    }
  },
  text3: {
    label: '栅格布局6',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
  text4: {
    label: '栅格布局6',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
  text5: {
    label: '栅格布局6',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
  text6: {
    label: '栅格布局6',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
})

</script>

:::

::: title 表单校验
:::

::: demo 使用 `required` 参数设置全部 form-item 校验

<template>
  <lay-json-schema-form ref="formRef3" :model="form3" :schema="schema3" required></lay-json-schema-form>
   <div style="text-align: center">
    <lay-button @click="submit3" type="primary">提交</lay-button>
    <lay-button @click="reset3">重置表单</lay-button>
    <lay-button @click="clear3">清除校验</lay-button>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
const formRef3 = ref()

const form3 = reactive({
  name: '',
  password: '',
})

const schema3 = reactive({
  name: {
    label: '姓名',
    componentProps: {
      type: 'text',
      placeholder: '请输入姓名',
    }
  },
  password: {
    label: '密码',
    componentProps: {
      type: 'password',
      autocomplete: "off",
      placeholder: '请输入密码',
    }
  },
  
})

const submit3 = () => {
  formRef3.value.validate()
}

const reset3 = () => {
  formRef3.value.resetFields()
}

const clear3 = () => {
  formRef3.value.clearValidate()
}
</script>

:::

::: title 自定义渲染
:::

::: demo

<template>
  <lay-json-schema-form :model="form4" :schema="schema4">
    <template #string="{schemaValue, model}">
      <div style="height: 200px;background-color: var(--button-primary-background-color);">
        <p>schemaValue: {{schemaValue}}</p>
        <p>model: {{model}}</p>
      </div>
    </template>
  </lay-json-schema-form>
</template>

<script setup>
import {ref, reactive, h} from 'vue'

const form4 = reactive({
  customRender1: 'string'
})

const schema4 = reactive({
  customRender1: {
    label: '参数为string',
    componentProps: {
      customRender: 'string'
    }
  },
  customRender2: {
    label: '参数为function',
    componentProps: {
      type: 'password',
      autocomplete: "off",
      placeholder: '请输入密码',
      customRender: (schemaValue, model) => h('div', {style: 'height: 200px;background-color: var(--button-primary-background-color);'}, [h('p', {}, 'schemaValue: ' + JSON.stringify(schemaValue)), h('p', {}, 'model: ' + JSON.stringify(model))])
    }
  },
  
})

</script>

:::

::: title 事件回调
:::

::: demo

<template>
  model: {{form5}}
  <lay-json-schema-form label-width="200" :model="form5" :schema="schema5" />
</template>

<script setup>
import {ref, reactive} from 'vue'

const form5 = reactive({
  input: '',
  select: ''
})

const schema5 = reactive({
  input: {
    label: '输入框-input事件',
    componentProps: {
      type: 'text',
    },
    listeners: {
      onInput: (v) => {
        console.log(v, 'input')
      }
    }
  },
  select: {
    label: 'select-change事件',
    componentProps: {
      type: 'select',
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
    },
    listeners: {
      onChange: (v) => {
        console.log(v, 'select-change')
      }
    }
  }
})

</script>

:::

::: title Props
:::

::: table
| 属性 | 描述 | 类型 | 默认值 |
| ----------------------- | --------------------------- | --------- | ------------ |
| model | 表单数据对象 | `object` | - |
| schema | 表单输入项配置 | `SchemaProps` | - |
| space | 表单组件之间的间距 | `number` `string` | 10 |
| 支持所有 form 中的 props 属性<br>[formProps 快捷查看](http://www.layui-vue.com/zh-CN/components/form)|
:::

::: title SchemaProps
:::

::: table
| 属性 | 描述 | 类型 | 默认值 |
| ----------------------- | --------------------------- | --------- | ------------ |
|hidden | 是否隐藏当前 form-item | `boolean` | false |
|componentProps | 组件 `props`集合，透传至渲染组件中 | `ComponentProps` | - |
|colProps | 栅格布局 `props`集合<br>可查看[gridProps](http://www.layui-vue.com/zh-CN/components/grid) | `ColProps` | - |
|listeners | listeners 事件集合 | `object` | - |
| 支持所有 form-item 中的 props 属性<br>[formItemProps 快捷查看](http://www.layui-vue.com/zh-CN/components/formItem)|
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

interface SchemaProps {
  // key 为FieldName
  [key: string]: SchemaValueType;
}

interface SchemaValueType extends FormItemProps {
  hidden?: boolean;
  componentsProps: ComponentsProps;
  colProps?: ColProps;
  listeners?: listenersType;
}
```
