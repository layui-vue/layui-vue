::: anchor
:::

::: title 基本介绍
:::

::: describe 以表格的承载方式对数据进行渲染、重载、排序、统计、分页等等一系列交互操作，并提供了丰富的 API 用于扩展，基本涵盖了日常业务所涉及的大部分需求。
:::

::: title 综合演示
:::

::: demo 所有示例中演示的数据均为「静态模拟数据」，实际使用时换成您的真实接口即可。

<template>
  <lay-table 
      height="300px"
      :default-toolbar="true"
      :columns="columns" 
      :loading="loading"
      :data-source="dataSource" 
      :page="page" 
      v-model:selected-keys="selectedKeys"  
      @change="change">
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

<script>
import { ref, watch, reactive } from 'vue';
import { layer } from '@layui/layui-vue';

export default {
  setup() {

    const loading = ref(false);

    const model = reactive({});

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
      { title:"选项", type: "checkbox", width: "55px", fixed: "left" },
      { title:"编号", key:"id", fixed: "left", sort: "desc" },
      { title:"姓名", width: "80px", key:"name" },
      { title:"状态", width: "80px", key:"status", customSlot: "status"},
      { title:"邮箱", width: "120px", key:"email" },
      { title:"性别", width: "80px", key:"sex" },
      { title:"年龄", width: "80px", key:"age" },
      { title:"城市", width: "120px", key:"city" },
      { title:"签名", width: "260px", key:"remark" },
      { title:"时间", width: "120px", key:"joinTime" },
      { title:"操作", width: "150px", customSlot:"operator", key:"operator", fixed: "right" }
    ]);

    const change = (page) => {
      loading.value = true;
      setTimeout(() => {
        dataSource.value = loadDataSource(page.current, page.limit);
        loading.value = false;
      }, 1000);
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
      layer.msg(selectedKeys.value)
    }

    /**
     * 调用接口，获取数据 (模拟) 
     */
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

    return {
      columns,
      dataSource,
      selectedKeys,
      page,
      change,
      changeStatus,
      model,
      remove
    }
  }
}
</script>

:::

::: title Table 属性
:::

::: table

| 属性                 | 描述                                                  | 类型                | 默认值     | 可选值                                       | 版本    |
| -------------------- | ----------------------------------------------------- | ------------------- | ---------- | -------------------------------------------- | ------- |
| columns              | 列配置 - [更多](#tableColumn)                         | --                  | --         | --                                           | --      |
| dataSource           | 数据源                                                | --                  | --         | --                                           | --      |
| checkbox             | 开启复选框                                            | `boolean`           | `false`    | `true` `false`                               | --      |
| id                   | 主键                                                  | `string`            | --         | --                                           | --      |
| v-model:selectedKeys | 选中项 (多选)                                         | --                  | --         | --                                           | --      |
| v-model:selectedKey  | 选中项 (单选)                                         | --                  | --         | --                                           | --      |
| default-toolbar      | 工具栏                                                | `boolean` `array`   | `false`    | `true` `false` `['filter','export','print']` | --      |
| size                 | 尺寸                                                  | `string`            | `md`       | `lg` `md` `sm`                               | --      |
| children-column-name | 树节点字段                                            | `string`            | `children` | --                                           | --      |
| indent-size          | 树表行级缩进                                          | `number`            | `30`       | --                                           | --      |
| height               | 表格高度                                              | `number`            | --         | --                                           | --      |
| maxHeight            | 表格最大高度                                          | `number`            | --         | --                                           | --      |
| even                 | 斑马条纹                                              | `boolean`           | `false`    | `true` `false`                               | --      |
| cellStyle            | 列样式 function(row, column, rowIndex, columnIndex)   | `string` `function` | --         | --                                           | --      |
| rowStyle             | 行样式 function(row, rowIndex)                        | `string` `function` | --         | --                                           | --      |
| cellClassName        | 列类名称 function(row, column, rowIndex, columnIndex) | `string` `function` | --         | --                                           | --      |
| rowClassName         | 行类名称 function(row, rowIndex)                      | `string` `function` | --         | --                                           | --      |
| skin                 | 风格                                                  | `string`            | --         | `line` `row` `nob`                           | --      |
| expand-index         | 展开所在列                                            | `number`            | --         | --                                           | --      |
| default-expand-all   | 默认展开所有列 (自 1.9.7 后，具备响应式能力)          | `boolean`           | `false`    | `true` `false`                               | --      |
| expand-keys          | 展开的列                                              | `array`             | `[]`       | --                                           | --      |
| span-method          | 合并算法                                              | `function`          | --         | --                                           | `1.4.0` |
| getCheckboxProps     | 多选行属性                                            | `function`          | --         | --                                           | `1.4.0` |
| getRadioProps        | 单选行属性                                            | `function`          | --         | --                                           | `1.4.0` |
| resize               | 开启所有单元格列宽拖动                                | `boolean`           | `false`    | `true` `false`                               | `1.9.4` |
| autoColsWidth        | 列宽自动计算，最大程度利用空间（1.9.8）               | `boolean`           | `false`    | `true` `false`                               | `1.9.8` |

:::

::: title Table 事件
:::

::: table

| 属性            | 描述     | 参数                                   |
| --------------- | -------- | -------------------------------------- |
| row             | 行单击   | { row: 当前行数据 }                    |
| row-double      | 行双击   | { row: 当前行数据 }                    |
| row-contextmenu | 行右击   | { row: 当前行数据 }                    |
| change          | 分页事件 | { current: 当前页码, limit: 每页数量 } |

:::

::: title Table 插槽
:::

::: table

| 插槽       | 描述         | 参数                                                                                                                                                    | 版本    |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| toolbar    | 自定义工具栏 | --                                                                                                                                                      | --      |
| footer     | 底部扩展     | --                                                                                                                                                      | `1.4.4` |
| expand     | 嵌套面板     | { row } 在 1.8.6 版本，data 参数由 row 替代，但 data 仍然可用                                                                                           | `1.4.4` |
| customSlot | 自定义列插槽 | { row，rowIndex，column，columnIndex } 在 1.8.6 版本，data 参数由 row 替代，但 data 仍然可用，新增 rowIndex 行索引 columnIndex 列索引 column 列信息参数 | `1.4.4` |

:::

### <div id="tableColumn"></div>

::: title Table 数据
:::

::: table

| 插槽            | 描述                           | 类型      | 默认值  | 可选值                      | 版本    |
| --------------- | ------------------------------ | --------- | ------- | --------------------------- | ------- |
| title           | 列标题                         | --        | --      | --                          | --      |
| key             | 数据字段                       | --        | --      | --                          | --      |
| customSlot      | 自定义插槽                     | --        | --      | --                          | --      |
| width           | 宽度                           | --        | --      | --                          | --      |
| minWidth        | 最小宽度                       | --        | `100px` | --                          | --      |
| sort            | 排序                           | --        | --      | --                          | --      |
| titleSlot       | 标题插槽                       | --        | --      | --                          | --      |
| align           | 对齐方式                       | `string`  | `left`  | `left` `right` `center`     | --      |
| ellipsisTooltip | 当内容过长被隐藏时显示 tooltip | `boolean` | `false` | `true` `false`              | --      |
| fixed           | 列固定                         | `string`  | --      | `left` `right`              | --      |
| type            | 列类型                         | `string`  | --      | `number` `checkbox` `radio` | --      |
| children        | 表头分组                       | `string`  | --      | `number` `checkbox` `radio` | `1.4.0` |
| resize          | 单元格列宽拖动                 | `boolean` | `false` | `true` `false`              | `1.9.4` |

:::

::: previousNext table
:::
