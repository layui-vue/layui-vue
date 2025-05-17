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

::: describe <font color="red">特别说明</font>
:::

::: describe 当您使用 `@layui/unplugin-vue-components/resolvers` 默认注册 `layui-vue` 所有组件时，需要排除 `LayJsonSchemaForm。`
:::

::: describe `vite.config.js`
:::

```js
import Components from "@layui/unplugin-vue-components/vite";
import { LayuiVueResolver } from "@layui/unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        LayuiVueResolver({
          resolveIcons: true,
          exclude: ["LayJsonSchemaForm"],
        }),
      ],
    }),
  ],
});
```

::: title 在线安装
:::

::: describe 根据不同的 CDN 提供商有不同的引入方式，我们在这里以 unpkg 举例。
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="//unpkg.com/@layui/json-schema-form/lib/index.css" />
    <script src="//unpkg.com/vue@3"></script>
    <script src="//unpkg.com/@layui/json-schema-form"></script>
</head>
<body>
    <div id="app">
        {{message}}
        <lay-json-schema-form :model="form" :schema="schema"></lay-json-schema-form>
    </div>

    <script>
        const { createApp, ref, reactive } = Vue

        const app = createApp({
            setup() {
                const message = reactive('Hello vue!')
                const form = ref({})
                const schema = reactive({
                    name: {
                        label: '姓名',
                        type: 'input',
                        props: {
                            type: 'text',
                            placeholder: '请输入姓名',
                        }
                    },
                    password: {
                        label: '密码',
                        type: 'input',
                        props: {
                            type: 'password',
                            autocomplete: "off",
                            placeholder: '请输入密码',
                        }
                    },
                })
                return {
                    message,
                    schema,
                    form,
                }
            }
        })
        app.use(LayuiJsonSchemaForm)
        app.mount('#app')
    </script>
