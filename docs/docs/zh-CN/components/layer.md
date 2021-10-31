::: title 基本使用
:::

::: demo

<template>
  <lay-button @click="changeVisible1" type="primary">简单使用</lay-button>
  <lay-layer title="身如不系之舟" v-model:visible="visible1">
    <div style="padding: 20px;">
        忘了是怎么开始, 也许就是对你
    </div>
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
  <lay-layer title="身如不系之舟" v-model:visible="visible2" move="true">
    <div style="padding: 20px;">
        忘了是怎么开始, 也许就是对你
    </div>
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
  <lay-layer title="平胸女子" v-model:visible="visible3" move="true" maxmin="true">
    <div style="padding: 20px;">
        她是照相只照半边的女子
    </div>
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
  <lay-layer title="亦是此间少年" v-model:visible="visible4" move="true" :offset="['100px','100px']">
    <div style="padding: 20px;">
        暗恋是一个人的事
    </div>
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
  <lay-layer title="亦是此间少年" width="500px" height="400px" v-model:visible="visible5" move="true" :type="type5" content="http://www.pearadmin.com"></lay-layer>
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
  <lay-layer title="亦是此间少年" v-model:visible="visible6" move="true" :btn="btn6">
    <div style="padding: 20px;">
        你喜欢我吗？
    </div>
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

::: title 弹层属性
:::

| 备注            | 描述          | 默认值  |
| --------------- | ------------- | ------- |
| title           | 标题          | --      |
| move            | 允许拖拽      | `false` |
| maxmin          | 最小化 最大化 | `false` |
| offset          | 位置          | --      |
| width           | 宽            | --      |
| height          | 高            | --      |
| v-model:visible | 展示 隐藏     | false   |
| content         | 内容          | --      |
