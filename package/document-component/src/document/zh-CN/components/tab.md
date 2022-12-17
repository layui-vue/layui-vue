::: anchor
:::

::: title 基本介绍
:::

::: describe 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
:::

::: title 基础使用
:::

::: demo 使用 `lay-tab` 与 `lay-tab-item` 标签, 创建选项卡。

<template>
  <lay-tab v-model="current1">
    <lay-tab-item title="选项一" v-if="true" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current1 = ref("1")

    return {
      current1,
    }
  }
}
</script>

:::

::: title 设置图标
:::

::: demo 自定义标题内容。

<template>
  <lay-tab v-model="current11" :allow-close="true">
    <lay-tab-item id="1" title="选项一">
      <div style="padding:20px">选项一</div>
    </lay-tab-item>
    <lay-tab-item id="2" title="选项二" icon="layui-icon-console">
      <div style="padding:20px">选项二</div>
    </lay-tab-item>
    <lay-tab-item id="3" title="选项三" :icon="renderIconFunc">
      <div style="padding:20px">选项三</div>
    </lay-tab-item>
    <lay-tab-item id="4">
      <template #title>
        选项四
        <lay-icon type="layui-icon-set" style="margin-left:8px"></lay-icon>
      </template>
      <div style="padding:20px">选项四</div>
    </lay-tab-item>
    <lay-tab-item id="5" :title="renderTitleFunc">
      <div style="padding:20px">选项五</div>
    </lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref,h , Fragment,resolveComponent} from 'vue'

export default {
  setup() {
    const LayIcon = resolveComponent("LayIcon");

    const current11 = ref("1")

    const renderIconFunc = () => h("span", {
      style: "margin-right: 8px;"
    },"🚧");

    const renderTitleFunc = () => [
      h(LayIcon, 
      {
        type: "layui-icon-component",
        style: "margin-right: 8px;",
      }),
      h("span", 
      {
        style: "color: red",
      },
      "选项五"),
    ]

    return {
      current11,
      renderTitleFunc,
      renderIconFunc,
    }
  }
}
</script>

:::

::: title 简约模式
:::

::: demo

<template>
  <lay-tab type="brief" v-model="current2">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current2 = ref("1")

    return {
      current2
    }
  }
}
</script>

:::

::: title 卡片模式
:::

::: demo

<template>
  <lay-tab type="card" v-model="current3">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current3 = ref("1")

    return {
      current3
    }
  }
}
</script>

:::

::: title 允许关闭
:::

::: demo

<template>
  <lay-tab type="card" v-model="current4" :allow-close="allowClose" @change="change" @close="close">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
    <lay-tab-item title="选项三" id="3"><div style="padding:20px">选项三</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current4 = ref("1")
    const allowClose = ref(true)

    const change = function(id){
      console.log("当前值:" +id)
    }

    const close = function(id){
      console.log("当前关闭:" + id)
    }

    return {
      current4,
      allowClose,
      change,
      close
    }
  }
}
</script>

:::

::: title 关闭前置
:::

::: demo

<template>
  <lay-tab type="card" v-model="current5" allow-close @change="change5" @close="close5" :beforeClose="beforeClose">
    <lay-tab-item title="选项一" id="1" closable="true"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2" closable="false"><div style="padding:20px">选项二</div></lay-tab-item>
    <lay-tab-item title="选项三" id="3"><div style="padding:20px">选项三</div></lay-tab-item>
    <lay-tab-item title="选项四" id="4"><div style="padding:20px">选项四</div></lay-tab-item>
    <lay-tab-item title="选项五" id="5"><div style="padding:20px">选项五</div></lay-tab-item>
  </lay-tab>
  <div style="color:#ff5722;">id为单数的可以关闭</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current5 = ref("1")

    const change5 = function(id){
      console.log("当前值:" +id)
    }

    const beforeClose = function(id){
      return parseInt(id) % 2 === 1;
    }

    const close5 = function(id){
      console.log("当前关闭:" + id)
    }

    return {
      current5,
      change5,
      beforeClose,
      close5
    }
  }
}
</script>

:::

::: title 嵌套循环
:::

::: demo

