<template>
  <div
    class="layui-box layui-laypage layui-laypage-default"
    id="layui-laypage-10"
  >
    <span class="layui-laypage-count">共 {{ total }} 条</span
    ><a
      href="javascript:;"
      class="layui-laypage-prev layui-disabled"
      @click="prev"
      >上一页</a
    ><span class="layui-laypage-curr"
      ><em class="layui-laypage-em"></em><em>1</em></span
    >
    <a href="javascript:;" data-page="5">5</a>
    <span class="layui-laypage-spr">…</span
    ><a
      href="javascript:;"
      class="layui-laypage-last"
      title="尾页"
      data-page="10"
      >10</a
    ><a href="javascript:;" class="layui-laypage-next" @click="next()">下一页</a
    ><span class="layui-laypage-limits"
      ><select lay-ignore="">
        <option value="10" selected="">{{ limit }} 条/页</option>
        <option value="20">20 条/页</option>
        <option value="30">30 条/页</option>
        <option value="40">40 条/页</option>
        <option value="50">50 条/页</option>
      </select></span
    ><a href="javascript:;" data-page="1" class="layui-laypage-refresh"
      ><i class="layui-icon layui-icon-refresh"></i></a
    ><span class="layui-laypage-skip"
      >到第<input type="text" min="1" value="1" class="layui-input" />页<button
        type="button"
        class="layui-laypage-btn"
      >
        确定
      </button></span
    >
  </div>
</template>

<script setup name="LayPage" lang="ts">
import { defineProps, ref } from 'vue'

const props =
  defineProps<{
    total: number
    limit: number
  }>()

const current = ref(1)

const prev = function () {
  current.value--
}

const next = function () {
  current.value--
}
</script>
