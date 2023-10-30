<!--
 * @Author: baobaobao
 * @Date: 2023-value-18 12:54:04
 * @LastEditTime: 2023-10-29 22:30:09
 * @LastEditors: baobaobao
-->
::: anchor
:::

::: title 基本介绍
:::

::: describe 它们本身细小而并不显眼，但掺杂在其它元素中就显得尤为突出了。页面往往因徽章的陪衬，而显得十分和谐。
:::

::: title 基础使用
:::

::: demo 使用 `lay-badge` 标签, 创建徽章

<template>
    <lay-space :size="40" > 
    <lay-badge :value="value">
      </lay-badge>
      <lay-badge  type="rim" :value="value">
        <lay-avatar></lay-avatar>
      </lay-badge>
      <lay-badge type="dot">
        <lay-avatar></lay-avatar>
      </lay-badge>
    </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(20)
    return {
    }
  }
}
</script>

:::


::: title 独立使用
:::

::: demo
<template>
    <lay-space :size="40"> 
      <lay-badge  :value="value20" :badgeStyle="{backgroundColor: '#52c41a'}" />
      <lay-badge type="dot" />
      <lay-badge type="dot" >
       <lay-icon type="layui-icon-face-smile"></lay-icon>
      </lay-badge>
      </lay-space>
</template>

<script>
  import { ref } from 'vue'

export default {
  setup() {
    const value20 = ref(10)
    return {
      value20
    }
  }
}
</script>
:::



::: title 方向
:::

::: demo
<template>
    <lay-space :size="40"> 
     <lay-badge :value="valuePos"> 
      <lay-avatar></lay-avatar>
      </lay-badge>
      <lay-badge position="bottom-right" :value="valuePos"> 
      <lay-avatar></lay-avatar>
      </lay-badge>
        <lay-badge position="bottom-left" :value="valuePos"> 
      <lay-avatar></lay-avatar>
      </lay-badge>
        <lay-badge position="top-left" :value="valuePos"> 
      <lay-avatar></lay-avatar>
      </lay-badge>
      </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const valuePos = ref(10)
    return {
      valuePos
    }
  }
}
</script>
:::

::: title 主题
:::

::: demo
<template>
    <lay-space :size="20"> 
    <lay-badge type="dot" theme="orange"></lay-badge>
    <lay-badge type="dot" theme="green"></lay-badge>
    <lay-badge type="dot" theme="cyan"></lay-badge>
    <lay-badge type="dot" theme="blue"></lay-badge>
    <lay-badge type="dot" theme="black"></lay-badge>
    <lay-badge type="dot" theme="gray"></lay-badge>
    </lay-space>
    <br>
    <lay-space :size="40"  style="margin-top: 50px"> 
    <lay-badge theme="orange" :value="value30">
     <lay-avatar>橙</lay-avatar>
    </lay-badge>
    <lay-badge  theme="green" :value="value30">
     <lay-avatar>绿</lay-avatar>
    </lay-badge>
    <lay-badge theme="cyan" :value="value30">
     <lay-avatar>青</lay-avatar>
    </lay-badge>
    <lay-badge theme="blue" :value="value30">
     <lay-avatar>蓝</lay-avatar>
    </lay-badge>
    <lay-badge theme="black" :value="value30">
     <lay-avatar>黑</lay-avatar>
    </lay-badge>
    <lay-badge theme="gray" :value="value30">
     <lay-avatar>灰</lay-avatar>
    </lay-badge>
</lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value30 = ref(30)
    return {
      value30
    }
  }
}
</script>
:::


::: title 是否显示0
:::

::: demo
<template>
    <lay-space :size="40"> 
      <lay-badge  :value="value0"  show-zero>
       <lay-avatar></lay-avatar>
      </lay-badge>
      <lay-badge  :value="value0" >
       <lay-avatar></lay-avatar>
      </lay-badge>
        <lay-input-number v-model="value0" ></lay-input-number>
      </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value0 = ref(0)
    return {
      value0
    }
  }
}
</script>
:::


::: title 自定义使用
:::

::: demo
<template>
    <lay-space :size="40"> 
      <lay-badge value="new"> 
        <lay-avatar></lay-avatar>
      </lay-badge>
      <lay-badge value="hot"> 
        <lay-avatar></lay-avatar>
      </lay-badge>
      <lay-badge> 
        <lay-avatar></lay-avatar>
        <template #custom>
          <lay-icon size="12px" type="layui-icon-face-smile"></lay-icon>
        </template>
      </lay-badge>
      </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value40 = ref(10)
    return {
      value40
    }
  }
}
</script>
:::



::: title max
:::

::: demo
<template>
    <lay-space :size="40"> 
      <lay-badge  :value="value50"> 
        <lay-avatar></lay-avatar>
      </lay-badge>
       <lay-badge  :max="20" :value="value60"> 
        <lay-avatar></lay-avatar>
      </lay-badge>
      </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value50 = ref(100)
    const value60 = ref(100)
    return {
      value50,
      value60
    }
  }
}
</script>
:::

::: title 动画
:::

::: demo 使用 `ripple` 属性, 添加水波纹动画
<template>
  <lay-space :size="20">
    <lay-badge type="dot" ripple></lay-badge>
    <lay-badge type="dot" theme="orange" ripple></lay-badge>
    <lay-badge type="dot" theme="green" ripple></lay-badge>
    <lay-badge type="dot" theme="cyan" ripple></lay-badge>
    <lay-badge type="dot" theme="blue" ripple></lay-badge>
    <lay-badge type="dot" theme="black" ripple></lay-badge>
      <lay-badge type="dot" color="green"  ripple></lay-badge>
    </lay-space>
    <br>
    <lay-space  :size="20" style="margin-top: 50px">
    <lay-badge value="new" ripple> 
        <lay-avatar></lay-avatar>
      </lay-badge>
    </lay-space>
</template>

<script>
</script>
:::


::: title Badge 属性
:::

::: table

| 属性  | 描述      | 可选值                                        |   默认值 |
| ----- | -------- | --------------------------------------------- | ------  |
| value  | 数量显示值       | -                               |  `0`  |
| type  | 类型      | `dot` `rim`                                   |  `rim`  |
| theme | 主题      | `orange` `green` `cyan` `blue` `black` `gray` |   -  |
| position | 位置      | `top-righ` `top-left` `bottom-right` `ottom-left`  |   `top-right`  |
| color | 颜色      |                      -                     | - |
| showZero | value为0是否显示      |       `true`   `false`     |     `false`  |
| badgeStyle | badge样式       |       -     |    -  |
| max | 最大显示数量      |       -     |     `99`  |
| ripple| 波纹      | `true` `false`                                |     |

:::

::: title Badge 插槽
:::

::: table

|  插槽  | 描述  |  备注                                              |
| ----- | ---- | --------------------------------------------- |
| default  | 默认 |  -                                  |
| custom  | 默认 |  自定义标志数量                                |


:::

::: previousNext badge
:::