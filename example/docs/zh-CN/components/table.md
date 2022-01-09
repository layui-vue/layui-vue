::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-table :columns="columns" :dataSource="dataSource">
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
    <template v-slot:operator="{ data }">
      <lay-button >修改</lay-button>
      <lay-button type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns = [
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
      },{
        title:"操作",
        width: "180px",
        customSlot:"operator",
        key:"operator"
      }
    ]

    const dataSource = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]

    return {
      columns,
      dataSource
    }
  }
}
</script>

:::

::: title 不同尺寸
:::

::: demo

<template>
  <lay-table :columns="columns" :dataSource="dataSource" size="lg">
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
    <template v-slot:operator="{ data }">
      <lay-button >修改</lay-button>
      <lay-button type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const columns = [
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
      },{
        title:"操作",
        width: "180px",
        customSlot:"operator",
        key:"operator"
      }
    ]

    const dataSource = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]

    return {
      columns,
      dataSource
    }
  }
}
</script>

:::

::: title 开启分页
:::

::: demo

<template>
  <lay-table :columns="columns" :dataSource="dataSource" :page="page" @change="change">
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
    <template v-slot:operator="{ data }">
      <lay-button >修改</lay-button>
      <lay-button type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    
    const page = {
      total: 100,
      limit: 10
    }

    const change = function({ current }){
      console.log("当前页:" + JSON.stringify(current))
    }

    const columns = [
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
      },{
        title:"操作",
        width: "180px",
        customSlot:"operator",
        key:"operator"
      }
    ]

    const dataSource = [
      {username:"root", password:"root", age:"18"},
      {username:"woow", password:"woow", age:"20"}
    ]

    return {
      page,
      change,
      columns,
      dataSource
    }
  }
}
</script>

:::

::: title 完整表格
:::

::: demo

<template>
  <lay-table :columns="columns" id="id" :dataSource="dataSource" v-model:selectedKeys="selectedKeys"  :checkbox="checkbox" :default-toolbar="defaultToolbar" @row="rowClick">
    <template v-slot:toolbar>
      <lay-button size="sm">新增</lay-button>
      <lay-button size="sm">删除</lay-button>
    </template>
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
    <template v-slot:operator="{ data }">
      <lay-button >修改</lay-button>
      <lay-button type="primary">删除</lay-button>
    </template>
  </lay-table>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selectedKeys = ref(['1'])
    const checkbox = ref(true)
    const defaultToolbar = ref(true)

    const columns = [
      {
        title:"账户",
        width:"200px",
        customSlot:"username",
        key:"username"
      },{
        title:"密码",
        width: "180px",
        customSlot:"password",
        key:"password"
      },{
        title:"年龄",
        width: "180px",
        key:"age"
      },{
        title:"操作",
        width: "180px",
        customSlot:"operator",
        key:"operator"
      }
    ]

    const dataSource = [
      {id:"1", username:"root", password:"root", age:"18"},
      {id:"2", username:"woow", password:"woow", age:"20"}
    ]

    const rowClick = function(data) {
      console.log(JSON.stringify(data))
    }
    
    const rowDoubleClick = function(data) {
      console.log(JSON.stringify(data))
    }

    return {
      columns,
      dataSource,
      selectedKeys,
      checkbox,
      defaultToolbar,
      rowClick,
      rowDoubleClick
    }
  }
}
</script>

:::

::: title Table 属性
:::

::: table

| 属性                 | 描述                          | 类型 | 默认值 | 可选值         |
| -------------------- | ----------------------------- | ---- | ------ | -------------- |
| columns              | 列配置 - [更多](#tableColumn) | --   | --     | --             |
| dataSource           | 数据源                        | --   | --     | --             |
| checkbox             | 开启复选框                    | --   | --     | --             |
| id                   | 主键                          | --   | --     | --             |
| v-model:selectedKeys | 选中项                        | --   | --     | --             |
| default-toolbar      | 工具栏                        | --   | --     | --             |
| size                 | 尺寸                          | --   | --     | `lg` `md` `sm` |

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

| 插槽       | 描述       | 默认 |
| ---------- | ---------- | ---- |
| title      | 列标题     | --   |
| key        | 数据字段   | --   |
| customSlot | 自定义插槽 | --   |
| width      | 宽度       | --   |

:::

::: comment
:::
