::: anchor
:::

::: title 基本介绍
:::

::: demo

<template>
	<div style="height: 300px; width: 100%; position: relative" class="lay-watermark">
		<lay-watermark content="layui-vue" font="20px Microsoft Yahei" element-box=".lay-watermark" rotate="90">
		</lay-watermark>
	</div>
</template>

<script>
 import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'
const value2 = ref(45)
const model = reactive({})

const submit = () => {
  layer.msg(`${JSON.stringify(model)}`, { time: 2000 });
};
</script>

:::

::: title 表单内容
:::

::: demo

<template>
	<div style="height: 300px; width: 100%; position: relative" class="lay-watermark-form">
			<lay-watermark content="layui-vue" font="20px Microsoft Yahei" element-box=".lay-watermark-form"></lay-watermark>
			<lay-form :model="model">
			<lay-form-item label="账户" prop="username">
				<lay-input v-model="model.username"></lay-input>
			</lay-form-item>
			<lay-form-item label="密码" prop="password">
				<lay-input v-model="model.password" type="text"></lay-input>
			</lay-form-item>
			<lay-form-item label="描述" prop="desc">
				<lay-input placeholder="请输入描述" v-model="model.describe"></lay-input>
			</lay-form-item>
			<lay-form-item style="text-align: center;">
				<lay-button type="primary" @click="submit">提交</lay-button>
				<lay-button type="default" @click="">重置</lay-button>
			</lay-form-item>
		</lay-form>
	</div>
</template>

<script>
 import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'

const model = reactive({})

const submit = () => {
  layer.msg(`${JSON.stringify(model)}`, { time: 2000 });
};
</script>

:::



::: title 滚动
:::

::: demo

<template>
<div style="position: relative" class="layui-scroll-test">
<lay-watermark content="layui-vue" font="20px Microsoft Yahei" element-box=".layui-scroll-test"></lay-watermark>
	<lay-scroll height="400px" style="background-color: #ffffff; position: relative" thumbColor="#000000">
		<lay-container>
		<lay-row>
			<lay-col span="24"><lay-panel
			v-for="(n, index) in total" :key="n" style="margin: 10px; padding: 10px; background-color: transparent">内容</lay-panel>
			</lay-col>  
			</lay-row>
		</lay-container>
	</lay-scroll>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const total = ref(50)

const changeTotal = () => {
  total.value = 2
}

const changeMaxTotal = () => {
  total.value = 50
}
</script>


:::


::: title Watermark 属性
:::

::: table

| 属性        | 描述     | 类型 | 默认值         |
| ----------- | -------- | ------- | -------------- |
| content     | 显示内容 | string | --             |
| fontSize    | 字体大小 | string |`20px`|
| fontFamily  | 字体样式 | string |`serif`|
| color       | 字体颜色 | string |`rgba(184, 184, 184, 0.6)`   |
| rotate      | 旋转角度（大于-90 小于90） | number |`-45`  |
| height      | 水印字体高度设置 | number | `200`   |
| width       | 水印字体宽度设置 | number | `200`   |
| elementBox  | 水印容器，需要传父元素class，例：'.lay-watermark-box'，父元素需要设置position: relative | string | 'body'   |

:::

::: previousNext tooltip
:::
