::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-form :model="model">
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="model.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" prop="hobby">
      <lay-select v-model="model.hobby">
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="特长" prop="specialty">
      <lay-radio v-model="model.specialty" name="specialty" value="1">写作</lay-radio>
      <lay-radio v-model="model.specialty" name="specialty" value="2">画画</lay-radio>
      <lay-radio v-model="model.specialty" name="specialty" value="3">编码</lay-radio>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model.desc"></lay-textarea>
    </lay-form-item>
    <lay-form-item label="时间" prop="datetime" required>
      <lay-date-picker v-model="model.datetime" range type="datetime"></lay-date-picker>
    </lay-form-item>
    <lay-form-item>
      <lay-button @click="submitClick">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const model = reactive({
        username: "admin",
        password: "123456",
        specialty: "1"
    })

    const submitClick = function(){
      layer.open({
        type: 1,
        title:"表单结果", 
        content: `<div style="padding: 10px">${JSON.stringify(model)}</div>`, 
        shade: false,
        isHtmlFragment: true,
        btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
        area : '500px'
      });
    };

    return {
      model,
      submitClick
    }
  }
}
</script>

:::

::: title 对齐方式
:::

::: demo 通过设置 label-position 属性可以改变表单域标签的位置，可选值为 top、left， 当设为 top 时标签会置于表单域的顶部

<template>
  <lay-form :model="model">
    <lay-form-item label="账户" :label-position="labelPosition" prop="username">
      <lay-input v-model="model.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" :label-position="labelPosition" prop="password">
      <lay-input v-model="model.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" :label-position="labelPosition" prop="hobby">
      <lay-select v-model="model.hobby">
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="特长" :label-position="labelPosition" prop="specialty">
      <lay-radio v-model="labelPosition" name="labelPosition" value="left">左</lay-radio>
      <lay-radio v-model="labelPosition" name="labelPosition" value="top">上</lay-radio>
      <lay-radio v-model="labelPosition" name="labelPosition" value="right">右</lay-radio>
    </lay-form-item>
    <lay-form-item label="描述" :label-position="labelPosition" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model.desc"></lay-textarea>
    </lay-form-item>
    <lay-form-item>
      <lay-button @click="submitClick">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const model = reactive({
        username: "admin",
        password: "123456",
        specialty: "1"
    })
    
    const labelPosition = ref('right');

    const submitClick = function(){
      layer.open({
        type: 1,
        title:"表单结果", 
        content: `<div style="padding: 10px">${JSON.stringify(model)}</div>`, 
        shade: false,
        isHtmlFragment: true,
        btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
        area : '500px'
      });
    };

    return {
      model,
      submitClick,
      labelPosition
    }
  }
}
</script>

:::

::: title 表单验证
:::

::: demo

<template>
{{ validateModel }}
  <lay-form :model="validateModel" ref="layFormRef" required>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="validateModel.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" v-if="validateModel.hobbys == '1'" prop="password">
      <lay-input v-model="validateModel.password" type="password">></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" prop="hobby">
      <lay-select v-model="validateModel.hobbys">
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
    <lay-form-item label="文件" prop="file">
      <lay-upload v-model="validateModel.file" acceptMime="image/*" :auto="false"/>
    </lay-form-item>
    <lay-form-item>
      <lay-button @click="validate3">提交</lay-button>
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
        hobbys: "",
        file: null,
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
  <lay-form :model="ruleDemo1" ref="layFormRef1" :rules="rules" required initValidate>
    <lay-form-item prop="email" requiredMessage="你得输入邮箱">
      <lay-input v-model="ruleDemo1.email"></lay-input>
    </lay-form-item>
    <lay-form-item label="url路径" prop="url">
      <lay-input v-model="ruleDemo1.url"></lay-input>
    </lay-form-item>
    <lay-form-item label="日期" prop="date">
      <lay-input v-model="ruleDemo1.date"></lay-input>
    </lay-form-item>
    <lay-form-item label="用户名" prop="username">
      <lay-input v-model="ruleDemo1.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="年龄" prop="age">
      <lay-input v-model="ruleDemo1.age"></lay-input>
    </lay-form-item>
    <lay-form-item>
      <lay-button @click="validate1">提交</lay-button>
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

::: title 校验规则 - 通过表单子项配置
:::

::: demo

