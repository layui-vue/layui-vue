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
      @change="change"
      @sortChange="sortChange">
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

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
      { title:"选项", width: "55px", type: "checkbox", fixed: "left" },
      { title:"编号", width: "80px", key:"id", fixed: "left", sort: "desc" },
      { title:"姓名", width: "80px", key:"name", sort: "desc" },
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

    const sortChange = (key, sort) => {
      layer.msg(`字段${key} - 排序${sort}`)
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

    return {
      columns,
      dataSource,
      selectedKeys,
      page,
      change,
      changeStatus,
      remove
    }
  }
}
</script>

:::

::: title 多级表头
:::

::: demo 通过 `columns[n]` 内嵌 `children` 属性，以渲染多级表头。

<template>
  <lay-table :columns="columns1" :data-source="dataSource1" :default-toolbar="true"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns1 = [
      { title:"选项", type: "checkbox", width: "55px", fixed: "left" },
      { title:"编号", key:"id", fixed: "left", sort: "desc" },
      { title:"名称", width: "80px", key:"name" },
      { title:"性别", width: "80px", key:"sex"},
      { title:"年龄", width: "80px", key:"age" },
      { title:"收货地址", align: "center",
        children: [
          { title: "省", key: "province", width: "120px" },
          { title: "市", key: "city", width: "120px" },
          { title: "区", key: "area", width: "120px" },
        ]
      },
      { title:"发货时间", width: "120px", key:"deliveryTime" },
    ]

    const dataSource1 = ref([
      {id:"1",name:"张三1",province:"山东",city:"济南",area: "高新区", sex:"男", age:"20", deliveryTime: "2022-02-09"},
      {id:"2",name:"张三2",province:"浙江",city:"杭州",area: "西湖区", sex:"男", age:"20", deliveryTime: "2022-02-09"},
      {id:"3",name:"张三3",province:"湖北",city:"武汉",area: "武昌区", sex:"男", age:"20", deliveryTime: "2022-02-09"},
      {id:"4",name:"张三4",province:"江苏",city:"苏州",area: "姑苏区", sex:"男", age:"20", deliveryTime: "2022-02-09"},
      {id:"5",name:"张三5",province:"安徽",city:"黄山",area: "黄山区", sex:"男", age:"20", deliveryTime: "2022-02-09"}
    ]);

    return {
      columns1,
      dataSource1,
    }
  }
}
</script>

:::

::: title 嵌套表单
:::

::: demo