<template>
  <lay-tab type="card" allow-close v-model="current6" @change="change6">
    <lay-tab-item v-for="a in arr" :key="a" :title="a.title" :id="a.id" :closable="a.closable">
      内容{{a.id}}
    </lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current6 = ref('1')
    const change6 = function(id){
      alert(id)
    }

    const arr = ref([
      {id:'1', title:'选项一', closable: false},
      {id:'2', title:'选项二'},
      {id:'3', title:'选项三'}
    ])

    return {
      current6,
      arr
    }
  }
}
</script>

:::

::: title 动态添加
:::

::: demo

<template>
  <lay-button @click="addTab">添加</lay-button>
  <lay-tab type="card" allow-close v-model="current8">
    <lay-tab-item v-for="a in arr2" :key="a" :title="a.title" :id="a.id" :closable="a.closable">
      内容{{a.id}}
    </lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    let index = 4;
    const current8 = ref('1')
    const arr2 = ref([
      {id:'1', title:'选项一', closable: false},
      {id:'2', title:'选项二'},
      {id:'3', title:'选项三'}
    ])
    const addTab = function(){
      index++;
      arr2.value.push({
        id: String(index), 
        title:'新选项卡' + index
      })
      current8.value = String(index);
    }

    return {
      arr2,
      addTab,
      current8
    }
  }
}
</script>

:::


::: title 位置设置
:::

::: demo

<template>
  <lay-button-group>
      <lay-button type="default" size="sm" @click = "tabPosition = 'left'">left</lay-button>
      <lay-button type="default" size="sm" @click = "tabPosition = 'right'">right</lay-button>
      <lay-button type="default" size="sm" @click = "tabPosition = 'top'">top</lay-button>
      <lay-button type="default" size="sm" @click = "tabPosition = 'bottom'">bottom</lay-button>
  </lay-button-group>
  <lay-button-group>
      <lay-button type="default" size="sm" @click = "tabType = ''">默认</lay-button>
      <lay-button type="default" size="sm" @click = "tabType = 'brief'">简约</lay-button>
      <lay-button type="default" size="sm" @click = "tabType = 'card'">卡片</lay-button>
  </lay-button-group>
  <lay-tab :type="tabType" v-model="current7" :tabPosition = "tabPosition">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
    <lay-tab-item title="选项三" id="3"><div style="padding:20px">选项三</div></lay-tab-item>
    <lay-tab-item title="选项四" id="4"><div style="padding:20px">选项四</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const current7 = ref("1");
    const tabPosition = ref("left");
    const tabType = ref("brief");

    return {
      current2,
      tabPosition,
      tabType
    }
  }
}
</script>

:::

::: title Tab 属性
:::

::: table

| 属性                | 描述                                               | 类型                                      | 默认值   | 可选值                        |
| ------------------- | -------------------------------------------------- | ----------------------------------------- | -------- | ----------------------------- |
| v-model             | 当前激活                                           | `string`                                  | -        | -                             |
| type                | 主题样式                                           | `string`                                  | -        | `brief` `card`                            |
| tabPosition         | 位置                                               | `string`                                  | `bottom` | `top` `bottom` `left` `right` |
| allow-close         | 允许关闭                                           | `boolean`                                 | `false`  | `true` `false`                |
| before-close        | 关闭之前的回调钩子函数,参数(`id`), `return false` 表示不进行关闭                  | `Function` | -        | -                             |
| before-leave        | 切换标签之前的回调钩子函数,  参数(`id`), `return false` 表示不进行关闭              | `Function` | -        | -                             |
| activeBarTransition | 是否开启 activeBar 动画,仅 brief 有效,默认 `false` | `boolean`                                 | `false`  | `true` `false`                |

:::

::: title Tab 事件
:::

::: table

| 事件   | 描述     | 参数 |
| ------ | -------- | ---- |
| change | 选中切换 | id   |
| close  | 关闭事件 | id   |

:::

::: title Tab Item 属性
:::

::: table

| 属性     | 描述                  | 类型             | 默认值  | 可选值         |
| -------- | --------------------- | ---------------- | ------- | -------------- |
| id       | 唯一标识              | `string`         | -       | -              |
| title    | 头部标题 | `string` `VNode` | -       | -              |
| icon     | 前置图标| `string` `VNode`
| closable | 允许关闭              | `boolean`        | `false` | `true` `false` |

:::

::: title Tab Item 插槽
:::

::: table

| 属性     | 描述     | 参数 |
| -------- | -------- | ------ |
| title    | 标题 | --     |

:::

::: contributor tab
::: 

::: previousNext tab
:::
