::: demo

<template>
  <lay-tree
    :data="data"
  >
  </lay-tree>
</template>i

<script setup>
import { ref } from 'vue'

const data = ref([{
    title: '一级1'
    ,id: 1
    ,field: 'name1'
    ,checked: true
    ,spread: true
    ,children: [{
      title: '二级1-1 可允许跳转'
      ,id: 3
      ,field: 'name11'
      ,href: 'https://www.layui.com/'
      ,children: [{
        title: '三级1-1-3'
        ,id: 23
        ,field: ''
        ,children: [{
          title: '四级1-1-3-1'
          ,id: 24
          ,field: ''
          ,children: [{
            title: '五级1-1-3-1-1'
            ,id: 30
            ,field: ''
          },{
            title: '五级1-1-3-1-2'
            ,id: 31
            ,field: ''
          }]
        }]
      },{
        title: '三级1-1-1'
        ,id: 7
        ,field: ''
        ,children: [{
          title: '四级1-1-1-1 可允许跳转'
          ,id: 15
          ,field: ''
          ,href: 'https://www.layui.com/doc/'
        }]
      },{
        title: '三级1-1-2'
        ,id: 8
        ,field: ''
        ,children: [{
          title: '四级1-1-2-1'
          ,id: 32
          ,field: ''
        }]
      }]
    },{
      title: '二级1-2'
      ,id: 4
      ,spread: true
      ,children: [{
        title: '三级1-2-1'
        ,id: 9
        ,field: ''
        ,disabled: true
      },{
        title: '三级1-2-2'
        ,id: 10
        ,field: ''
      }]
    },{
      title: '二级1-3'
      ,id: 20
      ,field: ''
      ,children: [{
        title: '三级1-3-1'
        ,id: 21
        ,field: ''
      },{
        title: '三级1-3-2'
        ,id: 22
        ,field: ''
      }]
    }]
  },{
    title: '一级2'
    ,id: 2
    ,field: ''
    ,spread: true
    ,children: [{
      title: '二级2-1'
      ,id: 5
      ,field: ''
      ,spread: true
      ,children: [{
        title: '三级2-1-1'
        ,id: 11
        ,field: ''
      },{
        title: '三级2-1-2'
        ,id: 12
        ,field: ''
      }]
    },{
      title: '二级2-2'
      ,id: 6
      ,field: ''
      ,children: [{
        title: '三级2-2-1'
        ,id: 13
        ,field: ''
      },{
        title: '三级2-2-2'
        ,id: 14
        ,field: ''
        ,disabled: true
      }]
    }]
  },{
    title: '一级3'
    ,id: 16
    ,field: ''
    ,children: [{
      title: '二级3-1'
      ,id: 17
      ,field: ''
      ,fixed: true
      ,children: [{
        title: '三级3-1-1'
        ,id: 18
        ,field: ''
      },{
        title: '三级3-1-2'
        ,id: 19
        ,field: ''
      }]
    },{
      title: '二级3-2'
      ,id: 27
      ,field: ''
      ,children: [{
        title: '三级3-2-1'
        ,id: 28
        ,field: ''
      },{
        title: '三级3-2-2'
        ,id: 29
        ,field: ''
      }]
    }]
  }])
</script>

:::
