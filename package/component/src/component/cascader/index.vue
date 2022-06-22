<template>
  <lay-dropdown class="layui-cascader" ref="dropdownRef"  :autoFitMinWidth="false">
    <lay-input
      v-model="displayValue"
      readonly
      suffix-icon="layui-icon-down"
      :placeholder="placeholder"
      v-if="!slots.default"
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
              {{ item.label }}
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
</template>

<script lang="ts">
export default {
  name: "LayCascader",
};
</script>

<script setup lang="ts">
import "./index.less";
import { ref, onMounted, watch, useSlots } from "vue";
export interface LayCascaderProps {
  options?: Array<any> | null;
  modelValue?: string;
  decollator?: string;
  placeholder?: string;
}
const props = withDefaults(defineProps<LayCascaderProps>(), {
  options: null,
  modelValue: "",
  decollator: "/",
  placeholder: "",
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
  let floor = 0;
  let max = 0;
  function each(data: any, floor: any) {
    data.forEach((e: any) => {
      e.floor = floor;
      if (floor > max) {
        max = floor;
      }
      if (e.children && e.children.length > 0) {
        each(e.children, floor + 1);
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
        value: element.value,
        label: element.label,
        children: element.children ?? false,
      });
    }

    if (level !== 1 && element.children && element.children.length > 0) {
      findData(element.children, level - 1);
    }
  }
  return data;
}

const dataContainer = ref<any>([]);
const selectBar = (item: any, selectIndex: number, parentIndex: number) => {
  treeData.value[parentIndex].selectIndex = selectIndex;
  if (item.children) {
    treeData.value[parentIndex + 1].selectIndex = null;
    treeData.value[parentIndex + 1].data = findData(item.children, 1);
  }
  //把数组里后面的数据清空
  let nextIndex = parentIndex + 2;
  for (let index = nextIndex; index < treeData.value.length; index++) {
    treeData.value[index].selectIndex = null;
    treeData.value[index].data = [];
  }

  if (!item.children) {
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
    displayValue.value = data
      .map((e: any) => {
        return e.label;
      })
      .join(` ${props.decollator} `);
    let value = data
      .map((e: any) => {
        return e.value;
      })
      .join(props.decollator);
    emit("update:modelValue", value);
    emit("change", displayValue.value);
    if (dropdownRef.value)
      // @ts-ignore
      dropdownRef.value.hide();
  }
};

const displayValue = ref<string | number | null>(null);
const slots = useSlots();
const dropdownRef = ref(null);
</script>
