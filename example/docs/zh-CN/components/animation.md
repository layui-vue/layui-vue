::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <div class="anim">
    <ul class="layui-border-box site-doc-icon site-doc-anim">
      <li style="height:auto">
        <div class="layui-anim layui-anim-down">顶部往下滑入</div>
        <div class="code">layui-anim-down</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-downbit">微微往下滑入</div>
        <div class="code">layui-anim-downbit</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-up">底部往上滑入</div>
        <div class="code">layui-anim-up</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-upbit">微微往上滑入</div>
        <div class="code">layui-anim-upbit</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scale">平滑放大</div>
        <div class="code">layui-anim-scale</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scaleSpring">弹簧式放大</div>
        <div class="code">layui-anim-scaleSpring</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scalesmall">平滑放小</div>
        <div class="code">layui-anim-scalesmall</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-scalesmall-spring">弹簧式放小</div>
        <div class="code">layui-anim-scalesmall-spring</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-fadein">渐现</div>
        <div class="code">layui-anim-fadein</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-fadeout">渐隐</div>
        <div class="code">layui-anim-fadeout</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-rotate">360度旋转</div>
        <div class="code">layui-anim-rotate</div>
      </li>
      <li style="height:auto">
        <div class="layui-anim layui-anim-rotate layui-anim-loop">循环动画</div>
        <div class="code">追加：layui-anim-loop</div>
      </li>
    </ul>
  </div>
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
<style>
.site-doc-icon {
  margin-bottom: 50px;
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

.site-doc-icon li .layui-icon {
  display: inline-block;
  font-size: 32px;
}

.site-doc-color {
  margin: 15px 0;
}

.site-doc-necolor li div {
  border-radius: 0;
  color: #000 !important;
}

.site-doc-color li div {
  padding: 20px 10px;
  color: #fff;
  text-align: center;
  line-height: 1.6;
  font-size: 14px;
}

.site-doc-bgcolor li {
  padding: 20px 10px;
}
.anim .site-doc-icon {
  margin-bottom: 50px;
  font-size: 0;
}

.anim .site-doc-icon li {
  width: 50%;
}

.anim .site-doc-anim li {
  height: auto;
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
  background-color: #009688;
  cursor: pointer;
  color: #fff;
  border-radius: 50%;
}

.anim .site-doc-icon li .code {
  white-space: nowrap;
}
</style>

:::

::: title 动画类名
:::

::: table

| 类名                              | 描述         | 使用                                           |
| --------------------------------- | ------------ | ---------------------------------------------- |
| layui-anim-down                   | 顶部往下滑入 | `layui-anim layui-anim-down`                   |
| layui-anim-downbit                | 微微往下滑入 | `layui-anim layui-anim-downbit`                |
| layui-anim-up                     | 底部往上滑入 | `layui-anim layui-anim-up`                     |
| layui-anim-upbit                  | 微微往上滑入 | `layui-anim ayui-anim-upbit`                   |
| layui-anim-scale                  | 平滑放大     | `layui-anim layui-anim-scale`                  |
| layui-anim-scaleSpring            | 弹簧式放大   | `layui-anim layui-anim-scaleSpring`            |
| layui-anim-scalesmall             | 平滑放小     | `layui-anim layui-anim-scalesmall`             |
| layui-anim-scalesmall-spring      | 弹簧式放小   | `layui-anim layui-anim-scalesmall-spring`      |
| layui-anim-fadein                 | 渐现         | `layui-anim layui-anim-fadein`                 |
| layui-anim-fadeout                | 渐隐         | `layui-anim layui-anim-fadeout`                |
| layui-anim-rotate                 | 360 度旋转   | `layui-anim layui-anim-rotate`                 |
| layui-anim-rotate layui-anim-loop | 循环动画     | `layui-anim layui-anim-rotate layui-anim-loop` |

:::

::: comment
:::

::: previousNext animation
:::