::: demo

<template>
  <lay-table :columns="columns" :dataSource="dataSource">
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
    <template v-slot:operator="{ data }">
      <lay-button type="primary">修改</lay-button>
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