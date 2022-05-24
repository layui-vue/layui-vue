::: anchor
:::

::: title 基本介绍
:::

::: describe 展示行列数据。
:::

::: title 基础使用
:::

::: demo 使用 `lay-table` 标签, 创建表格

<template>
  <lay-table :columns="columns1" :dataSource="dataSource1"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns1 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      },{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true,
      }
    ]

    const dataSource1 = [
      {username:"root", password:"root", age:"18", remark: 'layui - vue（谐音：类 UI) '},
      {username:"woow", password:"woow", age:"20", remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'}
    ]

    return {
      columns1,
      dataSource1
    }
  }
}
</script>

:::

::: title 不同尺寸
:::

::: demo

<template>
  <lay-form>
    <lay-radio v-model="size2" name="action" label="sm">sm</lay-radio>
    <lay-radio v-model="size2" name="action" label="md">md</lay-radio>
    <lay-radio v-model="size2" name="action" label="lg">lg</lay-radio>
  </lay-form>
  <lay-table :columns="columns2" :dataSource="dataSource2" :size="size2"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns2 = [
      {
        title:"账户",
        width:"200px",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      }
    ]

    const dataSource2 = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]
    
    const size2 = ref('md');

    return {
      size2,
      columns2,
      dataSource2
    }
  }
}
</script>

:::

::: title 开启分页
:::

::: demo

<template>
  <lay-table :columns="columns3" :dataSource="dataSource3" :page="page3" @change="change3"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    
    const page3 = {
      total: 100,
      limit: 10,
      current: 2
    }

    const change3 = function({ current }){
      console.log("当前页:" + JSON.stringify(current))
    }

    const columns3 = [
      {
        title:"账户",
        width:"200px",
        slot:"username",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        slot:"password",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      }
    ]

    const dataSource3 = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]

    return {
      page3,
      change3,
      columns3,
      dataSource3
    }
  }
}
</script>

:::

::: title 开启排序
:::

::: demo

<template>
  <lay-table :columns="columns4" :dataSource="dataSource4"></lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns4 = [
      {
        title:"姓名",
        width:"200px",
        key:"name"
      },{
        title:"成绩",
        width: "180px",
        key:"score",
        sort: true
      }
    ]

    const dataSource4 = [
      {name:"张三", score:100},
      {name:"李四", score:80},
      {name:"王二", score:99},
      {name:"麻子", score:92},
      {name:"无名", score:60},
      {name:"有名", score:70},
    ]

    return {
      columns4,
      dataSource4
    }
  }
}
</script>

:::

::: title 完整表格
:::

::: demo

<template>
  <lay-table :columns="columns5" id="id" :dataSource="dataSource5" v-model:selectedKeys="selectedKeys5"  :checkbox="checkbox5" :default-toolbar="defaultToolbar5" @row="rowClick5">
    <template v-slot:toolbar>
      <lay-button size="sm">新增</lay-button>
      <lay-button size="sm">删除</lay-button>
    </template>
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:username-title>😊</template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
    <template v-slot:operator="{ data }">
      <lay-button size="xs">修改</lay-button>
      <lay-button size="xs" type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup() {

    const selectedKeys5 = ref(['1'])
    const checkbox5 = ref(true)
    const defaultToolbar5 = ref(true)

    const columns5 = [
      {
        title:"账户",
        width:"200px",
        titleSlot: "username-title",
        customSlot:"username",
        key:"username",
        align: "left"
      },{
        title:"密码",
        customSlot:"password",
        width:"200px",
        key:"password",
        align: "center"
      },
      {
        title:"年龄",
        width: "200px",
        key:"age",
        sort: true,
        align: "right"
      },
{
        title:"备注",
        width: "180px",
        key:"remark",
        ellipsisTooltip: true,
      }
      ,{
        title:"操作",
        width:"100px",
        customSlot:"operator",
        key:"operator"
      }
    ]

    const dataSource5 = [
      {id:"1", username:"root",password: '**',age:"18",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'},
      {id:"2", username:"woow",password: '**', age:"20",remark: 'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库.'}
    ]

    const rowClick5 = function(data) {
      console.log(JSON.stringify(data))
    }
    
    const rowDoubleClick5 = function(data) {
      console.log(JSON.stringify(data))
    }

    watch(selectedKeys5, () => {
      console.log("复选框监听:" + selectedKeys5.value);
    })

    return {
      columns5,
      dataSource5,
      selectedKeys5,
      checkbox5,
      defaultToolbar5,
      rowClick5,
      rowDoubleClick5
    }
  }
}
</script>

:::

::: title Table 属性
:::

::: table

| 属性                 | 描述                          | 类型      | 默认值  | 可选值         |
| -------------------- | ----------------------------- | --------- | ------- | -------------- |
| columns              | 列配置 - [更多](#tableColumn) | --        | --      | --             |
| dataSource           | 数据源                        | --        | --      | --             |
| checkbox             | 开启复选框                    | `boolean` | `false` | `true` `false` |
| id                   | 主键                          | `string`  | --      | --             |
| v-model:selectedKeys | 选中项                        | --        | --      | --             |
| default-toolbar      | 工具栏                        | `boolean` | `false` | `true` `false` |
| size                 | 尺寸                          | `string`  | `md`    | `lg` `md` `sm` |

:::

::: title Table 事件
:::

::: table

| 属性       | 描述   | 参数          |
| ---------- | ------ | ------------- |
| row        | 行单击 | data : 当前行 |
| row-double | 行双击 | data : 当前行 |

:::

::: title Table 插槽
:::

::: table

| 插槽    | 描述         | 参数 |
| ------- | ------------ | ---- |
| toolbar | 自定义工具栏 | --   |

:::

### <div id="tableColumn"></div>

::: title Table 数据
:::

::: table

| 插槽       | 描述       | 类型     | 默认值 | 可选值                  |
| ---------- | ---------- | -------- | ------ | ----------------------- |
| title      | 列标题     | --       | --     | --                      |
| key        | 数据字段   | --       | --     | --                      |
| customSlot | 自定义插槽 | --       | --     | --                      |
| width      | 宽度       | --       | --     | --                      |
| minWidth      | 最小宽度       | --       | --     | --                      |
| sort       | 排序       | --       | --     | --                      |
| titleSlot  | 标题插槽   | --       | --     | --                      |
| align      | 对齐方式   | `string` | `left` | `left` `right` `center` |
| ellipsisTooltip  | 当内容过长被隐藏时显示 tooltip   | `boolean` | `false` | `true` `false` |

:::

::: previousNext table
:::
