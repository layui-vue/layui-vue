::: demo

<template>
  <lay-tree
    :data="data"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue' 

 const data = ref([{
    title: '江西'
    ,id: 1
    ,children: [{
      title: '南昌'
      ,id: 1000
      ,children: [{
        title: '青山湖区'
        ,id: 10001
      },{
        title: '高新区'
        ,id: 10002
      }]
    },{
      title: '九江'
      ,id: 1001
    },{
      title: '赣州'
      ,id: 1002
    }]
  },{
    title: '广西'
    ,id: 2
    ,children: [{
      title: '南宁'
      ,id: 2000
    },{
      title: '桂林'
      ,id: 2001
    }]
  },{
    title: '陕西'
    ,id: 3
    ,children: [{
      title: '西安'
      ,id: 3000
    },{
      title: '延安'
      ,id: 3001
    }]
  }])
</script>

:::
