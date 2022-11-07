::: anchor
:::

::: title 基本介绍
:::

::: describe 通过鼠标或键盘输入内容，是最基础的表单域的包装。
:::

::: title 基础使用
:::

::: demo 使用 `lay-input` 标签, 创建输入框。

<template>
  <lay-input v-model="data1" type="number" :max="300" :min="100"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data1 = ref(0);

    return {
      data1
    }
  }
}
</script>

:::

::: title 提示信息
:::

::: demo 通过 `placeholder` 属性, 设置输入框提示信息。

<template>
  <lay-input placeholder="提示信息"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::


::: title 前缀后缀
:::

::: demo 通过 `prefix` 与 `suffix` 插槽, 设置框内前置后置内容。

<template>
  <lay-input>
    <template #prefix>0</template>
    <template #suffix>0</template>
  </lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 拼接内容
:::

::: demo 通过 `prepend` 与 `append` 插槽, 设置框外前置后置内容。

<template>
  <lay-input v-model="inputValue">
    <template #prepend>http://</template>
  </lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const inputValue = ref("");

    return {
      inputValue
    }
  }
}
</script>

:::

::: title 输入密码
:::

::: demo 通过 `password` 属性, 启用显示密码明文操作。

<template>
  <lay-input v-model="inputValue1" type="password" password></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const inputValue1 = ref("");

    return {
      inputValue1
    }
  }
}
</script>

:::

::: title 设置图标
:::

::: demo 通过 `prefix-icon` 与 `suffix-icon` 属性, 设置前置后置图标。

<template>
  <lay-input prefix-icon="layui-icon-home" suffix-icon="layui-icon-home">
  </lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 允许清空
:::

::: demo 通过 `allow-clear` 属性, 开启清空操作。

<template>
  <lay-input :allow-clear="true" v-model="value1"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value1 = ref("内容")

    return {
      value1
    }
  }
}
</script>

:::

::: title 事件回调
:::

::: demo

<template>
  <lay-input v-model="data2" @input="input"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data2 = ref("Input 事件");
    const input = function( val ) {
        console.log("当前值:" + val)
    }

    return {
      data2,
      input
    }
  }
}
</script>

:::

::: title 禁止输入
:::

::: demo 通过 `disabled` 属性, 禁止输入。

<template>
  <lay-input placeholder="禁止输入" :disabled="disabled"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const disabled = ref(true)

    return {
        disabled
    }
  }
}
</script>

:::

::: title 限制长度
:::

::: demo 通过 `maxlength` 属性, 限制文本输入长度。

<template>
  <lay-input placeholder="限制内容长度" :maxlength="10"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
    }
  }
}
</script>

:::

::: title 尺寸Size
:::

::: demo 通过 `size` 属性, 设置输入框尺寸。

<template>
  <div>
      <lay-input size="lg" placeholder='lg'></lay-input>
      <lay-input size="md" placeholder='md' style='margin-top:10px'></lay-input>
      <lay-input size="sm" placeholder='sm' style='margin-top:10px'></lay-input>
      <lay-input size="xs" placeholder='xs' style='margin-top:10px'></lay-input>
    </div>
</template>

<script>
</script>

:::

::: title Input 属性
:::

::: table

| 属性                     | 描述                  | 类型         | 默认值         | 可选值         | 版本         |
| -----------------------  | -------------------- |-------------- |-------------- | -------------- |-------------- |
| name                     | 原始属性 name         | `string`             | --             | --             |--             |
| placeholder              | 提示信息              | `string`             | --             | --             |--             |
| disabled                 | 禁用                  | `boolean`           | `false`             | `true` `false` |--             |
| readonly                 | 原生属性 readonly     |  `boolean`             | `false`             |`true` `false` |--             |
| v-model / modelValue     | 值                    | `string` `number`   | --             |--             |--             |
| autofocus                | 原生属性 autofocus    |  `boolean`             | `false`             |`true` `false` |--             |
| autocomplete             | 原生属性 autocomplete |  `boolean`             | `false`             |`true` `false` |--             |
| allow-clear              | 允许清空 allow-clear  | `boolean`             | `false`             | `true` `false` |--             |
| prefix-icon              | 前置图标              | --             | --             | 内置 icon 集             |--             |
| suffix-icon              | 后置图标              | --             | --             | 内置 icon 集             |--             |
| password                 | 开启密码显示隐藏      |  `boolean`      | `false`             |`true` `false`  |--             |
| size                     | 尺寸                  | `string`             | `md`             | `lg` `md` `sm` `xs`|--             |
| maxlength                | 限制输入长度          |  `number`             | --             |--               |--             |
| max                      | 最大值          |  `number`             | --             |--               | `1.7.4`             |
| min                      | 最小值          |  `number`             | --             |--               | `1.7.4`           |
:::

::: title Input 事件
:::

::: table

| 事件  | 描述                | 参数                        |
| ----- | ------------------- | -------------------------- |
| input | 原生 input 事件     | (value : `string` `number`) |
| change| 原生 change 事件    | (value : `string` `number`) |
| focus | 原生 focus事件     | event : Event               |
| blur  | 原生 blur 事件      | event : Event               |
| clear | 清空 事件           | --                          |

:::

::: title Input 事件
:::

::: table

| 事件   | 描述                | 参数             |
| -----  | ------------------- | ----------------|
| prefix | 输入框前置内容     | --    |
| suffix | 输入框后置内容     | --    |
| prepend | 输入框前置内容 (更)     | --    |
| append | 输入框后置内容 (更)    | --    |

:::

::: contributor input
:::  

::: previousNext input
:::