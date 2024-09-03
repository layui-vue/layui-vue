<template>
  <div class="lay-autocomplete">
    <lay-dropdown
      ref="dropdownRef"
      :disabled="disabled"
      :autoFitWidth="autoFitWidth"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
      :teleportProps="teleportProps"
    >
      <lay-input
        :name="name"
        :size="size"
        :model-value="innerValue"
        :allow-clear="allowClear"
        :disabled="disabled"
        :placeholder="placeholder"
        @click="clickHandler"
        @blur="blurHandler"
        @focus="focusHandler"
        @input="inputHandler"
        @clear="clearHandler"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
      >
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix"></slot>
        </template>
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix"></slot>
        </template>
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-if="$slots.append" #append>
          <slot name="append"></slot>
        </template>
      </lay-input>
      <template #content>
        <template v-if="loading">
          <div class="lay-autocomplete-loading">
            <lay-icon
              type="layui-icon-loading"
              class="layui-anim layui-anim-rotate layui-anim-loop"
            ></lay-icon>
          </div>
        </template>
        <template v-else>
          <lay-dropdown-menu class="lay-autocomplete-content">
            <template v-if="innerOptions.length">
              <lay-dropdown-menu-item
                v-for="(option, index) in innerOptions"
                :key="option"
                @click="clickOptions(option)"
                :class="[
                  'lay-autocomplete-option',
                  {
                    selected: selectedIndex == index,
                    equals: innerValue == option[replaceFields.value],
                  },
                ]"
              >
                <slot name="default" :option="option">
                  {{ option.value }}
                </slot>
              </lay-dropdown-menu-item>
            </template>
          </lay-dropdown-menu>
        </template>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts" setup>
import type { InputEmits } from "../input/interface";
import type { DropdownTeleportProps } from "../dropdown/interface";

import { ref, watch, onMounted, onUnmounted, nextTick, StyleValue } from "vue";
import LayDropdown from "../dropdown/index.vue";
import LayDropdownMenu from "../dropdownMenu/index.vue";
import LayDropdownMenuItem from "../dropdownMenuItem/index.vue";
import LayInput from "../input/index.vue";
import { LayIcon } from "@layui/icons-vue";
import "./index.less";

export type AutocompleteSize = "lg" | "md" | "sm" | "xs";

export interface AutocompleteProps {
  modelValue: string;
  disabled?: boolean;
  fetchSuggestions: Function;
  placeholder?: string;
  allowClear?: boolean;
  name?: string;
  autoFitWidth?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  replaceFields?: { value: string };
  size?: AutocompleteSize;
  teleportProps?: DropdownTeleportProps;
}

defineOptions({
  name: "LayAutocomplete",
});

const props = withDefaults(defineProps<AutocompleteProps>(), {
  autoFitWidth: true,
  replaceFields: () => {
    return {
      value: "value",
    };
  },
});

interface AutocompleteEmits extends InputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "select", option: any): void;
}

const emits = defineEmits<AutocompleteEmits>();

const isFocus = ref(false);
const loading = ref(false);
const innerValue = ref(props.modelValue);
const innerOptions = ref<any[]>([]);
const selectedIndex = ref(-1);
const composing = ref(false);
const dropdownRef = ref();

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  inputHandler((eventParam.target as HTMLInputElement).value);
};

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue;
  }
);

/**
 * 搜索逻辑
 *
 * 准备: 开启 dropdown, 开启加载
 * 核心: 回调 fetchSuggestions 方法，更新 innerOptions 内容
 * 完成：赋值 loading 为 false 值
 */
const inputHandler = function (value: string) {
  emits("input", value);
  if (!composing.value) {
    loading.value = true;
    dropdownRef.value.show();
    emits("update:modelValue", value);
    var promise = props.fetchSuggestions(value);
    // 如果 promise = undefined 说明不需要等待结果，立即关闭
    if (promise === undefined) {
      innerOptions.value = [];
      loading.value = false;
    } else {
      promise.then((suggestions: any[]) => {
        innerOptions.value = suggestions || [];
        loading.value = false;
      });
    }
  }
};

/**
 * 清空操作
 *
 * 该事件由 input 组件 clear 操作触发。
 *
 * 备注: 清空输入值的同时，需要考虑到 options 的重置
 */
const clearHandler = function () {
  emits("update:modelValue", "");
  emits("clear");
  if (innerOptions.value.length > 0) {
    innerOptions.value = [];
  }
};

/**
 * 根据 fetchSuggestions 结果，判定
 * dropdownRef 是否需要隐藏
 */
watch(innerOptions, () => {
  if (innerOptions.value.length === 0) {
    dropdownRef.value.hide();
  }
});

/**
 * 兼容点击 input 时不展示 dropdown.
 * 仅在 @input 触发时展示
 */
const clickHandler = function (e: Event) {
  e.stopImmediatePropagation();
  nextTick(() => {
    dropdownRef.value.hide();
  });
};

/**
 * 手动点击 option 触发事件
 *
 * @param option 选中项
 */
const clickOptions = function (option: any) {
  innerValue.value = option[props.replaceFields.value];
  emits("update:modelValue", option.value);
  emits("select", option);
};

/**
 * 维护 isFocus 状态，确保键盘操作只有 isFocus 为 true 时触发
 */
const focusHandler = function (event: FocusEvent) {
  isFocus.value = true;
  emits("focus", event);
};

/**
 * 维护 isFocus 状态，确保键盘操作只有 isFocus 为 true 时触发
 */
const blurHandler = function (event: FocusEvent) {
  isFocus.value = false;
  emits("blur", event);
};

/**
 * selectIndex 索引计算逻辑，保证在 innerValue 与 innerOptions
 * 改变时，缺省选项落在合适的 index 上。
 */
watch([innerValue, innerOptions], () => {
  let isEquals = false;
  if (innerValue.value != undefined && innerValue.value != "") {
    innerOptions.value.forEach((option, index) => {
      if (innerValue.value === option[props.replaceFields.value]) {
        selectedIndex.value = index;
        isEquals = true;
      }
    });
  }
  if (isEquals === false) {
    selectedIndex.value = -1;
  }
});

const handleKeyUp = (e: KeyboardEvent) => {
  if (isFocus.value === true) {
    if (e.key === "ArrowDown") {
      if (selectedIndex.value <= innerOptions.value.length - 2) {
        selectedIndex.value++;
      }
    }
    if (e.key === "ArrowUp") {
      if (selectedIndex.value > 0) {
        selectedIndex.value--;
      }
    }
    if (e.key === "Enter") {
      if (selectedIndex.value != -1) {
        const option = innerOptions.value[selectedIndex.value];
        innerValue.value = option[props.replaceFields.value];
        dropdownRef.value.hide();
        emits("update:modelValue", option.value);
        emits("select", option);
      }
    }
  }
};

// /**
//  * 监听 keyup 事件
//  *
//  * @remark ArrowDown 向下操作
//  * @remark ArrowUp 向上操作
//  * @remark Enter 回车操作
//  */
onMounted(() => {
  document.addEventListener("keyup", handleKeyUp);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyUp);
});
</script>
