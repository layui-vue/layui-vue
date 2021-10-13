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

::: demo

<template>
  {{selectedKeys}}
  <lay-table :columns="columns" id="id" :dataSource="dataSource" default-toolbar="true" v-model:selectedKeys="selectedKeys" @changeSelectedKeys="changeSelectedKeys" checkbox="true">
    <template v-slot:toolbar>
      <lay-button>新增</lay-button>
      <lay-button>删除</lay-button>
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
      selectedKeys
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
| default-toolbar | 开启工具栏 | --  |
