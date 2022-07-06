::: anchor
:::

::: title 基本介绍
:::

::: describe 预览图片。
:::

::: title 指定图标
:::

::: demo

<template>
   <lay-button @click="signleImg">图片查看</lay-button>
   <lay-button @click="signleImg2">图片标题</lay-button>
   <lay-button @click="groupImg">图片分组</lay-button>
</template>

<script>
import { layer } from  "@layui/layui-vue"

const signleImg = function() {
    layer.photos("http://www.pearadmin.com/assets/images/un1.svg")
}
const signleImg2 = function() {
    layer.photos({
      imgList:[{src:'http://www.pearadmin.com/assets/images/un2.svg',alt:'layer for vue'}]
    })
}
const groupImg = function() {
  layer.photos({
    imgList:[
      { src:'http://www.pearadmin.com/assets/images/un8.svg', alt:'图片1'},
      { src:'http://www.pearadmin.com/assets/images/un32.svg', alt:'图片2'}
    ]
  })
}
</script>

:::

::: title 组件方法
:::

```
layer.photos(options)
```

::: title 组件属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ----|
| options | 选配属性 | { time: 加载时长, icon: 图标 }   |

:::

::: contributor msg
:::  

::: previousNext msg
:::