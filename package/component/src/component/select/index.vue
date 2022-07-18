<script lang="ts">
export default {
  name: "LaySelect",
};
</script>

<script setup lang="ts">
import "./index.less";
import LaySelectOption from "../selectOption/index.vue";
import { provide, ref, watch, computed, Ref, nextTick, shallowRef } from "vue";
import LayBadge from "../badge/index.vue";
import LayInput from "../input/index.vue";
import LayScroll from "../scroll/index.vue";
import { onClickOutside } from "@vueuse/core";
import { SelectItem } from "../../types";

export interface LaySelectProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  showEmpty?: boolean;
  emptyMessage?: string;
  modelValue?: any;
  multiple?: boolean;
  create?: boolean;
  items?: {
    label: string;
    value: any;
    key: string;
    disabled: boolean;
    keyword: string;
  }[];
}

const selectRef = shallowRef<undefined | HTMLElement>(undefined);
const multipleSearchInputRef = shallowRef<HTMLElement | undefined>(undefined);

onClickOutside(selectRef, (event: Event) => {
  openState.value = false;
});

const props = withDefaults(defineProps<LaySelectProps>(), {
  modelValue: null,
  placeholder: "请选择",
  disabled: false,
  showEmpty: true,
  multiple: false,
  create: false,
});

const openState = ref(false);

const open = function () {
  if (props.disabled) {
    openState.value = false;
    return;
  }
  openState.value = !openState.value;
  nextTick(() => {
    multipleSearchInputRef.value?.querySelector("input")?.focus();
  });
};

const emit = defineEmits(["update:modelValue", "change", "search", "create"]);

const selectItem = ref<SelectItem>({
  value: !props.multiple
    ? props.modelValue
    : props.modelValue
    ? ([] as any[]).concat(props.modelValue)
    : [],
  label: props.multiple ? [] : null,
  multiple: props.multiple,
} as SelectItem);

watch(
  () => selectItem.value.value,
  (val) => {
    emit("update:modelValue", val);
    emit("change", val);
  },
  { deep: true }
);

watch(props, () => {
  let value = props.modelValue;
  if (props.multiple) {
    if (Array.isArray(value)) {
      selectItem.value.value = value;
      selectItem.value.label = value.map((o) => ItemsMap.value[o]);
    } else {
      console.error("多选时请传入数组值");
    }
  } else {
    selectItem.value.value = value;
    selectItem.value.label = ItemsMap.value[value] || "";
  }
});

const txt = ref("");
const disabledItemMap: { [key: string | number]: boolean } = {};
const input = ref(false);
const value = computed({
  set(v: any) {
    txt.value = v;
    emit("search", v);
  },
  get() {
    if (input.value) {
      return txt.value;
    }
    return !selectItem.value.multiple && selectItem.value.value !== null
      ? selectItem.value.label
      : null;
  },
});

const selectItemHandle = async function (
  _selectItem: SelectItem,
  isChecked?: boolean
) {
  if (!props.multiple) {
    openState.value = false;
  }
  txt.value = "";
  disabledItemMap[_selectItem.value as string | number] =
    _selectItem.disabled as boolean;
  if (typeof isChecked !== "boolean") {
    props.multiple
      ? (selectItem.value.label as any[]).push(_selectItem.label)
      : (selectItem.value.label = _selectItem.label);
    return;
  }
  let values = selectItem.value.value;
  if (props.multiple && Array.isArray(values)) {
    const _values = values as any[];
    const _labels = selectItem.value.label as any[];
    if (isChecked) {
      _values.push(_selectItem.value);
      _labels.push(_selectItem.label);
    } else {
      _values.splice(_values.indexOf(_selectItem.value), 1);
      _labels.splice(_labels.indexOf(_selectItem.label), 1);
    }
    selectItem.value.value = _values;
    selectItem.value.label = _labels;
  } else {
    selectItem.value.value = _selectItem.value;
    selectItem.value.label = _selectItem.label;
  }
};

const removeItemHandle = function (e: MouseEvent, _selectItem: SelectItem) {
  e.stopPropagation();
  selectItemHandle(_selectItem, false);
};
const ItemsMap: Ref<{ [index: string]: string }> = ref({});
const selectItemPush = function (p: SelectItem) {
  if (p.value !== null) {
    //@ts-ignore
    ItemsMap.value[p.value] = p.label;
  }
};

provide("selectItemHandle", selectItemHandle);
provide("selectItemPush", selectItemPush);
provide("selectItem", selectItem);
provide("keyword", txt);
</script>

<template>
  <div
    ref="selectRef"
    class="layui-unselect layui-form-select"
    :class="{ 'layui-form-selected': openState }"
  >
    <div class="layui-select-title" @click="open">
      <input
        type="text"
        :placeholder="
          selectItem.value !== null &&
          Array.isArray(selectItem.value) &&
          selectItem.value.length > 0
            ? ''
            : emptyMessage ?? placeholder
        "
        :disabled="disabled"
        v-model="value"
        @input="input = true"
        @blur="input = false"
        :name="name"
        :class="[
          'layui-input',
          'layui-unselect',
          { 'layui-disabled': disabled },
        ]"
      />
      <i :class="['layui-edge', { 'layui-disabled': disabled }]"></i>
      <!-- 多选 -->
      <div
        v-if="selectItem.multiple && Array.isArray(selectItem.label)"
        class="layui-multiple-select-row"
      >
        <div class="layui-multiple-select-badge">
          <template v-for="(item, index) in selectItem.label" :key="index">
            <lay-badge theme="gray">
              <span>{{ item }}</span>
              <i
                :class="['layui-icon', { 'layui-icon-close': true }]"
                v-if="
                  !disabled &&
                  !(
                    Array.isArray(selectItem.value) &&
                    selectItem.value.length > 0 &&
                    disabledItemMap[selectItem.value[index]]
                  )
                "
                @click="
                  removeItemHandle($event, {
                    label: item,
                    value: Array.isArray(selectItem.value)
                      ? selectItem.value[index]
                      : null,
                  })
                "
              ></i>
            </lay-badge>
          </template>
        </div>
      </div>
    </div>

    <!-- 下拉内容 -->
    <dl class="layui-anim layui-anim-upbit">
      <div ref="multipleSearchInputRef" class="layui-multiple-select-input">
        <lay-input
          v-if="multiple"
          v-model="value"
          @input="input = true"
          @blur="input = false"
          :placeholder="placeholder"
          prefix-icon="layui-icon-search"
          allow-clear
        >
        </lay-input>
      </div>
      <template v-if="!multiple && showEmpty && !props.create">
        <lay-select-option :value="null" :label="emptyMessage ?? placeholder" />
      </template>
      <template v-if="props.create">
        <dd @click="emit('create', txt)">{{ txt }}</dd>
      </template>
      <template v-if="props.items">
        <lay-select-option
          v-for="(v, k) in props.items"
          :key="k"
          :value="v.value"
          :label="v.label"
          :disabled="v.disabled"
          :keyword="v.keyword"
        ></lay-select-option>
      </template>
      <slot></slot>
    </dl>
  </div>
</template>
