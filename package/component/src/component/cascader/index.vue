<template>
  <div
    :size="size"
    :class="[
      'layui-cascader',
      {
        'layui-cascader-opend': openState,
        'layui-cascader-disabled': disabled,
        'has-content': hasContent,
        'has-clear': allowClear,
      },
    ]"
  >
    <lay-dropdown
      ref="dropdownRef"
      :trigger="trigger"
      :autoFitMinWidth="false"
      :updateAtScroll="true"
      :disabled="disabled"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
      @show="openState = true"
      @hide="openState = false"
    >
      <lay-input
        v-if="!slots.default"
        v-model="displayValue"
        suffix-icon="layui-icon-triangle-d"
        :placeholder="placeholder"
        :allow-clear="allowClear"
        :disabled="disabled"
        :readonly="true"
        :size="size"
        @clear="onClear"
      ></lay-input>

      <div class="slot-area" v-else>
        <slot></slot>
      </div>

      <template #content>
        <div class="layui-cascader-panel">
          <template v-for="(itemCol, index) in treeData">
            <lay-scroll
              height="180px"
              class="layui-cascader-menu"
              :key="'cascader-menu' + index"
              v-if="itemCol.data.length"
            >
              <div
                class="layui-cascader-menu-item"
                v-for="(item, i) in itemCol.data"
                :key="index + i"
                @click="selectBar(item, i, index, 'click')"
                :class="[
                  {
                    'layui-cascader-selected': itemCol.selectIndex === i,
                  },
                ]"
              >
                <slot
                  :name="item.slot"
                  v-if="item.slot && slots[item.slot]"
                ></slot>
                <template v-else>{{ item.label }}</template>
                <i
                  class="layui-icon layui-icon-right"
                  v-if="item.children && item.children.length"
                ></i>
              </div>
            </lay-scroll>
          </template>
        </div>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayCascader",
};
</script>

<script setup lang="ts">
import "./index.less";
import LayInput from "../input/index.vue";
import LayScroll from "../scroll/index.vue";
import LayDropdown from "../dropdown/index.vue";
import { ref, onMounted, watch, useSlots, StyleValue, computed } from "vue";
import { CascaderSize } from "./interface";

export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface CascaderProps {
  options?: Array<any> | null;
  modelValue?: string;
  decollator?: string;
  placeholder?: string;
  onlyLastLevel?: boolean;
  disabled?: boolean;
  replaceFields?: { label: string; value: string; children: string };
  allowClear?: boolean;
  size?: CascaderSize;
  trigger?: DropdownTrigger | DropdownTrigger[];
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  changeOnSelect?: boolean;
}

const props = withDefaults(defineProps<CascaderProps>(), {
  options: null,
  modelValue: "",
  decollator: "/",
  placeholder: "",
  onlyLastLevel: false,
  allowClear: false,
  disabled: false,
  size: "md",
  trigger: "click",
  changeOnSelect: false,
  replaceFields: () => {
    return {
      label: "label",
      value: "value",
      children: "children",
    };
  },
});

const emit = defineEmits(["update:modelValue", "change", "clear"]);

onMounted(() => {
  initTreeData();
  firstInitComplete.value = true; //首次加载结束状态
});

watch(
  () => props.options,
  () => {
    initTreeData();
  }
);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === null || props.modelValue === "") {
      onClear();
    } else {
      updateDisplayByModelValue();
    }
  }
);
const firstInitComplete = ref(false);
const treeData = ref<any>([]);
const initTreeData = () => {
  let treeLvNum = getMaxFloor(props.options);
  for (let index = 0; index < treeLvNum; index++) {
    if (index == 0) {
      treeData.value[0] = {
        selectIndex: null,
        data: findData(props.options, 1),
      };
    } else {
      treeData.value[index] = {
        selectIndex: null,
        data: [],
      };
    }
  }
  updateDisplayByModelValue();
};