<template>
  <lay-table :columns="columns2" :data-source="dataSource2" v-model:expandKeys="expandKeys2">
    <template v-slot:expand="{ data }"> 
      <div class="expand-content">
        <lay-progress :percent="data.chinese" theme="red" :show-text="true" text="语文"></lay-progress>
        <lay-progress :percent="data.mathematics" theme="orange" :show-text="true" text="数学"></lay-progress>
        <lay-progress :percent="data.english" theme="green" :show-text="true" text="英语"></lay-progress>
        <lay-progress :percent="data.organism" theme="cyan" :show-text="true" text="生物"></lay-progress>
        <lay-progress :percent="data.geography" theme="blue" :show-text="true" text="地理"></lay-progress>
        <lay-progress :percent="data.history" theme="black" :show-text="true" text="历史"></lay-progress>
        <lay-progress :percent="data.politics" color="#a233c6" :show-text="true" text="政治"></lay-progress>
      </div>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns2 = [
      { title:"编号", width:"80px", key:"id", fixed: "left", sort: "desc" },
      { title:"姓名", width:"80px", key:"name" },
      { title:"班级", width:"120px", key:"classes" },
      { title:"语文", width:"80px", key:"chinese" },
      { title:"数学", width:"80px", key:"mathematics" },
      { title:"英语", width:"80px", key:"english" },
      { title:"生物", width:"80px", key:"organism" },
      { title:"地理", width:"80px", key:"geography" },
      { title:"历史", width:"80px", key:"history" },
      { title:"政治", width:"80px", key:"politics" },
      { title:"总分", width: "180px", key:"score" }
    ]

    const dataSource2 = [
      {id:"1", name:"张三1", classes:"六年级一班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:454},
      {id:"2", name:"张三2", classes:"六年级二班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:432},
      {id:"3", name:"张三3", classes:"六年级三班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:534},
      {id:"4", name:"张三4", classes:"六年级四班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:342},
      {id:"5", name:"张三5", classes:"六年级五班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:653},
      {id:"6", name:"张三6", classes:"六年级六班", chinese: 80, mathematics: 50, english: 60, organism: 80, geography: 22, history:55, politics: 53, score:632},
    ]

    const expandKeys2 = ref(["1"])
    const defaultExpandAll2 = ref(false)

    return {
      columns2,
      dataSource2,
      expandKeys2,
      defaultExpandAll2
    }
  }
}
</script>

<style lang="less">
.expand-content {
  width: 100%;
  padding: 0px 20px 20px 0px;
  .layui-progress {
    margin-top: 24px;
  }
}
</style>

:::

::: title 选中数据
:::

::: demo

<template>
  <lay-table 
      height="300px" 
      ref="tableRef3" 
      :columns="columns3" 
      :data-source="dataSource3" 
      :default-toolbar="true"
      v-model:selectedKeys="selectedKeys3">
    <template #toolbar>
      <lay-button type="primary" size="sm" @click="getSelectedKeys3">获取选中主键</lay-button>
      <lay-button size="sm" @click="getCheckData3">获取选中数据</lay-button>
      <lay-button size="sm" @click="changeSelectedKeys3">修改选中数据</lay-button>
      <lay-button size="sm" @click="clearSelectedKeys3">清空选中数据</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue';
import { layer } from "@layui/layui-vue";

export default {
  setup() {

    const tableRef3 = ref();

    const selectedKeys3 = ref(["2", "3", "6", "7"]);

    const changeSelectedKeys3 = () => {
      selectedKeys3.value = ["1", "2", "3"]
    }

    const clearSelectedKeys3 = () => {
      selectedKeys3.value = []
    }

    const getSelectedKeys3 = () => {
      layer.msg(selectedKeys3.value);
    }

    const getCheckData3 = () => {
      layer.msg(tableRef3.value.getCheckData());
    }

    const columns3 = [
      {
        fixed: "left",
        type: "checkbox",
      },
      {
        title:"用户",
        width:"80px",
        key:"name",
        fixed: "left"
      },{
        title:"城市",
        width: "80px",
        key:"city"
      },{
        title:"性别",
        key:"sex",
        width: "80px"
      },{
        title:"年龄",
        width: "80px",
        key:"age"
      },{
        title:"积分",
        width: "80px",
        key:"score"
      },{
        title:"签到",
        width: "80px",
        key:"sign"
      },{
        title:"加入时间",
        width: "120px",
        key:"joinTime"
      },{
        title:"签名",
        width: "300px",
        key:"remark"
      }
    ]

    const dataSource3 = ref([
      {id:"1", name:"张三1", city: "城市-1", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"2", name:"张三2", city: "城市-2", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"3", name:"张三3", city: "城市-3", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"4", name:"张三4", city: "城市-4", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"5", name:"张三5", city: "城市-5", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"6", name:"张三6", city: "城市-6", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"7", name:"张三7", city: "城市-7", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"8", name:"张三8", city: "城市-8", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"9", name:"张三9", city: "城市-9", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"10", name:"张三10", city: "城市-10", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"11", name:"张三11", city: "城市-11", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"12", name:"张三12", city: "城市-12", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"13", name:"张三13", city: "城市-13", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"14", name:"张三14", city: "城市-14", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"15", name:"张三15", city: "城市-15", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"16", name:"张三16", city: "城市-16", sex:"男", age:"18", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"17", name:"张三17", city: "城市-17", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
      {id:"18", name:"张三18", city: "城市-18", sex:"男", age:"20", remark: '屈指古今多少事，都只是、镜中春', score: 100, sign: "已签到", joinTime: "2022-02-09"},
    ])

    return {
      columns3,
      dataSource3,
      selectedKeys3,
      getSelectedKeys3,
      getCheckData3,
      tableRef3,
      changeSelectedKeys3,
      clearSelectedKeys3
    }
  }
}
</script>

:::


::: title Table 属性
:::

::: table

| 属性                 | 描述                                                       | 类型                | 默认值     | 可选值                                       | 
| -------------------- | --------------------------------------------------------- | ------------------- | ---------- | -------------------------------------------- | 
| columns              | 列配置，具体详见 [更多](#tableColumn)                       | --                  | --         | --                                           | 
| dataSource           | 数组数组                                                   | --                  | --         | --                                           | 
| id                   | 数据主键                                                   | `string`            | --         | --                                           | 
| v-model:selectedKeys | 复选框选中项                                                | --                  | --         | --                                           | 
| v-model:selectedKey  | 单选框选中项                                                | --                  | --         | --                                           | 
| default-toolbar      | 工具栏                                                     | `boolean` `array`   | `false`    | `true` `false` `['filter','export','print']` | 
| size                 | 表格大小                                                   | `string`            | `md`       | `lg` `md` `sm`                               | 
| children-column-name | 指定树形结构的列名                                          | `string`            | `children` | --                                           | 
| indent-size          | 指定树形结构的缩进距离                                       | `number`            | `30`       | --                                           | 
| height               | 表格高度                                                   | `number`            | --         | --                                           | 
| maxHeight            | 表格最大高度                                               | `number`            | --         | --                                           | 
| even                 | 开启斑马条纹                                               | `boolean`           | `false`    | `true` `false`                               | 
| cellStyle            | 单元格样式 function(row, column, rowIndex, columnIndex)    | `string` `function` | --         | --                                           | 
| rowStyle             | 表格行样式 function(row, rowIndex)                         | `string` `function` | --         | --                                           | 
| cellClassName        | 单元格类名 function(row, column, rowIndex, columnIndex)    | `string` `function` | --         | --                                           | 
| rowClassName         | 表格行类名 function(row, rowIndex)                         | `string` `function` | --         | --                                           | 
| skin                 | 指定风格                                                    | `string`           | --         | `line` `row` `nob`                           |
| expand-index         | 指定展开操作所在列的索引，使用 children 字段或 expand 插槽时有效 | `number`          | --         | --                                           | 
| default-expand-all   | 初始时，是否展开所有行                                      | `boolean`           | `false`    | `true` `false`                               | 
| expand-keys          | 展开行，控制属性                                            | `array`             | `[]`       | --                                           | 
| span-method          | 单元格合并算法                                              | `function`          | --         | --                                           | 
| getCheckboxProps     | 复选框的默认属性配置                                         | `function`          | --         | --                                           | 
| getRadioProps        | 单选框的默认属性配置                                         | `function`          | --         | --                                           | 
| resize               | 开启列宽拉伸                                                | `boolean`           | `false`    | `true` `false`                               | 
| autoColsWidth        | 启用后，根据内容自动计算列宽                                 | `boolean`           | `false`    | `true` `false`                               | 
| defaultToolbar       | 是否启用默认工具栏                                          | `boolean`           | `false`    | `true` `false`                               | 
| loading              | 是否开启加载动画                                            | `boolean`           | `false`    | `true` `false`                               | 
 
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
