::: anchor
:::

::: title 基本介绍
:::

::: describe 在实用价值的前提之下，我们并没有内置过多花俏的动画。
:::

::: title 基础使用
:::

::: demo 如上是不同的动画类名，点击上述绿色块，可直接预览动画。

<template>
  <div class="anim">
    <ul class="layui-border-box site-doc-icon site-doc-anim">
      <li style="height:auto">
        <div class="layui-anim layui-anim-down" @click="replay">顶部往下滑入</div>
        <div class="code">layui-anim-down</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-downbit" @click="replay">微微往下滑入</div>
        <div class="code">layui-anim-downbit</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-up" @click="replay">底部往上滑入</div>
        <div class="code">layui-anim-up</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-upbit" @click="replay">微微往上滑入</div>
        <div class="code">layui-anim-upbit</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scale" @click="replay">平滑放大</div>
        <div class="code">layui-anim-scale</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scaleSpring" @click="replay">弹簧式放大</div>
        <div class="code">layui-anim-scaleSpring</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scalesmall" @click="replay">平滑放小</div>
        <div class="code">layui-anim-scalesmall</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scalesmall-spring" @click="replay">弹簧式放小</div>
        <div class="code">layui-anim-scalesmall-spring</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-fadein" @click="replay">渐现</div>
        <div class="code">layui-anim-fadein</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim" @click="replay($event,'layui-anim-fadeout')">渐隐</div>
        <div class="code">layui-anim-fadeout</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-rotate" @click="replay">360度旋转</div>
        <div class="code">layui-anim-rotate</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-rotate layui-anim-loop" @click="replay">循环动画</div>
        <div class="code">追加：layui-anim-loop</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const replay = (e, animClass) => {
      const el = e.currentTarget;
      const targetClass = el.classList[1];
      if(!targetClass){
        el.classList.add(animClass);
      }else{
        el.classList.remove(targetClass);
        setTimeout(() => {
          el.classList.add(targetClass);
        },100) 
      }
    }
    return {
      replay
    }
  }
}
</script>

:::

::: title 动画类名
:::

::: table

| 类名                             | 描述         | 使用                                           |
| ---------------------------------| ------------ | ---------------------------------------------- |
| layui-anim-down                  | 顶部往下滑入 | `layui-anim layui-anim-down`                   |
| layui-anim-downbit               | 微微往下滑入 | `layui-anim layui-anim-downbit`                |
| layui-anim-up                    | 底部往上滑入 | `layui-anim layui-anim-up`                     |
| layui-anim-upbit                 | 微微往上滑入 | `layui-anim ayui-anim-upbit`                   |
| layui-anim-scale                 | 平滑放大     | `layui-anim layui-anim-scale`                  |
| layui-anim-scaleSpring           | 弹簧式放大   | `layui-anim layui-anim-scaleSpring`            |
| layui-anim-scalesmall            | 平滑放小     | `layui-anim layui-anim-scalesmall`             |
| layui-anim-scalesmall-spring     | 弹簧式放小   | `layui-anim layui-anim-scalesmall-spring`      |
| layui-anim-fadein                | 渐现         | `layui-anim layui-anim-fadein`                 |
| layui-anim-fadeout               | 渐隐         | `layui-anim layui-anim-fadeout`                |
| layui-anim-rotate                | 360 度旋转   | `layui-anim layui-anim-rotate`                 |
| layui-anim-rotate layui-anim-loop| 循环动画     | `layui-anim layui-anim-rotate layui-anim-loop` |

:::

::: contributor animation
:::

::: previousNext animation
:::