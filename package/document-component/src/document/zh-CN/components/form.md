::: anchor
:::

::: title 基本介绍
:::

::: describe 高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。
:::

::: title 基础使用
:::

::: demo 通过 `lay-form` 与 `lay-form-item` 标签，创建 `form` 组件。

<template>
  <lay-form :model="model">
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="model.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model.describe"></lay-textarea>
    </lay-form-item>
    <lay-form-item style="text-align: center;">
      <lay-button type="primary" @click="submit">提交</lay-button>
      <lay-button type="default" @click="">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

const model = reactive({
  username: "",
  password: "",
  describe: "",
})

const submit = function(){
  layer.msg(`${JSON.stringify(model)}`, { time: 2000 });
};
</script>

:::

::: title 方框风格
:::

::: demo 通过 `pane` 属性，启用方框风格，默认为 `false`。

<template>
  <lay-form :model="model1" :pane="true">
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model1.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="model1.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model1.describe"></lay-textarea>
    </lay-form-item>
    <lay-form-item>
      <lay-button type="primary" @click="submit1">提交</lay-button>
      <lay-button type="default" @click="">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const model1 = reactive({
        username: "",
        password: "",
        describe: "",
    })

    const submit1 = function(){
      layer.msg(`${JSON.stringify(model1)}`, { time: 2000 });
    };

    return {
      model1,
      submit1
    }
  }
}
</script>

:::

::: title 行内表单
:::

::: demo 通过 `mode` 属性 `inline` 值，采用行内布局，默认为 `block` 块状布局。

<template>
  <lay-form :model="model2" :pane="true">
    <lay-form-item label="账户" prop="username" mode="inline">
      <lay-input v-model="model2.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password" mode="inline">
      <lay-input v-model="model2.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item mode="inline">
      <lay-button type="primary" @click="submit2">提交</lay-button>
      <lay-button type="default" @click="">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const model2 = reactive({
        username: "admin",
        password: "admin",
    })

    const submit2 = function(){
      layer.open(`${JSON.stringify(model)}`);
    };

    return {
      model2,
      submit2
    }
  }
}
</script>

:::


::: title 对齐方式
:::

::: demo 通过 `label-position` 属性改变标签位置，默认值为 `right`，可选值为 `top`，`left`。

<template>
  <lay-form :model="model3">
    <lay-form-item label="账户" :label-position="labelPosition" prop="username">
      <lay-input v-model="model3.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" :label-position="labelPosition" prop="password">
      <lay-input v-model="model3.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" :label-position="labelPosition" prop="hobby">
      <lay-select v-model="model3.hobby">
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="特长" :label-position="labelPosition" prop="specialty">
      <lay-radio v-model="labelPosition3" name="labelPosition" value="left">左</lay-radio>
      <lay-radio v-model="labelPosition3" name="labelPosition" value="top">上</lay-radio>
      <lay-radio v-model="labelPosition3" name="labelPosition" value="right">右</lay-radio>
    </lay-form-item>
    <lay-form-item label="描述" :label-position="labelPosition" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model3.desc"></lay-textarea>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const model3 = reactive({})
    
    const labelPosition3 = ref('right');

    return {
      model3,
      labelPosition3
    }
  }
}
</script>

:::

::: title 表单验证
:::

::: demo

