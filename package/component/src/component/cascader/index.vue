<template>
  <div
    :size="size"
    :class="['layui-cascader', { 'layui-cascader-opend': openState }]"
  >
    <lay-dropdown
      ref="dropdownRef"
      :trigger="trigger"
      :autoFitMinWidth="false"
      :updateAtScroll="true"
      :disabled="dropDownDisabled"
      @show="openState = true"
      @hide="openState = false"
    >
      <lay-input
        v-model="displayValue"
        readonly
        suffix-icon="layui-icon-triangle-d"
        :placeholder="placeholder"
        v-if="!slots.default"
        :allow-clear="allowClear"
        @clear="onClear"
        :size="size"
      ></lay-input>
      <slot v-else></slot>

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
                @click="selectBar(item, i, index)"
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
import { ref, onMounted, watch, useSlots } from "vue";

export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface LayCascaderProps {
  options?: Array<any> | null;
  modelValue?: string;
  decollator?: string;
  placeholder?: string;
  onlyLastLevel?: boolean;
  replaceFields?: { label: string; value: string; children: string };
  allowClear?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  trigger?: DropdownTrigger | DropdownTrigger[];
}

const props = withDefaults(defineProps<LayCascaderProps>(), {
  options: null,
  modelValue: "",
  decollator: "/",
  placeholder: "",
  onlyLastLevel: false,
  allowClear: false,
  size: "md",
  trigger: "click",
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
    }
  }
);

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

  //数据回显
  if (props.modelValue) {
    try {
      let valueData = props.modelValue.split(props.decollator);
      let data: any[] = [];
      for (let index = 0; index < treeData.value.length; index++) {
        const element = treeData.value[index];
        const nowValue = valueData[index];
        for (let i = 0; i < element.length; i++) {
          const ele = element[i];
          if (nowValue === ele.value) {
            data.push(ele);
            element.selectIndex = i;
          }
        }
      }
      displayValue.value = data
        .map((e) => {
          return e.label;
        })
        .join(` ${props.decollator} `);
    } catch (error) {
      console.error(error);
    }
  }
};

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
const selectBar = (item: any, selectIndex: number, parentIndex: number) => {
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
  if (!item.children || item.children.length === 0) {
    //输入框数据更新
    let data: any[] = [];
    function extractData(orginData: any, dataContainer: any, index: number) {
      const element = orginData[index].data;
      const selectIndex = orginData[index].selectIndex;
      const selectData = element[selectIndex];
      dataContainer.push(selectData);
      if (selectData.children && selectData.children.length > 0) {
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
      displayValue.value = fullLable;
    } else {
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
    emit("update:modelValue", value);
    let evt = {
      display: displayValue.value,
      value: value,
      label: fullLable,
      currentClick: JSON.parse(JSON.stringify(item.orginData)),
    };
    emit("change", evt);
    if (dropdownRef.value)
      // @ts-ignore
      dropdownRef.value.hide();
  }
};

const displayValue = ref<string | number>("");
const slots = useSlots();
const dropdownRef = ref();
const dropDownDisabled = ref(false);

//清除事件
const onClear = () => {
  displayValue.value = "";
  dropDownDisabled.value = true;
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
  setTimeout(() => {
    dropDownDisabled.value = false;
  }, 0);
};

const openState = ref(false);
</script>
