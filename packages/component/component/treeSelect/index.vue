<script lang="ts" setup>
import type {
  TagInputData,
} from "@layui/component/component/tagInput/interface";
import type {
  OriginalTreeData,
  ReplaceFieldsOptions,
  TreeProps,
} from "@layui/component/component/tree/interface";
import type {
  TreeSelectEmits as _TreeSelectEmits,
  TreeSelectProps as _TreeSelectProps,
} from "./interface";

import LayRender from "@layui/component/component/_components/render";
import LayDropdown from "@layui/component/component/dropdown/index.vue";
import LayInput from "@layui/component/component/input/index.vue";
import LayTagInput from "@layui/component/component/tagInput/index.vue";
import { treeReplaceFields } from "@layui/component/component/tree/constant";
import LayTree from "@layui/component/component/tree/index.vue";
import { isArray, isValueArray } from "@layui/component/utils";
import { LayIcon } from "@layui/icons-vue";
import { useDebounceFn } from "@vueuse/core";
import { computed, provide, ref, useSlots, watch } from "vue";
import useProps from "./index.hooks";
import { LAYUI_TREE_SELECT } from "./useTreeSelect";

import "./index.less";

export type TreeSelectProps = _TreeSelectProps;

export type TreeSelectEmits = _TreeSelectEmits;

defineOptions({
  name: "LayTreeSelect",
});

const props = withDefaults(defineProps<TreeSelectProps>(), {
  disabled: false,
  multiple: false,
  allowClear: false,
  checkStrictly: true,
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  search: false,
  searchNodeMethod: (node: any, value: string) => {
    return node.title.includes(value);
  },
  defaultExpandAll: undefined,
});

const emits = defineEmits<TreeSelectEmits>();
const slots = useSlots();

const { size } = useProps(props);

const _replaceFields = computed<ReplaceFieldsOptions>(() => {
  return Object.assign(
    {},
    treeReplaceFields,
    props.replaceFields,
  );
});

const searchValue = ref("");
const singleValue = ref("");
const multipleValue = ref<TagInputData[]>([]);
const openState = ref(false);
const dropdownRef = ref();
const composing = ref(false);

const treeRef = ref<InstanceType<typeof LayTree>>();

/**
 * 将props.data and props.cacheData 转成一维数组
 */
const flatData = computed(() => {
  const ret: Array<OriginalTreeData> = [];

  const flatter = <K extends OriginalTreeData>(target: Array<K>) => {
    target.forEach((item) => {
      ret.push(item);

      const children: K[] = item[_replaceFields.value.children];
      if (isValueArray(children)) {
        flatter(children);
      }
    });
  };
  flatter(isArray(props.data) ? props.data : [props.data]);

  return [...ret, ...props.cacheData || []];
});

/**
 * 寻找节点
 * 当tree 已初始化，从tree中寻找节点(可以找出懒加载的数据)
 * 否则从当前selectTree数据源中寻找
 */
function findNode(value: OriginalTreeData["id"]) {
  const { id } = _replaceFields.value;

  return treeRef.value
    ? treeRef.value.getFlatTree().value.find(tree => tree.id === value)?.original
    : flatData.value.find(node => node[id] === value);
}

/**
 * 在第一次tree初始化时，tree内部会统一checkedKeys/selectedKeys与节点中checked/spread 为true的所有集合
 * 并emit事件出来，导致treeSelect中会一开始就触发 emit.change
 * notFirstChange 将阻断首次change
 */
const notFirstChange = ref(false);

const selectedValue = computed({
  get() {
    return (!props.multiple
      ? props.modelValue
      : "") as NonNullable<TreeProps["selectedKey"]>;

    // props.multiple && props.modelValue == null ? [] : props.modelValue;
  },
  set(value) {
    if (!props.multiple && props.modelValue !== value) {
      emits("update:modelValue", value);
      notFirstChange.value && emits("change", value);
    }

    if (!notFirstChange.value) {
      notFirstChange.value = true;
    }
  },
});

const checkedKeys = computed({
  get() {
    return (props.multiple ? props.modelValue : []) as NonNullable<TreeProps["checkedKeys"]>;
  },
  set(value) {
    if (props.multiple) {
      emits("update:modelValue", value);
      notFirstChange.value && emits("change", value);
    }

    if (!notFirstChange.value) {
      notFirstChange.value = true;
    }
  },
});

watch(
  () => [selectedValue.value, checkedKeys.value, props.data],
  () => {
    if (props.multiple) {
      try {
        multipleValue.value = checkedKeys.value.map((value) => {
          let node = findNode(value)!;

          if (node) {
            node = {
              label: node.title || node[_replaceFields.value.title],
              value: node.id,
              closable: !node.disabled,
            } as TagInputData;
          }
          else {
            node = {
              label: value,
              value,
              closable: true,
            } as TagInputData;
          }
          return node;
        });
      }
      catch {
        throw new Error("v-model / model-value is not an array type");
      }
    }
    else {
      /**
       * 根据 id 查找 node 节点
       *
       * 备注：如果找不到这个节点, 说明存在 BUG 或 空值, 对 singleValue 清空
       */

      const node = findNode(selectedValue.value);

      if (node) {
        singleValue.value = String(node.title || node[_replaceFields.value.title]);
      }
      else {
        singleValue.value = "";
      }
    }
  },
  { immediate: true, deep: true },
);

