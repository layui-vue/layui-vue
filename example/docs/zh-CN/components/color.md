::: anchor
:::

::: title 主色调
:::

::: demo layui 主要是以象征包容的墨绿作为主色调，由于它给人以深沉感，所以通常会以浅黑色的作为其陪衬，又会以蓝色这种比较鲜艳的色调来弥补它的色觉疲劳，整体让人清新自然，愈发耐看。【取色意义】：我们执着于务实，不盲目攀比，又始终不忘绽放活力。这正是 layui 所追求的价值。

<template>
    <ul class="layui-row layui-col-space15">
        <li class="layui-col-sm6">
            <div style="background-color: #009688;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#009688</p><p>
                </p><p tips="">主色调之一</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #5FB878;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#5FB878</p><p>
                </p><p tips="">一般用于选中状态</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #393D49;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#393D49</p><p>
                </p><p tips="">通常用于导航</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #1E9FFF;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#1E9FFF</p><p>
                </p><p tips="">经典蓝</p>
            </div>
        </li>
    </ul>
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

::: title 次色调
:::

::: demo 事实上，layui 并非不敢去尝试一些亮丽的颜色，但许多情况下一个它可能并不是那么合适，所以我们把这些颜色归为“场景色”，即按照实际场景来呈现对应的颜色，比如你想给人以警觉感，可以尝试用上面的红色。他们一般会出现在 layui 的按钮、提示和修饰性元素，以及一些侧边元素上。

<template>
<ul class="layui-row layui-col-space15">
      <li class="layui-col-sm6">
        <div style="background-color: #FFB800;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#FFB800</p><p>
          </p><p tips="">暖色系</p>
        </div>
      </li>
      <li class="layui-col-sm6">
        <div style="background-color: #FF5722;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#FF5722</p><p>
          </p><p tips="">比较引人注意的颜色</p>
        </div>
      </li>
      <li class="layui-col-sm6">
        <div style="background-color: #01AAED;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#01AAED</p><p>
          </p><p tips="">文本链接着色</p>
        </div>
      </li>
      <li class="layui-col-sm6">
        <div style="background-color: #2F4056;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
          <p>#2F4056</p><p>
          </p><p tips="">侧边色</p>
        </div>
      </li>
    </ul>
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

::: title 中性色
:::

::: demo layui 认为灰色系代表极简，因为这是一种神奇的颜色，几乎可以与任何元素搭配，不易形成视觉疲劳，且永远不会过时。低调而优雅！

<template>
<ul class="layui-row site-doc-color site-doc-necolor">
      <li class="layui-col-md12">
        <div style="background-color: #FAFAFA;">
          <p>#FAFAFA</p><p>
        </p></div>
      </li>
      <li class="layui-col-md12">
        <div style="background-color: #f6f6f6;"><p>#F6F6F6</p><p></p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #eeeeee;"><p>#eeeeee</p><p></p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #e2e2e2;"><p>#e2e2e2</p><p></p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #dddddd;"><p>#dddddd</p><p></p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #d2d2d2;"><p>#d2d2d2</p><p></p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #cccccc;"><p>#cccccc</p><p></p></div>
      </li>
      <li class="layui-col-md4">
        <div style="background-color: #c2c2c2;"><p>#c2c2c2</p><p></p></div>
      </li>
    </ul>
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

::: title 颜色说明

:::

::: table

| Class           | 描述 | 使用                    |
| --------------- | ---- | ----------------------- |
| layui-bg-red    | 赤色 | class="layui-bg-red"    |
| layui-bg-orange | 橙色 | class="layui-bg-orange" |
| layui-bg-green  | 墨绿 | class="layui-bg-green"  |
| layui-bg-cyan   | 藏青 | class="layui-bg-cyan"   |
| layui-bg-blue   | 蓝色 | class="layui-bg-blue"   |
| layui-bg-black  | 雅黑 | class="layui-bg-black"  |

:::

::: comment
:::

::: previousNext color
:::