</body>
</html>
```

::: title 基本使用
:::

::: demo 使用 `lay-json-schema-form` 标签, 创建一个 JSON 表单。内置包含 `input` `textarea` `select` `switch` `rate` `radio` `checkbox` `date` 通用 type 类型

<template>
  <lay-json-schema-form :model="form" :schema="schema1" ></lay-json-schema-form>
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

const schema1 = reactive({
  name: {
    label: '姓名',
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    }
  },
  password: {
    label: '密码',
    type: 'input',
    props: {
      autocomplete: "off",
      type: 'password',
      placeholder: '请输入密码',
    }
  },
  like: {
    label: '爱好',
    type: 'select',
    props: {
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
    type: 'textarea',
    props: {
      placeholder: '请输入备注',
    }
  },
  switch: {
    label: '备注',
    type: 'switch',
    props: {
    }
  },
  rate: {
    label: '评分',
    type: 'rate',
    props: {
    }
  },
  date: {
    label: '日期-date',
    type: 'date',
    props: {
      type: 'date'
    }
  },
  date1: {
    label: '日期-datetime',
    type: 'date',
    props: {
      type: 'datetime'
    }
  },
  radio: {
    label: '单选',
    type: 'radio',
    props: {
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
    type: 'radio',
    props: {
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
    type: 'checkbox',
    props: {
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
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 12
    }
  },
  text2: {
    label: '栅格布局12',
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 12
    }
  },
  text3: {
    label: '栅格布局6',
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
  text4: {
    label: '栅格布局6',
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
  text5: {
    label: '栅格布局6',
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    },
    colProps: {
      md: 6
    }
  },
  text6: {
    label: '栅格布局6',
    type: 'input',
    props: {
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
    type: 'input',
    props: {
      type: 'text',
      placeholder: '请输入姓名',
    }
  },
  password: {
    label: '密码',
    type: 'input',
    props: {
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

::: title customRender 渲染
:::

::: demo

<template>
  <lay-json-schema-form :model="form4" :schema="schema4">
    <template #string="{schemaKey, schemaValue, model}">
      <lay-input>
        <template #suffix>
          input后置插槽
        </template>
      </lay-input>
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
    slots: {
      customRender: 'string'
    }
  },
  customRender2: {
    label: '参数为function',
    slots: {
      customRender: ({schemaKey, schemaValue, model}) => h('div', {style: 'height: 200px;background-color: var(--button-primary-background-color);'}, [h('p', {}, 'schemaKey: ' + JSON.stringify(schemaKey)),h('p', {}, 'schemaValue: ' + JSON.stringify(schemaValue)), h('p', {}, 'model: ' + JSON.stringify(model))])
    }
  },
  
})

</script>

:::

::: title 组件内部插槽
:::

::: demo

<template>
  <lay-json-schema-form :model="form7" :schema="schema7">
    <template #inputPrepend="{ disabled }">
      disabled: {{ disabled }} input前置插槽
    </template>
    <template #inputSuffix> input后置插槽 </template>
    <template #selectHeader>
      <div style="padding: 10px">
        <lay-checkbox
          v-model="checkboxValue"
          skin="primary"
          :isIndeterminate="isIndeterminate"
          @change="hanldeChange"
          value="1"
          >全选</lay-checkbox
        >
      </div>
    </template>
  </lay-json-schema-form>
</template>

<script setup>
import { ref, reactive, h, watch } from "vue";

const checkboxValue = ref(false);
const isIndeterminate = ref(false);

const form7 = reactive({
  test1: "string",
  select: [],
});

const schema7 = reactive({
  test1: {
    label: "输入框插槽",
    type: "input",
    slots: {
      prepend: "inputPrepend",
      suffix: ({schemaKey, schemaValue, model}) => {
        return h("div", { style: { color: "red" } }, "123");
      },
    },
    props: {
      disabled: true,
      type: "text",
    },
  },
  select: {
    label: "下拉框插槽",
    type: "select",
    slots: {
      header: "selectHeader",
    },
    props: {
      multiple: true,
      options: [
        { label: "唱", value: "1" },
        { label: "跳", value: "2" },
        { label: "rap", value: "3" },
        { label: "篮球", value: "4" },
      ],
    },
  },
});

watch(
  () => form7.select,
  (val) => {
    console.log(val, "val>>");

    if (val.length === 0) {
      checkboxValue.value = false;
      isIndeterminate.value = false;
    } else if (val.length === 4) {
      checkboxValue.value = true;
      isIndeterminate.value = false;
    } else {
      checkboxValue.value = true;
      isIndeterminate.value = true;
    }
  }
);

const hanldeChange = (v) => {
  isIndeterminate.value = false;
  if (v) {
    form7.select = ["1", "2", "3", "4"];
  } else {
    form7.select = [];
  }
};
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
    type: 'input',
    props: {
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
    type: 'select',
    props: {
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
|type | 渲染组件类型 `input` `textarea` `select` `switch` `rate` `radio` `checkbox` `date` |`string` | - |
|hidden | 是否隐藏当前 form-item | `boolean` | false |
|prop | form-item prop，组件内部赋值为 schema.fieldName，外部传入无效
|props | 组件 `props`集合，透传至渲染组件中 | `object` | - |
|slots | 插槽集合 `object` | -|
|listeners | listeners 事件集合 | `object` | - |
|colProps | 栅格布局 `props`集合<br>可查看[gridProps](http://www.layui-vue.com/zh-CN/components/grid) | `ColProps` | - |
| 支持所有 form-item 中的 props 属性<br>[formItemProps 快捷查看](https://www.layui-vue.com/zh-CN/components/form#表单项(form-item)属性)|
:::

::: title slots
:::

::: table
| 属性 | 描述 | 类型 | 默认值 |
| ----------------------- | --------------------------- | --------- | ------------ |
| customRender | 自定义组件渲染 | `customRenderType` | - |
| `[key: 'string']`| 当前自定义组件渲染内部插槽 | `customRenderType` | - |
:::

::: title types
:::

```ts
type Type =
  | "input"
  | "select"
  | "textarea"
  | "switch"
  | "radio"
  | "date"
  | "rate"
  | "checkbox";

type modelType = {
  [key: string]: any;
};

type customRenderFnParamsOptions = {
  schemaKey: string;
  schemaValue: SchemaValueType;
  model: modelType;
};

type customRenderFnType = (param: customRenderFnParamsOptions) => VNode;
type customRenderType = string | customRenderFnType;

type SlotsType = {
  customRender?: customRenderType;
} & {
  [key: string]: customRenderType;
};

type listenersType = {
  [key: string]: () => void;
};

interface SchemaProps {
  // key 为FieldName
  [key: string]: SchemaValueType;
}

interface SchemaValueType extends FormItemProps {
  type?: Type;
  hidden?: boolean;
  props?: modelType;
  slots?: SlotsType;
  listeners?: listenersType;
  colProps?: ColProps;
}
```