function updateDisplayByModelValue() {
  if (props.modelValue) {
    try {
      let valueData = props.modelValue.split(props.decollator);
      for (let index = 0; index < valueData.length; index++) {
        const element = valueData[index];
        let selectIndex = treeData.value[index].data.findIndex(
          (e: { value: string }) => e.value === element
        );
        if (selectIndex == -1) {
          break;
        }
        selectBar(treeData.value[index].data[selectIndex], selectIndex, index);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function getMaxFloor(treeData: any) {
  //let floor = 0;
  let max = 0;
  function each(data: any, floor: any) {
    data.forEach((e: any) => {
      //e.layFloor = floor;
      if (floor > max) {
        max = floor;
      }
      if (
        e[props.replaceFields.children] &&
        e[props.replaceFields.children].length > 0
      ) {
        each(e[props.replaceFields.children], floor + 1);
      }
    });
  }
  each(treeData, 1);
  return max;
}
function findData(orginData: any, level: number) {
  let data: any[] = [];
  for (let i = 0; i < orginData.length; i++) {
    const element = orginData[i];
    if (level === 1) {
      data.push({
        value: element[props.replaceFields.value],
        label: element[props.replaceFields.label],
        slot: element.slot || false,
        children: element[props.replaceFields.children] ?? false,
        orginData: element,
      });
    }

    if (
      level !== 1 &&
      element[props.replaceFields.children] &&
      element[props.replaceFields.children].length > 0
    ) {
      findData(element[props.replaceFields.children], level - 1);
    }
  }
  return data;
}

const dataContainer = ref<any>([]);

const selectBar = (
  item: any,
  selectIndex: number,
  parentIndex: number,
  action: string | null = null
) => {
  treeData.value[parentIndex].selectIndex = selectIndex;
  if (item.children && item.children.length > 0) {
    treeData.value[parentIndex + 1].selectIndex = null;
    treeData.value[parentIndex + 1].data = findData(item.children, 1);
  }
  //把数组里后面的数据清空
  let nextIndex = parentIndex + 2;
  for (let index = nextIndex; index < treeData.value.length; index++) {
    treeData.value[index].selectIndex = null;
    treeData.value[index].data = [];
  }
  if (
    !item.children ||
    item.children.length === 0 ||
    (props.changeOnSelect && !props.onlyLastLevel)
  ) {
    //触发交互条件，（无子项或者子项长度为0）|| （开启了changeOnSelect选项并且没有设置onlyLastLevel）
    //输入框数据更新
    let data: any[] = [];
    function extractData(orginData: any, dataContainer: any, index: number) {
      const element = orginData[index].data;
      const selectIndex = orginData[index].selectIndex;
      const selectData = element[selectIndex];
      selectData && dataContainer.push(selectData);
      if (selectData && selectData.children && selectData.children.length > 0) {
        extractData(orginData, dataContainer, index + 1);
      }
    }
    extractData(treeData.value, data, 0);
    let fullLable = data
      .map((e: any) => {
        return e.label;
      })
      .join(` ${props.decollator} `);
    if (!props.onlyLastLevel) {
      //全部展示
      displayValue.value = fullLable;
    } else {
      //仅仅显示最后一级
      let _data = data.map((e: any) => {
        return e.label;
      });
      displayValue.value = _data[_data.length - 1];
    }
    let value = data
      .map((e: any) => {
        return e.value;
      })
      .join(props.decollator);
    if (action === "click") {
      emit("update:modelValue", value);
    }
    if (firstInitComplete.value) {
      let evt = {
        display: displayValue.value,
        value: value,
        label: fullLable,
        currentClick: JSON.parse(JSON.stringify(item.orginData)),
      };
      emit("change", evt);
    }
    if (dropdownRef.value) {
      if (props.changeOnSelect && item.children && item.children.length > 0) {
        return;
      }
      // @ts-ignore
      dropdownRef.value.hide();
    }
  }
};

const displayValue = ref<string | number>("");
const slots = useSlots();
const dropdownRef = ref();
const hasContent = computed(
  () => props.modelValue != "" && props.modelValue != null
);

//清除事件
const onClear = () => {
  displayValue.value = "";
  let arr = JSON.parse(JSON.stringify(treeData.value));
  for (let index = 0; index < arr.length; index++) {
    arr[index].selectIndex = null;
    if (index === 0) {
      continue;
    }
    arr[index].data = [];
  }
  treeData.value = arr;
  emit("update:modelValue", null);
};

const openState = ref(false);
</script>
