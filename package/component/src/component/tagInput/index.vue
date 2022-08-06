<script lang="ts">
export default {
  name: "LayInputTag",
};
</script>
<script lang="ts" setup>
import "./index.less";
import Tag from "./Tag.vue";
import LayToopTip from "../tooltip/index.vue";
import { onMounted, shallowRef, ref, watch, computed } from "vue";

export interface TagData {
  value?: string | number;
  label?: string;
  closable?: boolean;
  [other: string]: any;
}

export interface LayInputTagProps {
  modelValue?: TagData[];
  inputValue?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  allowClear?: boolean;
  max?: number;
  minCollapsedNum?: number;
  collapseTagsTooltip?: boolean;
  size?: "md" | "sm" | "xs";
}

const props = withDefaults(defineProps<LayInputTagProps>(), {
  disabled: false,
  placeholder: "",
  readonly: false,
  allowClear: true,
  minCollapsedNum: 10,
  //max:3
});

const emit = defineEmits(["update:modelValue", "update:inputValue"]);

const mirrorRef = shallowRef<HTMLElement | undefined>(undefined);
const inputRef = shallowRef<HTMLElement | undefined>(undefined);

const tagData = ref<TagData[]>(props.modelValue ?? []);
const inputValue = ref<string>();
const oldInputValue = ref<string>();

const computedTagData = computed(() => {
  return props.minCollapsedNum
    ? tagData.value?.slice(0, props.minCollapsedNum)
    : tagData.value;
});

const collapsedTagData = computed(() => {
  return props.minCollapsedNum && tagData.value?.length > props.minCollapsedNum
    ? tagData.value?.slice(props.minCollapsedNum)
    : [];
});

const handleInputEnter = (e: KeyboardEvent) => {
  e.preventDefault();
  const valueStr = inputValue.value ? String(inputValue.value).trim() : "";
  if (!valueStr || !tagData.value) return;
  const isLimit = props.max && tagData.value?.length >= props.max;
  if (!isLimit) {
    tagData.value =
      tagData.value instanceof Array
        ? tagData.value.concat(String(valueStr))
        : [valueStr];
    inputValue.value = "";
  }
};

const handlerInputBackspaceKeyUp = (e: KeyboardEvent) => {
  if (!tagData.value || !tagData.value.length) return;
  if (!oldInputValue.value && ["Backspace", "Delete"].includes(e.code)) {
    tagData.value = tagData.value.slice(0, -1);
  }
  oldInputValue.value = inputValue.value;
};

const handlerClearClick = (e: MouseEvent) => {
  tagData.value = [];
};

const handlerClose = (index: number) => {
  if (!tagData.value) return;
  const arr = [...tagData.value];
  arr.splice(index, 1);
  tagData.value = arr;
};

const handlerFocus = (e: MouseEvent) => {
  (
    (e.target as HTMLElement).querySelector(".layui-input") as HTMLInputElement
  )?.focus();
};

watch(tagData, (val) => {
  emit("update:modelValue", val);
});

watch(inputValue, (val) => {
  emit("update:inputValue", val);
});

onMounted(() => {});
</script>
<template>
  <lay-input
    class="layui-input-tag"
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    @keydown.enter="handleInputEnter"
    @keyup="handlerInputBackspaceKeyUp"
    @click="handlerFocus"
  >
    <template #prefix>
      <template
        v-for="(item, index) of computedTagData"
        :key="`${item}-${index}`"
      >
        <Tag :closable="!readonly" @close="handlerClose(index)">
          {{ item }}
        </Tag>
      </template>
      <template v-if="computedTagData?.length != tagData?.length">
        <LayToopTip :isDark="false">
          <Tag key="more" :closable="false"
            >+{{ tagData?.length - computedTagData?.length }}...</Tag
          >
          <template #content>
            <div class="layui-input-tag-collapsed-panel">
              <template
                v-for="(item, index) of tagData"
                :key="`${item}-${index}`"
              >
                <Tag
                  v-if="index >= minCollapsedNum"
                  :closable="!readonly"
                  @close="handlerClose(index)"
                >
                  {{ item }}
                </Tag>
              </template>
            </div>
          </template>
        </LayToopTip>
      </template>
    </template>
    <template #suffix v-if="allowClear && tagData?.length">
      <lay-icon type="layui-icon-close-fill" @click.stop="handlerClearClick" />
    </template>
  </lay-input>
</template>
