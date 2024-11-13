::: anchor
:::

::: title 基本介绍
:::

::: describe 警告提示，展现需要关注的信息。
:::

::: title 基础使用
:::

::: demo 使用 `lay-tooltip` 标签，创建文字提示。

<template>
  <lay-tooltip content="假装这里有文字提示" trigger="click">
    <lay-button>提示信息</lay-button>
  </lay-tooltip>
</template>
:::

::: title 受控模式
:::

::: demo 通过 `visible` 属性，达成受控模式。

<template>
    <lay-space>
      <lay-tooltip :visible="visible" trigger="click" content="假装这里有文字提示" >
        <lay-button>提示信息</lay-button>
      </lay-tooltip>
      <lay-switch v-model="visible"></lay-switch>
    </lay-space>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)
</script>

:::

::: title 显示位置
:::

::: demo 通过 `position` 属性，设置 tooltip 显示位置。

<template>
  <div class="tooltip-base-content">
    <div class="row center">
      <lay-tooltip position="top-start" content="上边-开始-上边-开始-上边-开始">
        <lay-button>top-start</lay-button>
      </lay-tooltip>
      <lay-tooltip position="top"  content="上边">
        <lay-button>top</lay-button>
      </lay-tooltip>
      <lay-tooltip position="top-end"  content="上边-结束-上边-结束-上边-结束">
        <lay-button>top-end</lay-button>
      </lay-tooltip>
    </div>
    <div class="row">
      <lay-tooltip position="left-start" content="左边-开始">
        <lay-button>left-start</lay-button>
      </lay-tooltip>
      <lay-tooltip position="right-start" content="右边-开始">
        <lay-button>right-start</lay-button>
      </lay-tooltip>
    </div>
    <div class="row">
      <lay-tooltip position="left" content="左边">
        <lay-button>left</lay-button>
      </lay-tooltip>
      <lay-tooltip position="right" content="右边">
        <lay-button>right</lay-button>
      </lay-tooltip>
    </div>
    <div class="row">
      <lay-tooltip position="left-end" content="左边-开始">
        <lay-button>left-end</lay-button>
      </lay-tooltip>
      <lay-tooltip position="right-end" content="右边-结束">
        <lay-button>right-end</lay-button>
      </lay-tooltip>
    </div>
    <div class="row center">
      <lay-tooltip position="bottom-start" content="下边-开始">
        <lay-button>bottom-start</lay-button>
      </lay-tooltip>
      <lay-tooltip position="bottom"  content="下边">
        <lay-button>bottom</lay-button>
      </lay-tooltip>
      <lay-tooltip position="bottom-end"  content="下边-结束">
        <lay-button>bottom-end</lay-button>
      </lay-tooltip>
    </div>
  </div>
</template>

<style>
  .tooltip-base-content .row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tooltip-base-content .center{
    justify-content: center;
  }

  .custom-popper-class{
    border-color: red;
  }
</style>
:::

::: title 提示主题
:::

::: demo 通过 `is-dark` 属性，开启暗色主题。

<template>
  <lay-space>
    <lay-tooltip content="不明白是是非非，只知我不会不在。" :is-dark="isDark">
      <lay-button >tooltip</lay-button>
    </lay-tooltip>
    <lay-switch v-model="isDark"></lay-switch>
  </lay-space>
</template>

<script setup>
import { ref } from "vue";

const isDark = ref(false);
</script>
:::

::: title 是否禁用
:::

::: demo 通过 `disabled` 属性，禁用提示效果。

<template>
  <lay-space>
    <lay-tooltip :content="content" :disabled="!disabled">
      <lay-button>提示信息</lay-button>
    </lay-tooltip>
    <lay-switch v-model="disabled" onswitch-text="启用"  unswitch-text="禁用"></lay-switch>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue';

const contentArr = [
  "不明白是是非非，只知我不会不在。",
  "千山万水，去程是你，归程也是你。",
  "一约既定，万山无阻。",
  "时光都淡了，我还伴着你。",
  "只问深情，不问西东。",
  "感谢曾经在我身边的，一直在我身边。",
  "经年再相逢，魂梦与子同。"
];