<template>
  <lay-form :model="validateModel" ref="layFormRef" required>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="validateModel.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" v-if="validateModel.hobbys == '1'" prop="password">
      <lay-input v-model="validateModel.password" type="password">></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" prop="hobby">
      <lay-select v-model="validateModel.hobbys" multiple>
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="特长" prop="specialty">
      <lay-radio v-model="validateModel.specialty" name="specialty" value="1">写作</lay-radio>
      <lay-radio v-model="validateModel.specialty" name="specialty" value="2">画画</lay-radio>
      <lay-radio v-model="validateModel.specialty" name="specialty" value="3">编码</lay-radio>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="validateModel.desc"></lay-textarea>
    </lay-form-item>
    <lay-form-item style="text-align: center;">
      <lay-button type="primary" @click="validate3">提交</lay-button>
      <lay-button @click="clearValidate">清除校验</lay-button>
      <lay-button @click="reset">重置表单</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const validateModel = reactive({
        username: "",
        password: "",
        specialty: "1",
        hobbys: [],
    })

    const layFormRef = ref(null);

    // 校验
    const validate3= function() {
      layFormRef.value.validate((isValidate, model, errors) => {
          console.log(JSON.stringify(model.file))
         layer.open({
          type: 1,
          title:"表单提交结果", 
          content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`, 
          shade: false,
          isHtmlFragment: true,
          btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
          area : '500px'
        });
      });
    }

    // 清除校验
    const clearValidate = function() {
      layFormRef.value.clearValidate();
    }

    // 重置表单
    const reset = function() {
      layFormRef.value.reset();
      validateModel.specialty = "1"
    }

    return {
      validateModel,
      layFormRef,
      validate3,
      clearValidate,
      reset
    }
  }
}
</script>

:::

::: title 校验规则
:::

::: demo

<template>
  <lay-form :model="ruleDemo1" ref="layFormRef1" :rules="rules" required>
    <lay-form-item label="邮箱" prop="email">
      <lay-input v-model="ruleDemo1.email"></lay-input>
    </lay-form-item>
    <lay-form-item label="路径" prop="url">
      <lay-input v-model="ruleDemo1.url"></lay-input>
    </lay-form-item>
    <lay-form-item label="日期" prop="date">
      <lay-input v-model="ruleDemo1.date"></lay-input>
    </lay-form-item>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="ruleDemo1.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="年龄" prop="age">
      <lay-input v-model="ruleDemo1.age"></lay-input>
    </lay-form-item>
    <lay-form-item style="text-align: center">
      <lay-button @click="validate1" type="primary">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const ruleDemo1 = reactive({
        email: "",
        url: "",
        date: "",
        username: "",
        age: null,
    })

    const rules = ref({
      email : {
        type : 'email',
      },
      url : {
        type : 'url'
      },
      date : {
        type : 'date'
      },
      username : {
        type :  'string',
        min : 8,
        max : 16
      },
      age : {
        validator(rule, value, callback, source, options){
          if (value < 18) {
            callback(new Error(`${rule.field}太过于年轻`));
          } else {
            return true;
          }
        }
      }
    })

    const layFormRef1 = ref(null);
    // 校验
    const validate1 = function() {
      layFormRef1.value.validate((isValidate, model, errors) => {
         layer.open({
          type: 1,
          title:"表单提交结果", 
          content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`, 
          shade: false,
          isHtmlFragment: true,
          btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
          area : '500px'
        });
      });
    }

    return {
      ruleDemo1,
      layFormRef1,
      validate1,
      rules
    }
  }
}
</script>

:::

::: title 原生提交
:::

::: demo

<template>
  <lay-form @submit="submit" :model="submitModel10" requiredIcons="layui-icon-heart-fill" :use-CN="false" required>
    <lay-form-item label="账户" prop="username">
    <template #label>
      <i class="layui-icon layui-icon-username"></i>
      账户
    </template>
      <lay-input v-model="submitModel10.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="submitModel10.password"></lay-input>
    </lay-form-item>
    <lay-form-item style="text-align:center">
      <lay-button type="primary" native-type="submit">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const submitModel10 = reactive({
        username: "",
        password: ""
    })

    const submit10 = function(isValidate, model, errors) {
      layer.msg(`${JSON.stringify(errors)}`)
    }

    return {
      submitModel10,
      submit10
    }
  }
}
</script>

:::

::: title 表单(form)属性
:::

::: table

| 属性                    | 描述                         | 类型      | 可选值         | 默认值       |
| ----------------------- | --------------------------- | --------- | -------------- | ------------ |
| v-model                 | 表单绑定                     | `object`  | -              | {}           |
| required                | 是否必填                     | `boolean` | `true` `false` | `false`      |
| rules                   | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator) `object`  | -              | -            |
| initValidate            | 是否一开始就校验表单          | `boolean` | `true` `false` | `false`      |
| useCN                   | 是否使用中文错误提示          | `boolean` | `true` `false` | `false`      |
| requiredIcons           | 必填前缀图标`class`          | `string`  | -              | `*`          |
| required-erroer-message | 必填错误提示信息              | `string`  | -              | `%s不能为空` |
| validate-message        | 自定义校验错误提示信息; <br>由于内置了中文错误提示，可按需求增量增加<br>可查看 [async-validator 内置错误提示](https://github.com/yiminghe/async-validator/blob/master/src/messages.ts)<br>也可参考 [layui-vue 内置中文错误提示](https://gitee.com/layui/layui-vue/blob/next/package/component/src/component/formItem/cnValidateMessage.ts) | `string`  | -              | `%s不能为空` |
| pane                    | 启用方框风格                 | `boolean`  |  `true` `false`              | `false` |

:::

::: title 表单(form)事件
:::

::: table

| 属性   | 描述                   | 回调参数 |
| ------ | --------------------- | -------- |
| submit | 提交事件`(不推荐使用)` | (`isValidate`, `model`, `errors`)<br><br> `isValidate`: (`boolean`)是否校验通过<br><br> `model`: (`object`)表单绑定的值<br><br> `errors`: (`Array`)校验结果的错误信息 |

:::

::: title 表单(form)方法
:::

::: table

| 属性          | 描述                                                                                                                                                      | 入参                                                                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| validate      | 表单校验; <br>如果没有`callback`回调，会返回`Promise`, <br> `Promise`参数为{`isValidate`, `model`, `errors`}<br> 参数具体描述请看上面表单`submit`提交事件 | (`fields` `[可选]`, `callback` `[可选]`)<br><br> `fields`: (`string` / `string[]` / `function`)<br>单独校验的字段，<br>该字段如果为`function`, <br>则认为`callback`入参，校验全部字段;<br><br> `callback`: (`function`)校验之后的回调，<br>回调参数为(`isValidate`, `model`, `errors`)；<br>参数具体描述请看上面表单`submit`提交事件 |
| clearValidate | 清除表单校验                                                                                                                                              | (`fields`[可选])<br><br> `fields`: (`string` / `string[]`)<br>需要进行清除校验的表单字段, 如果该字段为空则清除全部校验                                                                                                                                                                                                               |
| reset         | 重置表单所有值                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                                    |

:::

::: title 表单项(form-item)属性
:::

::: table

| 属性                   | 描述                                                                                   | 类型              | 可选值               | 默认值  |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------- | -------------------- | ------- |
| prop                   | 在表单绑定值(`model`)中字段`key`                                                       | `string`          | -                    | -       |
| label                  | 子项前边描述值，**尽量填写**，中文校验错误需要用到                                     | `string`          | -                    | -       |
| label-position         | 子项前边描述值的位置                                                                   | `string`          | `left` `top` `right` | `right` |
| label-width            | 子项前边描述值的宽度                                                                   | `string` `number` | -                    | `95`    |
| required               | 表单必填                                                                               | `boolean`         | `true` `false`       | `false` |
| required-error-message | 表单必填校验失败固定提示语                                                             | `string`          | --                   | --      |
| rules                  | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator) | `object`          | -                    | -       |
| error-message          | 表单校验失败固定提示语                                                                 | `string`          | --                   | --      |
| mode                   | 表单项显示的模式，`块元素` / `行元素`                                                  | `string`          | `block` `inline`     | `block` |

