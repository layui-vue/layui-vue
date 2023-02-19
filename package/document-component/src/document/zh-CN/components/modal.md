::: anchor
:::

::: title 基本介绍
:::

::: describe 需要用户处理事务，又不希望跳转页面以致打断工作流程时，承载相应的操作。
:::

::: title 基本使用
:::

::: demo 通过 `lay-layer` 创建一个基础弹层, 使用 `v-model` 控制显示状态。

<template>
  <lay-button @click="changeVisible1">打开</lay-button>
  <lay-layer title="基础使用" v-model="visible1" :area="['500px','500px']">
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
        visible1,
        changeVisible1
    };
  }
};
</script>

:::

::: title 禁止拖拽
:::

::: demo 通过 `move` 属性设置弹层是否可拖动, 默认为 `true`。

<template>
  <lay-button @click="changeVisible2">打开</lay-button>
  <lay-layer title="标题" :move="false" v-model="visible2">
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
        visible2,
        changeVisible2
    };
  }
};
</script>

:::

::: title 放大缩小
:::

::: demo 通过 `maxmin` 属性开启放大缩小操作, 默认为 `false`。

<template>
  <lay-button @click="changeVisible3">打开</lay-button>
  <lay-layer title="标题" v-model="visible3" :maxmin="true">
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
        visible3,
        changeVisible3
    };
  }
};
</script>

:::

::: title 指定位置
:::

::: demo 通过 `offset` 属性设置初始显示位置, 支持 `string` 与 `array` 类型。

<template>
  <lay-button @click="changeVisible4">打开</lay-button>
  <lay-layer title="标题" v-model="visible4" move="true" :offset="['100px','100px']">
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
        visible4,
        changeVisible4
    };
  }
};
</script>

:::

::: title 尺寸拉伸
:::

::: demo 通过 `resize` 属性开启窗体拉伸, 默认为 `false`。

<template>
  <lay-button @click="changeVisible8" type="primary">尺寸拉伸</lay-button>
  <lay-layer title="拉伸尺寸" :resize="true" v-model="visible8">
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
        visible8,
        changeVisible8
    };
  }
};
</script>

:::

::: title 远程窗体
:::

::: demo 你可以使用 layer 展示其他网站页面, 只需要设置 `type` 属性为 2, `content` 属性设置为指定页面的链接。

<template>
  <lay-button @click="changeVisible5" type="primary">打开</lay-button>
  <lay-layer title="加载 Iframe 内容" :area="['500px','400px']" v-model="visible5" move="true" :type="2" content="http://www.pearadmin.com"></lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const visible5 = ref(false)
    const changeVisible5 = function() {
        visible5.value = !visible5.value
    }
    return {
        visible5,
        changeVisible5
    };
  }
};
</script>

:::

::: title 定义操作
:::

::: demo 通过 `btn` 属性定义弹层底部操作。

<template>
  <lay-button @click="changeVisible6">打开</lay-button>
  <lay-layer title="标题" v-model="visible6" :btn="btn6">
      内容  
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const visible6 = ref(false)
    const changeVisible6 = function() {
        visible6.value = !visible6.value
    }
    const btn6 = [
        {text:'确认', callback: ()=>{ alert("确认事件") }},
        {text:'取消', callback: ()=>{ alert("取消事件") }}
    ]
    return {
        btn6,
        visible6,
        changeVisible6
    };
  }
};
</script>

:::

::: title 关闭遮盖
:::

::: demo 通过 `shade` 属性设置开启遮盖层, `shadeClose` 属性用于指定在点击遮盖层时是否关闭对应窗体。

<template>
  <lay-button @click="changeVisible7" type="primary">开启遮盖</lay-button>
  <lay-layer title="开启遮盖" move="true" shade="true" shadeClose="true" v-model="visible7">
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
        visible7,
        changeVisible7
    };
  }
};
</script>

:::

::: title 关闭标题
:::

::: demo

<template>
  <lay-button @click="changeVisible9" type="primary">关闭标题</lay-button>
  <lay-layer title="false" move="true" shade="false" v-model="visible9">
    内容  
  </lay-layer>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const visible9 = ref(false)
    const changeVisible9 = function() {
        visible9.value = !visible9.value
    }
    return {
        visible9,
        changeVisible9
    };
  }
};
</script>

:::

::: title 函数调用
:::

::: demo 你可以通过 `lay-layer` 标签来创建弹, 亦可以通过 `layer.open` 方法来唤起一个弹出层。

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
      id = layer.open({title:"标题",content:"内容", shade: false, btn: [
        {text:"关闭", callback: function(layerId) {
          layer.close(layerId);
        }}
      ]})
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

::: contributor modal
:::  

::: previousNext modal
:::