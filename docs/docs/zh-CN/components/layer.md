::: title 基本使用
:::

::: demo

<template>
  <lay-button @click="changeVisible1" type="primary">基础使用</lay-button>
  <lay-layer title="基础使用" v-model:visible="visible1">
    这是一个基础弹窗
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const visible1 = ref(false)

    const changeVisible1 = function() {
        visible1.value = !visible1.value
    }

    return {
        visible1
    };
  },
};
</script>

:::

::: title 允许拖动
:::

::: demo

<template>
  <lay-button @click="changeVisible2" type="primary">允许拖动</lay-button>
  <lay-layer title="允许拖动" v-model:visible="visible2" move="true">
    这是一个可以拖拽的弹窗
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const visible2 = ref(false)

    const changeVisible2 = function() {
        visible2.value = !visible2.value
    }

    return {
        visible2
    };
  },
};
</script>

:::

::: title 放大缩小
:::

::: demo

<template>
  <lay-button @click="changeVisible3" type="primary">放大缩小</lay-button>
  <lay-layer title="放大缩小" v-model:visible="visible3" move="true" maxmin="true">
        该弹窗支持放大缩小
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const visible3 = ref(false)

    const changeVisible3 = function() {
        visible3.value = !visible3.value
    }

    return {
        visible3
    };
  },
};
</script>

:::

::: title 指定位置
:::

::: demo

<template>
  <lay-button @click="changeVisible4" type="primary">指定位置</lay-button>
  <lay-layer title="指定位置" v-model:visible="visible4" move="true" :offset="['100px','100px']">
        指定弹窗显示的默认位置
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const visible4 = ref(false)

    const changeVisible4 = function() {
        visible4.value = !visible4.value
    }

    return {
        visible4
    };
  },
};
</script>

:::

::: title 远程窗体
:::

::: demo

<template>
  <lay-button @click="changeVisible5" type="primary">远程窗体</lay-button>
  <lay-layer title="加载 Iframe 内容" width="500px" height="400px" maxmin="true" v-model:visible="visible5" move="true" :type="type5" content="http://www.pearadmin.com"></lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const type5 = ref(2)
    const visible5 = ref(false)

    const changeVisible5 = function() {
        visible5.value = !visible5.value
    }

    return {
        type5,
        visible5
    };
  },
};
</script>

:::

::: title 定义操作
:::

::: demo

<template>
  <lay-button @click="changeVisible6" type="primary">定义操作</lay-button>
  <lay-layer title="定义操作" v-model:visible="visible6" move="true" :btn="btn6">
    定义一组弹窗操作按钮
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const visible6 = ref(false)
    const btn6 = [
        {text:'确认', callback: ()=>{ alert("确认事件") }},
        {text:'取消', callback: ()=>{ alert("取消事件") }}
    ]

    const changeVisible6 = function() {
        visible6.value = !visible6.value
    }

    return {
        btn6,
        visible6
    };
  },
};
</script>

:::

::: title 开启遮盖
:::

::: demo

<template>
  <lay-button @click="changeVisible7" type="primary">开启遮盖</lay-button>
  <lay-layer title="开启遮盖" move="true" shade="true" v-model:visible="visible7">
        允许点击遮盖层关闭弹窗
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {

    const visible7 = ref(false)

    const changeVisible7 = function() {
        visible7.value = !visible7.value
    }

    return {
        visible7
    };
  },
};
</script>

:::

::: title 弹层属性
:::

::: table

| 备注            | 描述          | 默认值                     |
| --------------- | ------------- | -------------------------- |
| title           | 标题          | --                         |
| move            | 允许拖拽      | `false`                    |
| maxmin          | 最小化 最大化 | `false`                    |
| offset          | 位置          | --                         |
| width           | 宽            | --                         |
| height          | 高            | --                         |
| v-model:visible | 展示 隐藏     | false                      |
| content         | 内容          | --                         |
| shade           | 开启遮盖      | --                         |
| shadeClose      | 遮盖点击关闭  | --                         |
| zIndex          | 自定义层级    | --                         |
| type            | 类型          | `1: component` `2: iframe` |
| closeBtn        | 显示关闭      | true                       |

:::
