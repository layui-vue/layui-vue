::: anchor
:::

::: title 基本介绍
:::

::: describe 折叠面板则能有效地节省页面的可视面积。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-collapse v-model="openKeys">
    <lay-collapse-item title="标题" id="1"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="2"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="3"> 内容 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys = ref(["1","2","3"])

    return {
      openKeys
    }
  }
}
</script>

:::

::: title 手风琴效果
:::

::: demo

<template>
  <lay-collapse v-model="openKeys2" accordion>
    <lay-collapse-item title="标题1" id="1"> 内容1 </lay-collapse-item>
    <lay-collapse-item title="标题2" id="2"> 内容2 </lay-collapse-item>
    <lay-collapse-item title="标题3" id="3"> 内容3 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys2 = ref("2")

    return {
      openKeys2
    }
  }
}
</script>

:::

::: title 禁用属性
:::

::: demo

<template>
  <lay-collapse v-model="openKeys3">
    <lay-collapse-item title="标题" id="1" disabled> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="2"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="3" disabled> 内容 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys3 = ref(["1","2"])

    return {
      openKeys3
    }
  }
}
</script>

:::

::: title 标题插槽
:::

::: demo

<template>
  <lay-collapse v-model="openKeys4">
    <lay-collapse-item title="标题" id="1"> 
      <template #title>自定义标题<i class="layui-icon layui-icon-heart-fill" style="color:red;"></i></template>
      内容
    </lay-collapse-item>
    <lay-collapse-item title="标题" id="2"> 
      <template v-slot:title="props">自定义标题{{props}}</template>
      内容
    </lay-collapse-item>
    <lay-collapse-item title="标题" id="3"> 内容 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys4 = ref(["1","2"])

    return {
      openKeys4
    }
  }
}
</script>

:::


::: title 关闭动画
:::

::: demo

<template>
  <lay-collapse v-model="openKeys5" :collapseTransition="collapseTransition">
    <lay-collapse-item title="标题1" id="1"> 内容1 </lay-collapse-item>
    <lay-collapse-item title="标题2" id="2"> 内容2 </lay-collapse-item>
    <lay-collapse-item title="标题3" id="3"> 内容3 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const collapseTransition = ref(false)
    const openKeys5 = ref("2")

    return {
      openKeys5,
      collapseTransition
    }
  }
}
</script>

:::

::: title 事件使用
:::

::: demo

<template>
  <lay-collapse v-model="emit1" @change="change">
    <lay-collapse-item title="标题1" :id="1"> 内容1 </lay-collapse-item>
    <lay-collapse-item title="标题2" :id="2"> 内容2 </lay-collapse-item>
    <lay-collapse-item title="标题3" id="haha"> 内容3 </lay-collapse-item>
  </lay-collapse>
  <div style="color:#ff5722;">F12 打开调试工具 -> console 控制面板进行查看事件输出</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const emit1 = ref([1, 2, "haha"])
    
    const change = function(id, isShow, activeValues){
      console.log("change", id, isShow, activeValues);
    }

    return {
      emit1
    }
  }
}
</script>

:::

::: title Collapse 属性
:::

::: table

| Name      | Description             | Accepted Values | Default Value   |
| --------- | ----------------------- | --------------- | --------------- | 
| openKeys  | 默认打开的折叠面板子项key | `string`/`array`| --              |
| accordion | 是否开启手风琴效果        | `boolean`       |  `false`        |
| collapse-transition  | 折叠动画       | `true` `false` |   `true` |
:::

::: title Collapse 事件
:::

::: table

| Name     | Description          | Callback Params  |
| -------- | -------------------- | ---------------- |
| change   | 折叠面板变化触发事件   | (`id`, `isShow`, activeValues)<br> <br> `id`: (`number` / `string`)对应当前操作面板的值 <br> <br> `isShow`: (`boolean`)`true` -> 展开, `false` -> 折叠 <br> <br> `activeValues`: (`Array`)当前状态为展开的面板值集合|

:::

::: title Collapse Item 属性
:::

::: table

| Name      | Description             | Accepted Values | Default Value   |
| --------- | ----------------------- | --------------- | --------------- | 
| id        | 编号                    | `string`        |      --         |
| title     | 标题                    | `string`        |      --         |
| disabled  | 是否禁用                | `boolean`       |  `false`        |

:::

::: title Collapse Item 插槽
:::

::: table

| Name      | Description             | Params |
| --------- | ----------------------- | --------------- | 
| --        | 默认插槽 --> 内容        | `{props}`        |
| title     | 标题插槽                 | `{props}`        |

:::

::: contributor collapse
:::

::: previousNext collapse
:::