function onClear() {
  if (props.multiple) {
    emits("update:modelValue", []);
  }
  else {
    emits("update:modelValue", "");
  }
}

/**
 * Tree 节点单击事件
 *
 * 备注：单选模式需要执行的逻辑，多选模式禁用。
 */
function handleClick() {
  if (!props.multiple) {
    dropdownRef.value.hide();
  }
}

/**
 * Tag 标签的删除事件
 *
 * 备注: 多选模式需要考虑 checkStrictly 为 false 的情况，删除当前节点，是否需要删除子节点, 如果为 true 时，仅删除当前节点
 */
function handleRemove(value: any) {
  // 关闭 dropdown 前置操作
  dropdownRef.value.hide();

  // 删除 checkedKeys 的逻辑
  if (props.checkStrictly) {
    emits(
      "update:modelValue",
      checkedKeys.value.filter((item: any) => item !== value),
    );
  }
  else {
    // 当 checkStrictly 配置为 false 时, 删除内容为 当前节点 与 关联子集
    const node = findNode(value);
    const nodeIds = filterNodeIds(node);
    emits(
      "update:modelValue",
      checkedKeys.value.filter((item: any) => !nodeIds.includes(item)),
    );
  }
}

function filterNodeIds(node: any) {
  const nodeIds: any[] = [];
  const { id, children } = _replaceFields.value;

  function _findNodeIds(node: any, arr: any[]) {
    arr.push(node[id]);
    if (node[children]) {
      node[children].forEach((item: any) => {
        _findNodeIds(item, arr);
      });
    }
  }

  _findNodeIds(node, nodeIds);
  return nodeIds;
}

/**
 * 实时标识，是否存在数据
 *
 * 应用于多选模式 placeholder 属性的显示隐藏
 */
const hasContent = computed(() => {
  if (props.multiple) {
    return checkedKeys.value.length > 0;
  }
  else {
    return Array.isArray(selectedValue.value)
      ? selectedValue.value.length
      : selectedValue.value;
  }
});

const _placeholder = computed(() => {
  return hasContent.value ? "" : props.placeholder;
});

function onSearch(value: string) {
  if (composing.value)
    return;
  emits("search", value);
  searchValue.value = value;
}

function onCompositionstart() {
  composing.value = true;
}

function onCompositionend(eventParam: Event) {
  composing.value = false;
  onSearch((eventParam.target as HTMLInputElement).value);
}

// 监听 searchValue 刷新 tree 数据
watch(
  searchValue,
  useDebounceFn(() => {
    treeRef.value && treeRef.value.filter(searchValue.value);
  }, 500),
);

watch(openState, () => {
  if (!openState.value) {
    searchValue.value = "";
  }
});

const inputEl = ref<HTMLInputElement | null>(null);

function setInputEl(el: HTMLInputElement) {
  if (props.search) {
    inputEl.value = el;
  }
}

provide(LAYUI_TREE_SELECT, {
  inputEl,
  setInputEl,
});
</script>

<template>
  <div
    class="layui-tree-select"
    :class="{
      'layui-disabled': disabled,
      'has-content': hasContent,
      'has-clear': allowClear,
    }"
  >
    <LayDropdown
      ref="dropdownRef"
      :disabled="disabled"
      :content-class="contentClass"
      :content-style="contentStyle"
      :teleport-props="teleportProps"
      :click-to-close="false"
      @show="openState = true"
      @hide="openState = false"
    >
      <LayTagInput
        v-if="multiple"
        v-model="multipleValue"
        :size="size"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :collapse-tags-tooltip="collapseTagsTooltip"
        :min-collapsed-num="minCollapsedNum"
        :disabled-input="!search"
        :input-value="searchValue"
        @input-value-change="onSearch"
        @remove="handleRemove"
        @clear="onClear"
        @keyup.delete.capture.prevent.stop
        @keydown.enter.capture.prevent.stop
      >
        <template #suffix>
          <LayIcon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          />
        </template>
      </LayTagInput>
      <LayInput
        v-else
        :model-value="singleValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :disabled="disabled"
        :readonly="!search"
        :size="size"
        @clear="onClear"
        @input="onSearch"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
      >
        <template #suffix>
          <LayIcon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          />
        </template>
      </LayInput>
      <template #content>
        <div class="layui-tree-select-content">
          <LayTree
            ref="treeRef"
            v-bind="props"
            v-model:selected-key="selectedValue"
            v-model:checked-keys="checkedKeys"
            :only-icon-control="true"
            :show-checkbox="multiple"
            :replace-fields="_replaceFields"
            @node-click="handleClick"
          >
            <template v-for="(_, slot) in slots" #[slot]="arg" :key="slot">
              <LayRender
                :slots="slots"
                :render="slot"
                v-bind="arg"
              />
            </template>
          </LayTree>
        </div>
      </template>
    </LayDropdown>
  </div>
</template>