:::

::: title 表单项(form-item)方法
:::

::: table

| 属性          | 描述         | 入参        |
| ------------- | ------------ | -----------|
| validate      | 表单校验;    | (`callback` `[可选]`)<br><br> `callback`: (`function`)校验之后的回调，<br>回调参数为(`errors`, `fields`)；<br><br> `errors`: (`Array`)校验结果的错误信息；<br><br> `fields`: (`Array`)当前校验的字段信息 |
| clearValidate | 清除表单校验  | -         |

:::

::: title 表单项(form-item)插槽
:::

::: table

| 属性     | 描述                                                                 | 可使用参数                               |
| -------- | --------------------------------------------------------------------| ---------------------------------------- |
| -        | 默认插槽                                                             | 传递进来的`props`和表单绑定的值(`model`) |
| label    | 子项前边描述插槽<br>如果使用此插槽，`props`**尽量**也传递`label`参数    | 传递进来的`props`和表单绑定的值(`model`) |
| required | 必填前缀插槽                                                         | `*` / `表单props` 中的 `requiredIcons`   |

:::

::: title 关于 async-validator 的使用
:::

::: describe 查看： https://github.com/yiminghe/async-validator。
:::

::: describe 翻译： ttps://www.cnblogs.com/wozho/p/10955525.html。
:::

::: title async-validator 基本校验类型
:::

::: table
| 属性 | 描述 | 使用方式 |
| -------------| ----------------- | ------------------- |
| number | 数字 | `{type : 'number'}` |
| boolean | 布尔类型 | `{type : 'boolean'}` |
| method | 方法 | `{type : 'method'}` |
| regexp | 正则表达式 | `{type : 'regexp'}` |
| integer | 整型数字 | `{type : 'integer'}` |
| float | 浮点小数 | `{type : 'float'}` |
| array | 数组 | `{type : 'array'}` |
| object | 对象 | `{type : 'object'}` |
| enum | 枚举 | `{type : 'enum'}` |
| date | 日期 | `{type : 'date'}` |
| url | url | `{type : 'url'}` |
| hex | 十六进制 | `{type : 'hex'}` |
| email | 邮箱 | `{type : 'email'}` |
:::

::: title async-validator 中 validator 参数使用
:::

```javascript
{
  validator: (rule, value) => value === "root";
}
```

::: title async-validator 中 asyncValidator 参数使用
:::

```javascript
{
  asyncValidator: (rule, value) => {
    return new Promise((resolve, reject) => {
      if (value < 18) {
        reject("too young"); // reject with error message
      } else {
        resolve();
      }
    });
  };
}
```

::: title form 配置 async-validator 的使用
:::

```javascript
{
    key : rule // key为表单子项需要校验的对应key名称， rule为校验规则，格式为{}
}
// 例如 表单绑定值为 {email : 'xxx', username: 'xxxxx'}
// 需要校验邮箱,而邮箱输入框在表单绑定的值中key为email，
// 需要校验用户名长度为8到16之间,而用户名输入框在表单绑定的值中key为username，
{
  email : {
    type :  'email'
  },
  username : {
    type :  'string',
    min : 8,
    max : 16
  }
}
```

::: title form-item 配置 async-validator 的使用
:::

```javascript
// 例如 表单绑定值为 {email : 'xxx', phone: 'xxxxx'}
// 需要校验邮箱,而邮箱输入框在表单绑定的值中key为email
{
  type: "email";
}
```

::: contributor form
:::

::: previousNext form
:::
