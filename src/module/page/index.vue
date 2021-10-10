<template>
  <div class="layui-box layui-laypage layui-laypage-default">
    <span class="layui-laypage-count" v-if="showCount">共 {{ total }} 条</span
    ><a
      href="javascript:;"
      class="layui-laypage-prev"
      :class="[currentPage === 1 ? 'layui-disabled' : '']"
      @click="prev()"
      >上一页</a
    >
    <template v-if="showPage">
      <template v-for="index of totalPage" :key="index">
        <span class="layui-laypage-curr" v-if="index === currentPage"
          ><em
            class="layui-laypage-em"
            :class="[theme ? 'layui-bg-' + theme : '']"
          ></em
          ><em>{{ index }}</em></span
        >
        <a href="javascript:;" @click="jump(index)" v-else>
          {{ index }}
        </a>
      </template>
    </template>

    <a
      href="javascript:;"
      class="layui-laypage-next"
      :class="[currentPage === totalPage ? 'layui-disabled' : '']"
      @click="next()"
      >下一页</a
    ><span class="layui-laypage-limits" v-if="showLimit"
      ><select v-model="inlimit">
        <option value="10">10 条/页</option>
        <option value="20">20 条/页</option>
        <option value="30">30 条/页</option>
        <option value="40">40 条/页</option>
        <option value="50">50 条/页</option>
      </select></span
    ><a href="javascript:;" v-if="showRefresh" class="layui-laypage-refresh"
      ><i class="layui-icon layui-icon-refresh"></i></a
    ><span class="layui-laypage-skip" v-if="showSkip"
      >到第<input
        type="number"
        v-model="currentPageShow"
        class="layui-input layui-input-number"
      />页<button type="button" class="layui-laypage-btn" @click="jumpPage()">
        确定
      </button></span
    >
  </div>
</template>
<script setup name="LayPage"></script>
<script setup lang="ts">
import { defineProps, Ref, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    total: number
    limit: number
    theme?: string
    showPage?: boolean
    showSkip?: boolean
    showCount?: boolean
    showLimit?: boolean
    showInput?: boolean
    showRefresh?: boolean
  }>(),
  {
    limit: 10
  }
)

const inlimit = ref(props.limit)
const totalPage = ref(Math.ceil(props.total / inlimit.value))
const currentPage: Ref<number> = ref(1)
const currentPageShow: Ref<number> = ref(currentPage.value)

const emit = defineEmits(['jump'])

const prev = function () {
  if (currentPage.value === 1) {
    return
  }
  currentPage.value--
}

const next = function () {
  if (currentPage.value === totalPage.value) {
    return
  }
  currentPage.value++
}

const jump = function (page: number) {
  currentPage.value = page
}

const jumpPage = function () {
  currentPage.value = currentPageShow.value
}

watch(inlimit, function () {
  currentPage.value = 1
  totalPage.value = Math.ceil(props.total / inlimit.value)
})

watch(currentPage, function () {
  currentPageShow.value = currentPage.value
  emit('jump', {current: currentPage.value})
})

</script>
