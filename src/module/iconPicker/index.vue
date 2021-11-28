<template>
  <lay-dropdown>
    <div
      class="
        layui-inline layui-border-box layui-iconpicker layui-iconpicker-split
      "
    >
      <div class="layui-inline layui-iconpicker-main">
        <i class="layui-inline layui-icon" :class="[selectedIcon]" />
      </div>
      <span class="layui-inline layui-iconpicker-suffix"
        ><i class="layui-icon layui-icon-down layui-anim"
      /></span>
    </div>
    <template #content>
      <div class="layui-iconpicker-view layui-iconpicker-scroll">
        <div v-if="showSearch" class="layui-iconpicker-search">
          <div class="layui-form layui-input-wrap layui-input-wrap-prefix">
            <div class="layui-input-prefix">
              <i class="layui-icon layui-icon-search" />
            </div>
            <input
              type="text"
              value=""
              placeholder="search"
              autocomplete="off"
              class="layui-input"
              lay-affix="clear"
              @input="search"
            />
            <div class="layui-input-suffix layui-input-affix-event layui-hide">
              <i class="layui-icon layui-icon-clear" />
            </div>
          </div>
        </div>
        <div class="layui-iconpicker-list">
          <ul>
            <li
              v-for="icon in icones"
              :key="icon"
              :class="[selectedIcon === icon.class ? 'layui-this' : '']"
              @click="selectIcon(icon.class)"
            >
              <i class="layui-icon" :class="[icon.class]" />
              <p class="layui-elip">
                {{ icon.name }}
              </p>
            </li>
          </ul>
        </div>
        <div v-if="page" class="layui-iconpicker-page">
          <div
            id="layui-laypage-1"
            class="layui-box layui-laypage layui-laypage-default"
          >
            <span class="layui-laypage-count">共 {{ total }} 个</span
            ><a
              href="javascript:;"
              class="layui-laypage-prev"
              :class="[currentPage === 1 ? 'layui-disabled' : '']"
              @click="prev()"
              ><i class="layui-icon layui-icon-left" /></a
            ><span class="layui-laypage-curr"
              ><em class="layui-laypage-em" /><em
                >{{ currentPage }} / {{ totalPage }}</em
              ></span
            ><span class="layui-laypage-spr">…</span
            ><a href="javascript:;" class="layui-laypage-last" title="尾页"
              >14</a
            ><a
              href="javascript:;"
              :class="[currentPage === totalPage ? 'layui-disabled' : '']"
              class="layui-laypage-next"
              @click="next()"
              ><i class="layui-icon layui-icon-right"
            /></a>
          </div>
        </div>
      </div>
    </template>
  </lay-dropdown>
</template>

<script setup name="LayIconPicker" lang="ts">
import { defineProps, Ref, ref } from 'vue'
import { LayIconList as icons } from "@layui/icons-vue"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    page?: boolean
    showSearch?: boolean
  }>(),
  {
    modelValue: 'layui-icon-face-smile',
    page: false,
  }
)

const emit = defineEmits(['update:modelValue'])

const selectedIcon: Ref<string> = ref(props.modelValue as string)

const selectIcon = function (icon: string) {
  emit('update:modelValue', icon)
  selectedIcon.value = icon
}

const icones: Ref = ref([])

const total = ref(icons.length)
const totalPage = ref(total.value / 12)
const currentPage: Ref = ref(1)

if (props.page) {
  icones.value = icons.slice(0, 12)
} else {
  icones.value = icons
}

const next = function () {
  if (currentPage.value === totalPage.value) {
    return
  }
  currentPage.value = currentPage.value + 1
  const start = (currentPage.value - 1) * 12
  const end = start + 12
  icones.value = icons.slice(start, end)
}

const prev = function () {
  if (currentPage.value === 1) {
    return
  }
  currentPage.value = currentPage.value - 1
  const start = (currentPage.value - 1) * 12
  const end = start + 12
  icones.value = icons.slice(start, end)
}

const search = function (e: any) {
  var text = e.target.value
  currentPage.value = 1
  const start = (currentPage.value - 1) * 12
  const end = start + 12
  if (text === '') {
    if (props.page) {
      icones.value = icons.slice(start, end)
      total.value = icons.length
      totalPage.value = Math.ceil(icons.length / 12)
    } else {
      icones.value = icons
    }
  } else {
    if (props.page) {
      icones.value = searchList(text, icons).slice(start, end)
      total.value = searchList(text, icons).length
      totalPage.value = Math.ceil(searchList(text, icons).length / 12)
    } else {
      icones.value = searchList(text, icons)
    }
  }
}

const searchList = function (str: string, container: any) {
  var newList = []
  var startChar = str.charAt(0)
  var strLen = str.length
  for (var i = 0; i < container.length; i++) {
    var obj = container[i]
    var isMatch = false
    for (var p in obj) {
      if (typeof obj[p] == 'function') {
        obj[p]()
      } else {
        var curItem = ''
        if (obj[p] != null) {
          curItem = obj[p]
        }
        for (var j = 0; j < curItem.length; j++) {
          if (curItem.charAt(j) == startChar) {
            if (curItem.substring(j).substring(0, strLen) == str) {
              isMatch = true
              break
            }
          }
        }
      }
    }
    if (isMatch) {
      newList.push(obj)
    }
  }
  return newList
}
</script>
