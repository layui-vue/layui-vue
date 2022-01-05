::: anchor
:::

::: title 基础使用
:::


::: demo

<template>
<div>
    <lay-step :active="active">
        <lay-step-item></lay-step-item>
        <lay-step-item></lay-step-item>
        <lay-step-item></lay-step-item>
        <lay-step-item></lay-step-item>
    </lay-step>
<lay-button size="xs" @click="nexts">下一步</lay-button>
<lay-button size="xs" @click="previous">上一步</lay-button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const nexts = () => {
      if (active.value++ >=3) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 带标题带描述
:::


::: demo

<template>
<div>
    <lay-step :active="active">
        <lay-step-item title="First" content="First step"></lay-step-item>
        <lay-step-item title="Second" content="Second step"></lay-step-item>
        <lay-step-item title="Third" content="Third step"></lay-step-item>
        <lay-step-item title="Fourth" content="Fourth step"></lay-step-item>
    </lay-step>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const nexts = () => {
      if (active.value++ >=3) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 设置当前选中状态
:::


::: demo

<template>
<div>
    <lay-step :active="active" current-status="primary">
        <lay-step-item title="First" content="First step"></lay-step-item>
        <lay-step-item title="Second" content="Second step"></lay-step-item>
        <lay-step-item title="Third" content="Third step"></lay-step-item>
    </lay-step>
<lay-button size="xs" @click="next">下一步</lay-button>
<lay-button size="xs" @click="previous">上一步</lay-button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 设置第几步状态
:::

这里设置`status` 会覆盖掉`current-status`

::: demo

<template>
<div>
    <lay-step :active="active" current-status="warning">
        <lay-step-item title="First" content="First step"></lay-step-item>
        <lay-step-item status="fail" title="Second" content="Second step"></lay-step-item>
        <lay-step-item title="Third" content="Third step"></lay-step-item>
        <lay-step-item title="Fourth" content="Fourth step"></lay-step-item>
    </lay-step>
<lay-button size="xs" @click="nexts">下一步</lay-button>
<lay-button size="xs" @click="previous">上一步</lay-button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const nexts = () => {
      if (active.value++ >=3) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 自定义宽度
:::


::: demo

<template>
<div>
    <lay-step :active="active" space="200px">
        <lay-step-item title="First" content="First step"></lay-step-item>
        <lay-step-item title="Second" content="Second step"></lay-step-item>
        <lay-step-item title="Third" content="Third step"></lay-step-item>
    </lay-step>
<lay-button size="xs" @click="next">下一步</lay-button>
<lay-button size="xs" @click="previous">上一步</lay-button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 自定义图标
:::


::: demo

<template>
<div>
    <lay-step :active="active">
        <lay-step-item title="First" content="First step" icon="layui-icon-release"></lay-step-item>
        <lay-step-item title="Second" content="Second step" icon="layui-icon-tree"></lay-step-item>
        <lay-step-item title="Third" content="Third step" icon="layui-icon-share"></lay-step-item>
    </lay-step>
<lay-button size="xs" @click="next">下一步</lay-button>
<lay-button size="xs" @click="previous">上一步</lay-button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 居中
:::


::: demo

<template>
<div>
    <lay-step :active="active" center>
        <lay-step-item title="First" content="First step">
            <template #pace>
                <lay-icon type="layui-icon-ok"></lay-icon>
            </template>
        </lay-step-item>
        <lay-step-item title="Second" content="Second step"></lay-step-item>
        <lay-step-item title="Third" content="Third step"></lay-step-item>
    </lay-step>
<lay-button size="xs" @click="next">下一步</lay-button>
<lay-button size="xs" @click="previous">上一步</lay-button>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title 垂直
:::


::: demo

<template>
<div style="height: 300px">
    <lay-step :active="active" direction="vertical">
        <lay-step-item title="First" content="First step">
            <template #pace>
                <lay-icon type="layui-icon-ok"></lay-icon>
            </template>
        </lay-step-item>
        <lay-step-item title="Second" content="Second step"></lay-step-item>
        <lay-step-item title="Third" content="Third step"></lay-step-item>
    </lay-step>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const active = ref(-1);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
        loading,
        active
    }
  }
}
</script>

:::

::: title step步骤条属性
:::

::: table

| 属性  | 描述 | 类型 |可选值 | 默认值|
| ----- | ---- | ------ | ---| ---|
| active | 第几步 | number |-| 0 |
| center | 居中布局 | boolean | `true` `false` | `false`  |
| direction | 垂直/平行布局 | string |`horizontal` `vertical` | `horizontal` |
| space | 宽度 | string | -    | `auto` |
| currentStatus | 当前状态显示 | string | `primary` `success` `fail` `warning` | `primary` |

:::


::: title stepItem步骤条属性
:::

::: table

| 属性  | 描述 | 类型 |可选值 | 默认值|
| ----- | ---- | ------ | ---| ---|
| title| 标题 | string    | - | - |
| content | 内容描述 | string  | - | -|
| icon | 图标 | string  | - | -|
| status | 状态 | string  | `primary` `success` `fail` `warning` | `primary`|


:::

::: title stepItem步骤条slot
:::

::: table

| 属性  | 描述 | 
| ----- | ---- | 
| pace | 圆圈内容自定义 | 
| default | 内容区域自定义 |

:::

::: comment
:::