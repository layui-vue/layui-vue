::: field 基础使用
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

::: field 不同尺寸
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

::: field 开启分页
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

::: field 完整表格
::: 

::: demo

<template>
  <lay-table :columns="columns" id="id" :dataSource="dataSource" v-model:selectedKeys="selectedKeys"  :checkbox="checkbox" :default-toolbar="defaultToolbar">
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
      {id:"1", username:"root", password:"root", age:"18"},
      {id:"2", username:"woow", password:"woow", age:"20"}
    ]

    return {
      columns,
      dataSource,
      selectedKeys,
      checkbox,
      defaultToolbar
    }
  }
}
</script>

:::

::: field table attributes

:::

|                 |            |     |
| --------------- | ---------- | --- |
| columns         | 列配置      | --  |
| dataSource      | 数据源      | --  |
| checkbox        | 开启复现框  | --  |
| id              | 主键       | --  |
| selectedKeys ( v-model )    | 选中项     | --  |
| default-toolbar | 开启工具栏 | `lg` `md` `sm` |
| size | 尺寸 | --  |

::: field table slots

:::

|                 |             |     |
| --------------- | ----------- | --- |
| toolbar         | 自定义工具栏 | --  |