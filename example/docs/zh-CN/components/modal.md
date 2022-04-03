::: anchor
:::

::: title 基本介绍
:::

::: describe 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
:::

::: title 基本使用
:::

::: demo

<template>
  <lay-button @click="changeVisible1" type="primary">基础使用</lay-button>
  <lay-layer title="基础使用" v-model="visible1">
      内容  
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
  }
};
</script>

:::

::: title 允许拖动
:::

::: demo

<template>
  <lay-button @click="changeVisible2" type="primary">允许拖动</lay-button>
  <lay-layer title="允许拖动" v-model="visible2">
      内容  
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
  }
};
</script>

:::

::: title 放大缩小
:::

::: demo

<template>
  <lay-button @click="changeVisible3" type="primary">放大缩小</lay-button>
  <lay-layer title="放大缩小" v-model="visible3" move="true" maxmin="true">
      内容  
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
  }
};
</script>

:::

::: title 指定位置
:::

::: demo

<template>
  <lay-button @click="changeVisible4" type="primary">指定位置</lay-button>
  <lay-layer title="指定位置" v-model="visible4" move="true" :offset="['100px','100px']">
      内容  
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
  }
};
</script>

:::

::: title 尺寸拉伸
:::

::: demo

<template>
  <lay-button @click="changeVisible8" type="primary">尺寸拉伸</lay-button>
  <lay-layer title="拉伸尺寸" resize="true" v-model="visible8" move="true">
      内容  
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const visible8 = ref(false)
    const changeVisible8 = function() {
        visible8.value = !visible8.value
    }
    return {
        visible8
    };
  }
};
</script>

:::

::: title 远程窗体
:::

::: demo

<template>
  <lay-button @click="changeVisible5" type="primary">远程窗体</lay-button>
  <lay-layer title="加载 Iframe 内容" :area="['500px','400px']" maxmin="true" v-model="visible5" move="true" :type="type5" content="http://www.pearadmin.com"></lay-layer>
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
  }
};
</script>

:::

::: title 定义操作
:::

::: demo

<template>
  <lay-button @click="changeVisible6" type="primary">定义操作</lay-button>
  <lay-layer title="定义操作" v-model="visible6" move="true" :btn="btn6">
      内容  
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
  }
};
</script>

:::

::: title 关闭遮盖
:::

::: demo

<template>
  <lay-button @click="changeVisible7" type="primary">开启遮盖</lay-button>
  <lay-layer title="开启遮盖" move="true" shade="false" v-model="visible7">
    内容  
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
  }
};
</script>

:::

::: title 函数调用
:::

::: demo

<template>
  <lay-button @click="open" type="primary">打开</lay-button>
  <lay-button @click="close" type="primary">关闭</lay-button>
  <lay-button @click="closeAll" type="primary">关闭所有</lay-button>
</template>

<script>
import { ref, watch } from "vue";
import { layer } from "@layui/layer-vue"
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    let id = null;
    const open = function() {
      id = layer.open({title:"标题",content:"内容", shade: false})
    }
    const close = function() {
      layer.close(id)
    }
    const closeAll = function() {
      layer.closeAll()
    }
    return {
        open,
        close,
        closeAll
    };
  }
};
</script>

:::

::: title 弹层属性
:::

::: table

| 备注            | 描述          | 默认值                     |
| --------------- | ------------- | --------------------------|
| title           | 标题          | --                         |
| move            | 允许拖拽      | `false`                    |
| maxmin          | 最小化 最大化 | `false`                    |
| offset          | 位置          | --                         |
| area            | 尺寸          | --                         |
| v-model         | 展示 隐藏     | false                      |
| content         | 内容          | --                         |
| shade           | 开启遮盖      | --                         |
| shadeClose      | 遮盖点击关闭  | --                         |
| shadeOpacity    | 遮盖层透明度  | `0.1`                         |
| zIndex          | 自定义层级    | --                         |
| type            | 类型          | `1: component` `2: iframe` |
| closeBtn        | 显示关闭      | true                       |
| btn             | 按钮 格式:{text:"",callback:function(){}} | --    |
| btnAlign        | 按钮布局      | `l` `r` `c`                |
| anim            | 入场动画      | `0` `-` `6`                |
| isOutAnim       | 关闭动画      | `true` `false`             |
| success            | 显示回调   | --                |
| close       | 关闭回调      | --             |

:::

 

::: previousNext modal
:::