::: demo

<template>
  <lay-table :columns="columns" :dataSource="dataSource">
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
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
  <lay-table :columns="columns" :dataSource="dataSource">
    <template v-slot:username="{ data }"> {{data.username}} </template>
    <template v-slot:password="{ data }"> {{data.password}} </template>
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