::: anchor
:::

::: title 基本介绍
:::

::: describe 按钮用于开始一个即时操作。
:::

::: title 基础使用
:::

::: demo 使用 `lay-upload` 标签, 创建一个按钮上传单文件

<template>
  <lay-upload @done="getUploadFile"/>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const getUploadFile = (file)=>{
      console.log(file);
    };
    return {
      getUploadFile
    }
  }
}
</script>

:::

::: title 多文件上传
:::

::: demo 使用 `lay-upload` 标签, 并使用 `multiple` 创建一个可上传多个文件的上传组件

<template>
  <lay-upload :multiple="true"></lay-upload>
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

::: title 拖拽上传
:::

::: demo 使用 `lay-upload` 标签, 使用 `drag属性` 创建一个可拖拽的上传文件域

<template>
  <lay-upload :drag="true"></lay-upload>
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

::: title 自定义预览
:::

::: demo 使用 `lay-upload` 标签, 使用 `#preview` 自定义预览的UI交互

<template>
  <lay-upload @done="getUploadFile">
    <template #preview>
      <div class="easy-wrap">
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
        <img src="https://chixian.oss-cn-hangzhou.aliyuncs.com/20211023003617_0706a.jpg" style="width:62.9px;height:63.2px"/>
      </div>
    </template>
  </lay-upload>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const getUploadFile = (file)=>{
      console.log(file);
    };
    return {
      getUploadFile
    }
  }
}
</script>

:::

::: title Upload 属性
:::

::: table

| 属性        | 描述     | 类型    | 默认值    | 可选值                             |
| ----------- | -------- | ------- | --------- | ---------------------------------- |
| url        | 服务端上传接口，返回的数据规范请详见下文     | string  | --        | -- |
| data      | 请求上传接口的额外参数   | object | --   | --                  |
| headers      | 接口的请求头     | object | -- | --                   |
| acceptMime    | 文件选择框时的可选文件类型 | string | `images`   | `images` |
| field    | 设定文件域的字段名     | string | `file`   | -- |
| size | 设置文件最大可允许上传的大小，单位 KB。不支持ie8/9 | number  | `0(不限制)`  | -- |
| multiple | 是否允许多文件上传。设置 true即可开启。不支持ie8/9 | boolean  | false  | -- |
| number | 设置同时可上传的文件数量，一般配合 multiple 参数出现。 | number  | `0(不限制)`  | -- |
| drag | 是否接受拖拽的文件上传，设置 false 可禁用。不支持ie8/9 | boolean  | true  | -- |

:::

::: title Upload 插槽
:::

::: table

| 名称    | 描述     | 参数 |
| ------- | -------- | ---- |
| preview | 自定义预览效果 | --   |

:::

::: title Upload 事件
:::

::: table

| 名称    | 描述     | 参数 |
| ------- | -------- | ---- |
| choose | 打开系统选择文件窗体的回调 | --   |
| before | 上传事务开启前的回调 | --   |
| done | 上传事务结束的回调 | --   |
| error | 上传事务中出现错误的回调 | --   |

:::


::: comment
:::

::: previousNext button
