<script lang="ts">
export default {
  name: "LayIconPicker",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed, Ref, ref, StyleValue } from "vue";
import { LayIconList as icons, LayIcon } from "@layui/icons-vue";
import LayDropdown from "../dropdown/index.vue";
import LayScroll from "../scroll/index.vue";
import LayInput from "../input/index.vue";

export interface IconPickerProps {
  page?: boolean;
  modelValue?: string;
  disabled?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
}

const props = withDefaults(defineProps<IconPickerProps>(), {
  modelValue: "layui-icon-face-smile",
  disabled: false,
  page: false,
});

const emit = defineEmits(["update:modelValue", "change"]);
const selectedIcon = computed(() => props.modelValue);
const dropdownRef = ref<any>(null);
const openState = ref<boolean>(false);

const selectIcon = function (icon: string): void {
  emit("update:modelValue", icon);
  emit("change", icon);
  dropdownRef.value?.hide();
};

const onClear = function (): void {
  emit("update:modelValue", "");
};

const hasContent = computed(() => {
  return props.modelValue != null && props.modelValue != "";
});

const icones: Ref = ref([]);
const total: Ref<number> = ref(icons.length);
const totalPage: Ref<number> = ref(total.value / 12);
const currentPage: Ref<number> = ref(1);

if (props.page) {
  icones.value = icons.slice(0, 12);
} else {
  icones.value = icons;
}

const next = () => {
  if (currentPage.value === totalPage.value) {
    return;
  }
  currentPage.value = currentPage.value + 1;
  const start = (currentPage.value - 1) * 12;
  const end = start + 12;
  icones.value = icons.slice(start, end);
};

const prev = () => {
  if (currentPage.value === 1) {
    return;
  }
  currentPage.value = currentPage.value - 1;
  const start = (currentPage.value - 1) * 12;
  const end = start + 12;
  icones.value = icons.slice(start, end);
};

const clear = () => {
  const start = (currentPage.value - 1) * 12;
  const end = start + 12;
  if (props.page) {
    icones.value = icons.slice(start, end);
    total.value = icons.length;
    totalPage.value = Math.ceil(icons.length / 12);
  } else {
    icones.value = icons;
  }
};

const search = (e: any) => {
  currentPage.value = 1;
  const start = (currentPage.value - 1) * 12;
  const end = start + 12;
  const text = e;
  if (text) {
    if (props.page) {
      icones.value = searchList(text, icons).slice(start, end);
      total.value = searchList(text, icons).length;
      totalPage.value = Math.ceil(searchList(text, icons).length / 12);
    } else {
      icones.value = searchList(text, icons);
    }
  } else {
    if (props.page) {
      icones.value = icons.slice(start, end);
      total.value = icons.length;
      totalPage.value = Math.ceil(icons.length / 12);
    } else {
      icones.value = icons;
    }
  }
};

const searchList = (str: string, container: any) => {
  var newList = [];
  var startChar = str.charAt(0);
  var strLen = str.length;
  for (var i = 0; i < container.length; i++) {
    var obj = container[i];
    var isMatch = false;
    for (var p in obj) {
      if (typeof obj[p] == "function") {
        obj[p]();
      } else {
        var curItem = "";
        if (obj[p] != null) {
          curItem = obj[p];
        }
        for (var j = 0; j < curItem.length; j++) {
          if (curItem.charAt(j) == startChar) {
            if (curItem.substring(j).substring(0, strLen) == str) {
              isMatch = true;
              break;
            }
          }
        }
      }
    }
    if (isMatch) {
      newList.push(obj);
    }
  }
  return newList;
};
</script>

<template>
  <lay-dropdown
    ref="dropdownRef"
    :disabled="disabled"
    :contentClass="contentClass"
    :contentStyle="contentStyle"
    @hide="openState = false"
    @show="openState = true"
    updateAtScroll
  >
    <div
      class="layui-inline layui-border-box layui-iconpicker layui-iconpicker-split"
      :class="[
        {
          'layui-iconpicker-disabled': disabled,
          'has-content': hasContent,
          'has-clear': allowClear,
        },
      ]"
    >
      <div class="layui-inline layui-iconpicker-main">
        <i class="layui-inline layui-icon" :class="[selectedIcon]"></i>
      </div>
      <span class="layui-icon-picker-clear">
        <lay-icon type="layui-icon-close-fill" @click.stop="onClear"></lay-icon>
      </span>
      <span class="layui-inline layui-iconpicker-suffix"
        ><i
          class="layui-icon layui-icon-down"
          :class="[openState ? 'transform' : '']"
        ></i
      ></span>
    </div>
    <template #content>
      <div class="layui-iconpicker-view layui-iconpicker-scroll">
        <div v-if="showSearch" class="layui-iconpicker-search">
          <lay-input
            @input="search"
            @clear="clear"
            autocomplete="true"
            :allow-clear="true"
          >
            <template #prefix>
              <i class="layui-icon layui-icon-search"></i>
            </template>
          </lay-input>
        </div>
        <div class="layui-iconpicker-list">
          <lay-scroll style="height: 200px" thumbColor="rgb(238, 238, 238)">
            <ul>
              <li
                v-for="icon in icones"
                :key="icon"
                :class="[selectedIcon === icon.class ? 'layui-this' : '']"
                @click="selectIcon(icon.class)"
              >
                <i class="layui-icon" :class="[icon.class]"></i>
                <p class="layui-elip">
                  {{ icon.name }}
                </p>
              </li>
            </ul>
          </lay-scroll>
        </div>
        <div v-if="page" class="layui-iconpicker-page">
          <div id="layui-laypage-1" class="layui-laypage layui-laypage-default">
            <span class="layui-laypage-count">共 {{ total }} 个</span
            ><a
              href="javascript:;"
              class="layui-laypage-prev"
              :class="[currentPage === 1 ? 'layui-disabled' : '']"
              @click="prev()"
              ><i class="layui-icon layui-icon-left"></i></a
            ><span class="layui-laypage-curr"
              ><em class="layui-laypage-em"></em
              ><em>{{ currentPage }} / {{ totalPage }}</em></span
            ><span class="layui-laypage-spr">…</span
            ><a href="javascript:;" class="layui-laypage-last" title="尾页"
              >14</a
            ><a
              href="javascript:;"
              :class="[currentPage === totalPage ? 'layui-disabled' : '']"
              class="layui-laypage-next"
              @click="next()"
              ><i class="layui-icon layui-icon-right"></i
            ></a>
          </div>
        </div>
      </div>
    </template>
  </lay-dropdown>
</template>
