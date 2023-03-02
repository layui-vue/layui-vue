::: anchor
:::

::: title Color 颜色
:::

::: describe 视觉疲劳的形成往往是由于颜色过于丰富或过于单一形成的麻木感。
:::

::: title 主色调
:::

::: demo layui 主要是以象征包容的墨绿作为主色调，由于它给人以深沉感，所以通常会以浅黑色的作为其陪衬，又会以蓝色这种比较鲜艳的色调来弥补它的色觉疲劳，整体让人清新自然，愈发耐看。【取色意义】：我们执着于务实，不盲目攀比，又始终不忘绽放活力。这正是 layui 所追求的价值。

<template>
    <ul class="layui-row layui-col-space15">
        <li class="layui-col-sm6">
            <div style="background-color: #009688;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#009688</p>
                <p tips="">主色调</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #5FB878;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#5FB878</p>
                <p tips="">次色调</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #1E9FFF;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#1E9FFF</p>
                <p tips="">经典蓝</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #393D49;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#393D49</p>
                <p tips="">导航色</p>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
</script>
:::

::: title 次色调
:::

::: demo 事实上，layui 并非不敢去尝试一些亮丽的颜色，但许多情况下一个它可能并不是那么合适，所以我们把这些颜色归为“场景色”，即按照实际场景来呈现对应的颜色，比如你想给人以警觉感，可以尝试用上面的红色。

<template>
<ul class="layui-row layui-col-space15">
      <li class="layui-col-sm6">
        <div style="background-color: #31BDEC;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#31BDEC</p>
          <p tips="">引导 - INFO</p>
        </div>
      </li>
      <li class="layui-col-sm6">
        <div style="background-color: #5FB878;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#5FB878</p>
          <p tips="">成功 - SUCCESS</p>
        </div>
      </li>
      <li class="layui-col-sm6">
        <div style="background-color: #FFB800;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#FFB800</p>
          <p tips="">警示 - WARNING</p>
        </div>
      </li>
      <li class="layui-col-sm6">
        <div style="background-color: #FF5722;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#FF5722</p>
          <p tips="">错误 - DANGER</p>
        </div>
      </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
</script>
:::

::: title 中性色
:::

::: demo layui 认为灰色系代表极简，因为这是一种神奇的颜色，几乎可以与任何元素搭配，不易形成视觉疲劳，且永远不会过时。低调而优雅！

<template>
    <ul class="layui-row site-doc-color site-doc-necolor">
      <li class="layui-col-md12">
        <div style="background-color: #FAFAFA;">
          <p>#FAFAFA</p>
        </div>
      </li>
      <li class="layui-col-md12">
        <div style="background-color: #f6f6f6;"><p>#F6F6F6</p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #eeeeee;"><p>#eeeeee</p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #e2e2e2;"><p>#e2e2e2</p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #dddddd;"><p>#dddddd</p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #d2d2d2;"><p>#d2d2d2</p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #cccccc;"><p>#cccccc</p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #c2c2c2;"><p>#c2c2c2</p></div>
      </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
</script>
:::

::: contributor color
:::

::: previousNext color
:::