const rendonCotent = function(){
  return contentArr[Math.floor(Math.random() * contentArr.length)];
};

const content = ref(rendonCotent())

const disabled = ref(true)

setInterval(()=> content.value =  rendonCotent(), 1000)
</script>
:::

::: title ref控制
:::

::: demo 通过 `ref` 属性，手动触发(通过ref触发，无法通过点击外部关闭)。

<template>
  <lay-space>
    <lay-button @click="onShow">打开</lay-button>
    <lay-button @click="onHide">关闭</lay-button>
    <lay-button @click="onUpdate">更新位置</lay-button>
    <lay-tooltip :content="content1" ref="tooltipRef">
      <lay-button>提示信息</lay-button>
    </lay-tooltip>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue';

const content1 = ref('提示信息提示信息提示信息提示信息')
const tooltipRef = ref()

const onShow = () => {
  tooltipRef.value.show()
}
const onHide = () => {
  tooltipRef.value.hide()
}
const onUpdate = () => {
  tooltipRef.value.update()
}
</script>
:::

::: title 插槽展示内容
:::

::: demo 通过 `content` slot，自定义内容。

<template>
  <lay-tooltip trigger="click">
    <lay-button>展示内容</lay-button>
    <template #content >
      <lay-table
        style="width: 800px;"
        :page="page" 
        :resize="true"
        :height="'100%'"
        :columns="columns" 
        :loading="loading"
        :default-toolbar="true"
        :data-source="dataSource" 
        v-model:selected-keys="selectedKeys"  
        @change="change"
        @sortChange="sortChange"
      >
        <template #status="{ row }">
          <lay-switch :model-value="row.status" @change="changeStatus($event , row)"></lay-switch>
        </template>
        <template v-slot:toolbar>
          <lay-button size="sm" type="primary">新增</lay-button>
          <lay-button size="sm" @click="remove">删除</lay-button>
        </template>
        <template v-slot:operator="{ row }">
          <lay-button size="xs" type="primary">编辑</lay-button>
          <lay-button size="xs">查看</lay-button>
        </template>
      </lay-table>
    </template>
  </lay-tooltip>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { layer } from '@layui/layui-vue';

const loading = ref(false);

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
      { title:"选项", width: "55px", type: "checkbox", fixed: "left" },
      { title:"编号", width: "80px", key:"id", fixed: "left", sort: "desc" },
      { title:"姓名", width: "80px", key:"name", sort: "desc" },
      { title:"状态", width: "180px", key:"status", customSlot: "status"},
      { title:"邮箱", width: "120px", key:"email" },
      { title:"性别", width: "80px", key:"sex" },
      { title:"年龄", width: "80px", key:"age", totalRow: true},
      { title:"城市", width: "120px", key:"city" },
      { title:"签名", width: "260px", key:"remark" },
      { title:"隐藏", width: "260px", key:"hide", hide: true, totalRow: "自定义" },
      { title:"时间", width: "120px", key:"joinTime"},
      { title:"操作", width: "150px", customSlot:"operator", key:"operator", fixed: "right", ignoreExport: true }
    ]);

    const change = (page) => {
      loading.value = true;
      setTimeout(() => {
        dataSource.value = loadDataSource(page.current, page.limit);
        loading.value = false;
      }, 1000);
    }

    const sortChange = (key, sort) => {
      layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
    }

    const dataSource = ref([
      {id:"1", name:"张三1", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"18",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"2", name:"张三2", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"3", name:"张三3", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"4", name:"张三4", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"5", name:"张三5", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"6", name:"张三6", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"7", name:"张三7", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"18",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"8", name:"张三8", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"9", name:"张三9", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true},
      {id:"10", name:"张三10", email: "test@qq.com", sex: "男", city: "浙江杭州", age:"20",remark: '花开堪折直须折,莫待无花空折枝.', joinTime: "2022-02-09", status: true}
    ])

    const changeStatus = (isChecked, row) => {
      dataSource.value.forEach((item) => {
        if(item.id === row.id) {
          layer.msg("Success", { icon: 1 }, () => {
            item.status = isChecked;
          })
        }
      })
    }

    const remove = () => {
      layer.msg(selectedKeys.value, { area: '50%'})
    }

    const loadDataSource = (page, pageSize) => {
      var response = [];
      var startIndex = ((page - 1) * pageSize) + 1;
      var endIndex = page * pageSize;
      for (var i = startIndex; i <= endIndex; i++) {
          response.push({
            id:`${i}`, 
            age:"18",
            sex: "男", 
            name:`张三${i}`, 
            email: "test@qq.com",
            remark: '花开堪折直须折,莫待无花空折枝.',  
            joinTime: "2022-02-09", 
            city: "浙江杭州", 
            status: true
          })
      }
      return response;
    }