<template>
  <lay-form :model="ruleDemo2" ref="layFormRef2" required initValidate>
    <lay-form-item label="邮箱" prop="email" :rules="{type : 'email'}">
      <lay-input v-model="ruleDemo2.email"></lay-input>
    </lay-form-item>
    <lay-form-item label="url路径" prop="url" :rules="{type : 'url'}">
      <lay-input v-model="ruleDemo2.url"></lay-input>
    </lay-form-item>
    <lay-form-item label="日期" prop="date" :rules="{type : 'date'}">
      <lay-input v-model="ruleDemo2.date"></lay-input>
    </lay-form-item>
    <lay-form-item label="用户名" prop="username" 
      :rules="{
        type :  'string',
        min : 8,
        max : 16
      }">
      <lay-input v-model="ruleDemo2.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="年龄" prop="age" :rules="ageRules">
      <lay-input v-model="ruleDemo2.age"></lay-input>
    </lay-form-item>
    <lay-form-item label="自定义提示" prop="myEmail" 
    :rules="{
      type : 'email',
      message : '必须为邮箱'
    }">
      <lay-input v-model="ruleDemo2.myEmail"></lay-input>
    </lay-form-item>
    <lay-form-item>
      <lay-button @click="validate2">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const ruleDemo2 = reactive({
        email: "",
        url: "",
        date: "",
        username: "",
        age: null,
        myEmail: "",
    });

    const ageRules = {
      validator(rule, value, callback, source, options){
        if (value < 18) {
          callback(new Error(`${rule.field}太过于年轻`));
          return false;
        }
        return true;
      }
    };

    const layFormRef2 = ref(null);
    // 校验
    const validate2 = function() {
      layFormRef2.value.validate((isValidate, model, errors) => {
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
      ruleDemo2,
      layFormRef2,
      validate2,
      ageRules
    }
  }
}
</script>

:::

::: title 原生submit方式校验 -- 校验通过将提交表单 -- 不推荐使用
:::

::: demo

<template>
  <lay-form @submit="submit" :model="submitModel" requiredIcons="layui-icon-heart-fill" :use-CN="false" required>
    <lay-form-item label="账户" prop="username">
    <template #label>
      <i class="layui-icon layui-icon-username"></i>
      账户
    </template>
      <lay-input v-model="submitModel.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="submitModel.password"></lay-input>
    </lay-form-item>
    <lay-form-item>
      <lay-button native-type="submit">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

