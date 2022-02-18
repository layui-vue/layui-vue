::: anchor
:::

::: title 基本介绍
:::

::: describe 将时间抽象到二维平面，垂直呈现一段从过去到现在的故事。
:::

我听见火焰在撕裂身后的一切

在密不透光的夹缝中

我们从时间的手里寻找平衡

从虚妄的感知里寻找意义

最终一无所获

所以痛苦和欢乐并无差别

日升月落 晨昏交替

我们在巨大的洪流里

只有此刻

永远无法捕捉的 此刻

::: title 基础使用
:::

::: demo

<template>
    <lay-timeline>
        <lay-timeline-item title="8月18日">
            <p>
                layui vue 的一切准备工作似乎都已到位。发布之弦，一触即发。
                <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
                <br>无论它能走多远，抑或如何支撑？至少我曾倾注全心，无怨无悔 <i class="layui-icon"></i>
            </p>
        </lay-timeline-item>
        <lay-timeline-item title="8月16日">
            <p>杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。</p>
            <ul>
                <li>《登高》</li>
                <li>《茅屋为秋风所破歌》</li>
            </ul>
        </lay-timeline-item>
        <lay-timeline-item title="8月15日">
            <p>
                中国人民抗日战争胜利日
                <br>铭记、感恩
                <br>所有为中华民族浴血奋战的英雄将士
                <br>永垂不朽
            </p>
        </lay-timeline-item>
    </lay-timeline>
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

::: title 简单模式
:::

::: demo

<template>
    <lay-timeline>
        <lay-timeline-item title="2021年，layui vue 里程碑版本 1.0 发布" simple></lay-timeline-item>
        <lay-timeline-item title="2017年，layui 里程碑版本 2.0 发布" simple></lay-timeline-item>
        <lay-timeline-item title="2016年，layui 首个版本发布" simple></lay-timeline-item>
        <lay-timeline-item title="2015年，layui 孵化" simple></lay-timeline-item>
    </lay-timeline>
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


::: title 节点插槽
:::

::: demo

<template>
    <lay-timeline>
        <lay-timeline-item title="2021年，layui vue 里程碑版本 1.0 发布" simple></lay-timeline-item>
        <lay-timeline-item title="2017年，layui 里程碑版本 2.0 发布" simple></lay-timeline-item>
        <lay-timeline-item title="2016年，layui 首个版本发布" simple></lay-timeline-item>
        <lay-timeline-item title="2015年，layui 孵化" simple>
            <template #dot>
                <lay-icon type="layui-icon-face-smile" color="red"></lay-icon>
            </template>
        </lay-timeline-item>
    </lay-timeline>
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

::: title Timeline Item 属性
:::

::: table

|        |          |     |
| ------ | -------- | --- |
| simple | 简单模式 | --  |
| title  | 标题     | --  |

:::

::: title Timeline Item 插槽
:::

::: table

|        |          |     |
| ------ | -------- | --- |
| dot | 节点 | --  |

:::

::: comment
:::

::: previousNext timeline
:::