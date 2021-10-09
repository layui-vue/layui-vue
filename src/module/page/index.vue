<template>
  <div class="layui-box layui-laypage layui-laypage-default">
    <span class="layui-laypage-count">共 {{ total }} 条</span
    ><a href="javascript:;" class="layui-laypage-prev" :class="[currentPage === 1 ? 'layui-disabled':'']" @click="prev()"
      >上一页</a
    >
    <template v-for="index of totalPage" :key="index">
      <span class="layui-laypage-curr" v-if="index === currentPage"
        ><em class="layui-laypage-em"></em><em>{{ index }}</em></span
      >
      <a href="javascript:;" @click="jump(index)" v-else>
        {{ index }}
      </a>
    </template>

    <a href="javascript:;" class="layui-laypage-next" :class="[currentPage === totalPage ? 'layui-disabled':'']" @click="next()">下一页</a
    ><span class="layui-laypage-limits"
      ><select v-model="inlimit">
        <option value="10" >10 条/页</option>
        <option value="20" >20 条/页</option>
        <option value="30" >30 条/页</option>
        <option value="40" >40 条/页</option>
        <option value="50" >50 条/页</option>
      </select></span
    ><a href="javascript:;" data-page="1" class="layui-laypage-refresh"
      ><i class="layui-icon layui-icon-refresh"></i></a
    ><span class="layui-laypage-skip"
      >到第<input type="text" v-model="currentPageShow" class="layui-input" />页<button
        type="button"
        class="layui-laypage-btn"
        @click="jumpPage()"
      >
        确定
      </button></span>
  </div>
</template>
<script setup name="LayPage"></script>
<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

const props =
  defineProps<{
    total: number
    limit: number
  }>()

const inlimit= ref(props.limit)
const totalPage = ref(Math.ceil(props.total / inlimit.value)) 
const currentPage = ref(1)
const currentPageShow = ref(currentPage.value)

const prev = function () {
  if(currentPage.value === 1) {
    return
  }
  currentPage.value--
}

const next = function () {
  if(currentPage.value === totalPage.value) {
    return
  }
  currentPage.value++
}

const jump = function (page: number) {
  currentPage.value = page
}

const jumpPage = function() {
  currentPage.value = currentPageShow.value
}

watch(inlimit, function() {
  currentPage.value = 1
  totalPage.value = Math.ceil(props.total / inlimit.value)
})

watch(currentPage, function() {
  currentPageShow.value = currentPage.value
})



</script>
