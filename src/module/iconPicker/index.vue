<template>
  <lay-dropdown>
    <div
      class="
        layui-inline layui-border-box layui-iconpicker layui-iconpicker-split
      "
    >
      <div class="layui-inline layui-iconpicker-main">
        <i class="layui-inline layui-icon" :class="[selectedIcon]"></i>
      </div>
      <span class="layui-inline layui-iconpicker-suffix"
        ><i class="layui-icon layui-icon-down layui-anim"></i
      ></span>
    </div>
    <template #content>
      <div class="layui-iconpicker-view layui-iconpicker-scroll">
        <div class="layui-iconpicker-search">
          <div
            class="layui-form layui-input-wrap layui-input-wrap-prefix"
            lay-filter="LAY-ICON-FORM-DF-3"
          >
            <div class="layui-input-prefix">
              <i class="layui-icon layui-icon-search"></i>
            </div>
            <input
              type="text"
              value=""
              placeholder="search"
              autocomplete="off"
              class="layui-input"
              lay-filter="LAY-ICON-INPUT-3"
              lay-affix="clear"
            />
            <div class="layui-input-suffix layui-input-affix-event layui-hide">
              <i class="layui-icon layui-icon-clear"></i>
            </div>
          </div>
        </div>
        <div class="layui-iconpicker-list">
          <ul>
            <li
              v-for="icon in icons"
              :key="icon"
              @click="selectIcon(icon.class)"
              :class="[selectedIcon === icon.class ? 'layui-this' : '']"
            >
              <i class="layui-icon" :class="[icon.class]"></i>
              <p class="layui-elip">{{ icon.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </lay-dropdown>
</template>

<script setup name="LayIconPicker" lang="ts">
import { defineProps, Ref, ref } from 'vue'
import icons from '../resource/icons'

const props =
  defineProps<{
    modelValue?: string
  }>()

const emit = defineEmits(['update:modelValue'])

const selectedIcon: Ref<String> = ref(props.modelValue as String)

const selectIcon = function (icon: String) {
  emit('update:modelValue', icon)
  selectedIcon.value = icon
}
</script>