</script>
:::

::: title 省略号开启tooltip
:::

::: demo 通过 `is-auto-show` 属性，开启。

<template>
    <lay-space>
        <div @click="changeText"><lay-button>Edit</lay-button></div>
        <div style="width: 100px;">
          <lay-tooltip content="不明白是是非非，只知我不会不在。" :isAutoShow="true">
            {{ text }}
          </lay-tooltip>
        </div>
    </lay-space>
</template>

<script setup>
import { ref } from "vue";

const text = ref("自动提示");

const changeText = () => {
  text.value = "以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务";
}
</script>
:::

::: title tooltip样式
:::

::: demo 通过 `popper-class` `popper-style` 属性，设置。

<template>
    <lay-tooltip content="popperClass 边框红色" trigger="click" popperClass="custom-popper-class" >
      <lay-button>popperClass 边框红色</lay-button>
    </lay-tooltip>
    <lay-tooltip content="popperStyle 字体红色" popperStyle="color: red;" >
      <lay-button>popperStyle 字体红色</lay-button>
    </lay-tooltip>
</template>

<style>
</style>
:::

::: title Tooltip 属性
:::

::: table

| 属性        | 描述     | 类型         | 默认值         | 可选值         | 变更说明|
| ----------- | -------- | -------------- |-------------- |-------------- |--------------|
| content     | 显示内容 | `string`        | -             |-             | |
| position    | 显示位置 | `string`        | `top`          | `top-start` `top` `top-end` `bottom-start` `bottom` `bottom-end` `left-start` `left` `left-end` `right-start` `right` `right-end` | |
| is-dark      | 是否为黑色主题 | `boolean` | `false` |    | |
| disabled    | 是否禁用 | `boolean` | `false` |   | |
| is-can-hide    | 控制是否可以隐藏,可参考`lay-slider`组件 | `boolean` | `true` |    | `2.17.7删除` |
| is-auto-show   | 控制超出文本 `...` 时自动展示， 没有 `...` 时不展示 | `boolean` | `false` |    | |
| visible     | 控制显示/隐藏| `boolean`| `false` |  |  | |
| enterable   | 鼠标能否进入 tooltip 中 | `boolean` | `true` | | |
| trigger   | 触发方式 | `string` | `hover` | `click` `hover` `contextmenu` `focus` | - |
| popper-class    | tooltip内容box类名 | `string` `array`  |  | | `2.17.7类型删除object` |
| popper-style     | tooltip内容box类名 | `string` `object` |  | |  |
| teleportProps    | 下拉面板 `传递` 属性  | `object`             | `{to: 'body', disabled: false}`   |  `vue teleport` 组件  | `2.19.3` |

:::

::: title Slots
:::

::: table

| 插槽名    | 描述     | 
| ------- | -------- |
| default | 触发tooltip开启元素 | 
| content | 自定义内容 | 

:::

::: title Exposes 事件
:::

::: table

| 名称    | 描述     | 
| ------- | -------- | 
| show | 手动打开tooltip | 
| hide | 手动关闭tooltip |  
| update | tooltip弹出内容隐藏后触发 |  

:::

::: previousNext tooltip
:::
