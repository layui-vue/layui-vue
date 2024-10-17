::: anchor
:::

::: title 基本介绍
:::

::: describe 内置 icon 图标选择组件, 常用于权限管理, 菜单定制。
:::

::: title 基础使用
:::

::: demo 使用 `lay-icon-picker` 标签, 创建图标选择器

<template>
  <lay-icon-picker v-model="icon"></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
      icon
    }
  }
}
</script>

:::

::: title 禁用选择
:::

::: demo 使用 `disabled` 属性, 禁用图标选择器

<template>
  <lay-icon-picker v-model="icon" disabled></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
      icon
    }
  }
}
</script>

:::

::: title 选择清空
:::

::: demo 可以传入 `allow-clear` 属性来开启选择清空功能

<template>
  <lay-icon-picker v-model="icon" :allow-clear="true"></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
      icon
    }
  }
}
</script>

:::

::: title 开启分页
:::

::: demo 通过 page 属性开启图标列表的分页展示

<template>
  <lay-icon-picker v-model="icon" page></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
      icon
    }
  }
}
</script>

:::

::: title 开启搜索
:::

::: demo 通过 `show-search` 开启图标列表的搜索功能

<template>
  <lay-icon-picker v-model="icon" page show-search></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
      icon
    }
  }
}
</script>

:::

::: title 自定义图标集
:::

::: demo 通过 `icon-sets` 属性传入注册自定义图标集，传入 `show-icon-sets` 可以展示图标集选择器，传入 `current-icon-set` 可以设置默认图标集（只有注册的图标集才可指定默认图标集）

<template>
  <lay-space direction="vertical">
    <lay-space>
      <lay-checkbox v-model="showIconSets">展示图标集</lay-checkbox>
      <lay-checkbox v-model="allowSearch">允许搜索</lay-checkbox>
      <lay-checkbox v-model="enablePage">开启分页</lay-checkbox>
      <lay-select v-model="currentIconSet">
        <lay-select-option value="layui">Layui</lay-select-option>
        <lay-select-option value="bs">Bootstrap Icons</lay-select-option>
      </lay-select>
    </lay-space>
    <lay-icon-picker
      v-model="icon10"
      type="layui-icon-face-smile"
      :icon-sets="iconSet"
      :show-search="allowSearch"
      :page="enablePage"
      :show-icon-sets="showIconSets"
      :current-icon-set="currentIconSet"
    ></lay-icon-picker>
  </lay-space>
</template>

<style>
@import url("https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
</style>

<script>
import { ref } from "vue";

export default {
  setup() {
    const showIconSets = ref(true);
    const icon10 = ref("bi-0-circle");
    const currentIconSet = ref("bs");
    const allowSearch = ref(true);
    const enablePage = ref(true);
    const iconSet = ref([
      "layui",
      {
        name: "bs",
        title: "Bootstrap Icons",
        prefix: "bi",
        icons: [
          {
            name: "圆圈 0",
            class: "bi-0-circle",
          },
          {
            name: "圆圈 1",
            class: "bi-1-circle",
          },
          {
            name: "圆圈 2",
            class: "bi-2-circle",
          },
          {
            name: "圆圈 3",
            class: "bi-3-circle",
          },
          {
            name: "圆圈 4",
            class: "bi-4-circle",
          },
          {
            name: "圆圈 5",
            class: "bi-5-circle",
          },
          {
            name: "圆圈 6",
            class: "bi-6-circle",
          },
          {
            name: "圆圈 7",
            class: "bi-7-circle",
          },
          {
            name: "圆圈 8",
            class: "bi-8-circle",
          },
          {
            name: "圆圈 9",
            class: "bi-9-circle",
          },
          {
            name: "苹果",
            class: "bi-apple",
          },
          {
            name: "安卓",
            class: "bi-android",
          },
          {
            name: "圆圈 0",
            class: "bi-0-circle-fill",
          },
          {
            name: "圆圈 1",
            class: "bi-1-circle-fill",
          },
          {
            name: "圆圈 2",
            class: "bi-2-circle-fill",
          },
          {
            name: "圆圈 3",
            class: "bi-3-circle-fill",
          },
          {
            name: "圆圈 4",
            class: "bi-4-circle-fill",
          },
          {
            name: "圆圈 5",
            class: "bi-5-circle-fill",
          },
          {
            name: "圆圈 6",
            class: "bi-6-circle-fill",
          },
          {
            name: "圆圈 7",
            class: "bi-7-circle-fill",
          },
          {
            name: "圆圈 8",
            class: "bi-8-circle-fill",
          },
          {
            name: "圆圈 9",
            class: "bi-9-circle-fill",
          },
        ],
      },
    ]);

    return {
      icon10,
      iconSet,
      showIconSets,
      currentIconSet,
      allowSearch,
      enablePage,
    };
  },
};
</script>

:::

::: quote 目前内置了 Layui 图标集
未指定 `iconSet` 时，默认使用 Layui 图标集
:::

::: title Property 属性
:::

::: table

| 属性             | 说明                                       | 类型                                        | 默认值                          | 可选值 | 版本     |
| ---------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------- | ------ | -------- |
| v-model          | 默认值                                     | --                                          | --                              | --     |          |
| page             | 开启分页                                   | `boolean`                                   | --                              | --     |          |
| size             | 尺寸                                       | `"lg"` `"md"` `"sm"` `"xs"`                 | --                              | --     |          |
| show-search      | 启用搜索                                   | `boolean`                                   | --                              | --     |          |
| disabled         | 禁用                                       | `boolean`                                   | --                              | --     |          |
| allow-clear      | 允许清空                                   | `boolean`                                   | --                              | --     |          |
| content-style    | 内容自定义样式                             | `StyleValue`                                | --                              | --     |          |
| content-class    | 内容自定义 Class                           | `string` `Array<string \| object>` `object` | --                              | --     |          |
| teleport-props   | 继承至 dropdown 组件，下拉面板 `传递` 属性 | `object`                                    | `{to: 'body', disabled: false}` | --     | `2.19.0` |
| icon-sets        | 图标集                                     | `Array<string \| IconSets>`                 | `["layui"]`                     | --     | `2.19.1` |
| show-icon-sets   | 显示图标集切换器                           | `boolean`                                   | `false`                         | --     | `2.19.1` |
| current-icon-set | 当前图标集                                 | `string`                                    | `"layui"`                       | --     | `2.19.1` |

:::

::: title Types
:::

```typescript
export interface IconProp {
  name: string;
  class: string;
  prefix?: string;
}

export interface IconSets {
  name: string;
  title?: string;
  prefix?: string;
  icons: IconProp[];
}
```

::: previousNext iconPicker
:::