export default {
  setup() {

    const submitModel = reactive({
        username: "",
        password: ""
    })

    const submit = function(isValidate, model, errors) {
      layer.open({
        type: 1,
        title:"表单提交结果", 
        content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : </br>${JSON.stringify(errors)}</p></div>`, 
        shade: false,
        isHtmlFragment: true,
        btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
        area : '500px'
      })
    }

    return {
      submitModel
    }
  }
}
</script>

:::

::: title 表单(form)属性
:::

::: table

| 属性          | 描述                                                            |   类型    |     可选值     | 默认值   |
| ------------- | -------------------------------------------------------------- | --------- | -------------- | ------- |
| v-model       | 表单绑定值                                                      | `object`  |        -       |    {}   |
| required      | 是否必填                                                        | `boolean` | `true` `false` | `false` |
| rules         | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator)  | `object`  |       -        |     -   |
| initValidate  | 是否一开始就校验表单                                             | `boolean` | `true` `false` | `false` |
| useCN         | 是否使用中文错误提示                                             | `boolean` | `true` `false` | `false` |
| requiredIcons | 必填前缀图标`class`                                             | `string`  |         -      | `*` |
| required-erroer-message | 必填错误提示信息                                    | `string`  |         -     | `%s不能为空`|
| validate-message | 自定义校验错误提示信息; <br>由于内置了中文错误提示，可按需求增量增加<br>可查看 [async-validator 内置错误提示](https://github.com/yiminghe/async-validator/blob/master/src/messages.ts)<br>也可参考 [layui-vue 内置中文错误提示](https://gitee.com/layui/layui-vue/blob/next/package/component/src/component/formItem/cnValidateMessage.ts)   | `string`  |         -     | `%s不能为空`|

:::

::: title 表单(form)事件
:::

::: table

|       属性     | 描述                            |     回调参数   |
| ------------- | ------------------------------- | -------------- |
| submit        | 提交事件`(不推荐使用)`              | (`isValidate`, `model`, `errors`)<br><br> `isValidate`: (`boolean`)是否校验通过<br><br> `model`: (`object`)表单绑定的值<br><br> `errors`: (`Array`)校验结果的错误信息 |


:::

::: title 表单(form)方法
:::

::: table

|       属性     | 描述           |     入参       |
| ------------- | -------------- | -------------- |
| validate      | 表单校验; <br>如果没有`callback`回调，会返回`Promise`,  <br> `Promise`参数为{`isValidate`, `model`, `errors`}<br> 参数具体描述请看上面表单`submit`提交事件   | (`fields` `[可选]`, `callback` `[可选]`)<br><br> `fields`: (`string` / `string[]` / `function`)<br>单独校验的字段，<br>该字段如果为`function`, <br>则认为`callback`入参，校验全部字段;<br><br> `callback`: (`function`)校验之后的回调，<br>回调参数为(`isValidate`, `model`, `errors`)；<br>参数具体描述请看上面表单`submit`提交事件|
| clearValidate  | 清除表单校验  | (`fields`[可选])<br><br> `fields`: (`string` / `string[]`)<br>需要进行清除校验的表单字段, 如果该字段为空则清除全部校验|
| reset          | 重置表单所有值 |  -  |


:::

::: title 表单项(form-item)属性
:::

::: table

| 属性          | 描述                                                            |   类型    |     可选值     | 默认值   |
| ------------- | -------------------------------------------------------------- | --------- | -------------- | ------- |
| prop          | 在表单绑定值(`model`)中字段`key`                                 | `string`  |        -       |    -    |
| label         | 子项前边描述值，**尽量填写**，中文校验错误需要用到                 | `string`  |        -       |    -    |
| label-position| 子项前边描述值的位置                                              | `string`  | `left` `top` `right` |`right` |
| label-width   | 子项前边描述值的宽度                                              | `string` `number` | - | `95` |
| required      | 表单必填                                                        | `boolean` | `true` `false` | `false` |
| required-error-message | 表单必填校验失败固定提示语                                        | `string`  | -- | -- |
| rules         | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator)  | `object` | - | - |
| error-message | 表单校验失败固定提示语                                           | `string`  | -- | -- |
| mode          | 表单项显示的模式，`块元素` / `行元素`                             | `string`  |`block` `inline`| `block` |

:::

::: title 表单项(form-item)方法
:::

::: table

|       属性     | 描述           |     入参       |
| ------------- | -------------- | -------------- |
| validate      | 表单校验; | (`callback` `[可选]`)<br><br> `callback`: (`function`)校验之后的回调，<br>回调参数为(`errors`, `fields`)；<br><br> `errors`: (`Array`)校验结果的错误信息；<br><br> `fields`: (`Array`)当前校验的字段信息|
| clearValidate  | 清除表单校验   |      -         |


:::

::: title 表单项(form-item)插槽
:::

::: table

|       属性    |                                    描述                           |                  可使用参数             |
| ------------- | ---------------------------------------------------------------- | --------------------------------------- |
|       -       | 默认插槽                                                          | 传递进来的`props`和表单绑定的值(`model`)  |
|     label     | 子项前边描述插槽<br>如果使用此插槽，`props`**尽量**也传递`label`参数 | 传递进来的`props`和表单绑定的值(`model`)  |
|    required   | 必填前缀插槽                                                      | `*` / `表单props` 中的 `requiredIcons`   |

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
|       属性   |         描述       |        使用方式     |
| -------------| ----------------- | ------------------- |
|     number   | 数字              | `{type : 'number'}`  |
|     boolean  | 布尔类型          | `{type : 'boolean'}` |
|     method   | 方法              | `{type : 'method'}`  |
|     regexp   | 正则表达式        | `{type : 'regexp'}`  |
|     integer  | 整型数字          | `{type : 'integer'}` |
|     float    | 浮点小数          | `{type : 'float'}` |
|     array    | 数组              | `{type : 'array'}` |
|     object   | 对象              | `{type : 'object'}` |
|     enum     | 枚举              | `{type : 'enum'}` |
|     date     | 日期              | `{type : 'date'}` |
|     url      | url               | `{type : 'url'}` |
|     hex      | 十六进制          | `{type : 'hex'}` |
|     email    | 邮箱              | `{type : 'email'}` |
:::  

::: title async-validator 中 validator参数使用
:::

```javascript
{
  validator: (rule, value) => value === 'root'
}
```

::: title async-validator 中 asyncValidator参数使用
:::

```javascript
{
  asyncValidator: (rule, value) => {
    return new Promise((resolve, reject) => {
      if (value < 18) {
        reject('too young');  // reject with error message
      } else {
        resolve();
      }
    });
  }
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
  type :  'email'
}
```

::: contributor form
::: 

::: previousNext form
:::