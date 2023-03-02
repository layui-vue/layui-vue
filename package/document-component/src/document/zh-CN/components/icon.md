::: anchor
:::

::: title Icon 图标
:::

::: describe 图标全部采用字体形式，取材于阿里巴巴矢量图标库（iconfont）。
:::

::: title 基础使用
:::

::: demo 使用 `lay-icon` 标签创建一个字体图标。

<template>
  <lay-icon type="layui-icon-face-smile"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="#009688"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="#5FB878"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="#1E9FFF"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="#FFB800"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="#FF5722" size="24px"></lay-icon> &nbsp;
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

::: title 组件图标
:::

::: describe 使用 <code>AlignCenterIcon</code> <code>DiamondIcon</code> 等图标组件，需要安装 <code>@layui/icons-vue</code> 组件包。
:::

```
npm install @layui/icons-vue
```

::: describe 通过 <code>@layui/icons-vue</code> 引用 Icon 组件， 图标组件名为图标名加 Icon 作为后辍，例如：<code>layui-icon-heart</code> = <code>HeartIcon</code>。
:::

```vue
<template>
  <AlignCenterIcon></AlignCenterIcon>
  <DiamondIcon></DiamondIcon>
</template>

<script setup>
import { AlignCenterIcon, DiamondIcon } from '@layui/icons-vue';
</script>
```

::: title 图标列表（174个）
:::

::: demo

<template>
  <ul class="site-doc-icon">
    <li v-for="(layIcon, index) of LayIconList" @click="copy(layIcon.class)">
        <i :class="[`layui-icon ${layIcon.class}`]"></i>
        <div class="doc-icon-name">{{ layIcon.name }}</div>
        <div class="doc-icon-code">&amp;#x{{ iconsUnicode[index] }};</div>
        <div class="doc-icon-fontclass">{{ layIcon.class }}</div>
    </li>
  </ul>
</template>

<script setup>
  import { onMounted, nextTick, reactive } from 'vue'
  import { useClipboard, usePermission } from "@vueuse/core";
  import { layer } from '@layui/layer-vue';
  import { LayIconList } from '@layui/icons-vue';

  const iconsUnicode = reactive([]);

  function copy(iconClass) {
    const { isSupported, copy, copied } = useClipboard()
    const permissionWrite = usePermission('clipboard-write')
    if (isSupported && permissionWrite.value === 'granted') {
      copy(iconClass)
      copied.value = true
    } else {
      let inputEl = document.createElement('input')
      inputEl.value = iconClass
      document.body.appendChild(inputEl)
      inputEl.select() 
      document.execCommand('Copy') 
      inputEl.remove()
      copied.value = true
    }
    if (copied.value) {
      layer.msg(`复制成功 &nbsp<span style="color:#5FB878;" >${ iconClass }</span>`, 
        {
          icon: 1, 
          time: 1500, 
          offset:['15%','50%'], 
          isHtmlFragment: true 
        }, 
        () => { }
      )
    } else {
      layer.msg('复制失败', { icon: 2, time: 1500, }, () => { })
    }
  } 

  function getIconUnicode(iconClass){
    const iconEl = document.querySelector(`.site-doc-icon > li > .${iconClass}`);
    const iconBeforeContent = window?.getComputedStyle(iconEl)?.content;
    return iconBeforeContent;
  } 

  onMounted(() => {
    nextTick(() => {
      LayIconList?.forEach((icon) => {
        // unicode 10进制转16进制
        const unicode = getIconUnicode(icon.class).charCodeAt(1).toString(16); 
        iconsUnicode.push(unicode)
      });
    })    
  })
</script>

<style>
.site-doc-icon {
  margin-bottom: 10px;
  font-size: 0;
}
.site-doc-icon li .doc-icon-name,
.site-doc-icon li .doc-icon-code {
  color: #c2c2c2;
}
.site-doc-icon li .doc-icon-fontclass {
  height: 40px;
  line-height: 20px;
  padding: 0 5px;
  font-size: 13px;
  color: #333;
}
.site-doc-icon li {
  display: inline-block;
  vertical-align: middle;
  width: 16.5%;
  height: 105px;
  line-height: 25px;
  padding: 20px 0;
  margin-right: -1px;
  margin-bottom: -1px;
  border: 1px solid #e2e2e2;
  font-size: 14px;
  text-align: center;
  color: #666;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.site-doc-icon li:hover{
  background-color: #F6F6F6;
}
.site-doc-icon li:hover{
  background-color:red;
}
.site-doc-icon li .layui-icon {
  display: inline-block;
  font-size: 32px;
}
.anim .site-doc-icon {
  margin-bottom: 50px;
  font-size: 0;
}
.anim .site-doc-icon li {
  width: 50%;
}
.anim .site-doc-icon li {
  display: inline-block;
  vertical-align: middle;
  width: 16.5%;
  height: 105px;
  line-height: 25px;
  padding: 20px 0;
  margin-right: -1px;
  margin-bottom: -1px;
  border: 1px solid #e2e2e2;
  font-size: 14px;
  text-align: center;
  color: #666;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.anim .site-doc-icon li .layui-anim {
  width: 125px;
  height: 125px;
  line-height: 125px;
  margin: 0 auto 10px;
  text-align: center;
  background-color: var(--global-primary-color);
  cursor: pointer;
  color: #fff;
  border-radius: 50%;
}
.anim .site-doc-icon li .code {
  white-space: nowrap;
}
</style>
:::

::: title Icon 属性
:::

::: table

| 名称   | 描述 | 类型      | 默认值       | 可选值   |
| ------ | ---- | -------- | ------------ | ------  |
| type   | 图标 | `string` | -            | -       |
| prefix | 前缀 | `string` | `layui-icon` | -       |
| size   | 尺寸 | `string` | -            | -       |
| color  | 颜色 | `string` | -            | -       |

:::

::: contributor icon
::: 

::: previousNext icon
:::