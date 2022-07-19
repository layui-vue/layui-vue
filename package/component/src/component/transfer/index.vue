<script lang="ts">
export default {
  name: "LayTransfer",
};
</script>

<script setup lang="ts">
import "./index.less";
import LayInput from "../input/index.vue";
import LayScroll from "../scroll/index.vue";
import LayButton from "../button/index.vue";
import LayCheckbox from "../checkbox/index.vue";
import { computed, Ref, ref, useSlots, watch } from "vue";
import { BooleanOrString, Recordable } from "../../types";

export interface LayTransferProps {
  id?: string;
  title?: string[];
  width?: string;
  height?: string;
  showSearch?: BooleanOrString;
  dataSource: Recordable[];
  selectedKeys?: Recordable[];
}

const slots = useSlots();

const props = withDefaults(defineProps<LayTransferProps>(), {
  id: "id",
  title: () => ["主列表", "副列表"],
  dataSource: () => [],
  showSearch: false,
  selectedKeys: () => [],
  width: "200px",
  height: "360px",
});

const leftDataSource: Ref<any[]> = ref([...props.dataSource]);
const rightDataSource: Ref<any[]> = ref([]);
const _leftDataSource: Ref<any[]> = ref([...props.dataSource]);
const _rightDataSource: Ref<any[]> = ref([]);
const leftSelectedKeys: Ref<string[]> = ref([]);
const rightSelectedKeys: Ref<string[]> = ref([]);
const allLeftChecked = ref(false);
const allRightChecked = ref(false);
const hasLeftChecked = ref(false);
const hasRightChecked = ref(false);

const allLeftChange = (checked: any) => {
  if (checked) {
    const ids = leftDataSource.value.map((item: any) => {
      return item[props.id];
    });
    leftSelectedKeys.value = ids;
  } else {
    leftSelectedKeys.value = [];
  }
};

watch(
  leftSelectedKeys,
  () => {
    if (
      leftDataSource.value.length === leftSelectedKeys.value.length &&
      leftDataSource.value.length != 0
    ) {
      allLeftChecked.value = true;
    } else {
      allLeftChecked.value = false;
    }
    if (leftSelectedKeys.value.length > 0 && leftDataSource.value.length != 0) {
      hasLeftChecked.value = true;
    } else {
      hasLeftChecked.value = false;
    }
  },
  { deep: true }
);

const allRightChange = (checked: any) => {
  if (checked) {
    const ids = rightDataSource.value.map((item: any) => {
      return item[props.id];
    });
    rightSelectedKeys.value = ids;
  } else {
    rightSelectedKeys.value = [];
  }
};

watch(
  rightSelectedKeys,
  () => {
    if (
      rightDataSource.value.length === rightSelectedKeys.value.length &&
      rightDataSource.value.length > 0
    ) {
      allRightChecked.value = true;
    } else {
      allRightChecked.value = false;
    }
    if (
      rightSelectedKeys.value.length > 0 &&
      rightDataSource.value.length != 0
    ) {
      hasRightChecked.value = true;
    } else {
      hasRightChecked.value = false;
    }
  },
  { deep: true }
);

const add = () => {
  if (leftSelectedKeys.value.length === 0) {
    return;
  }
  leftDataSource.value.forEach((item) => {
    if (leftSelectedKeys.value.indexOf(item.id) != -1) {
      rightDataSource.value.push(item);
    }
  });
  leftDataSource.value = leftDataSource.value.filter(
    (item) => leftSelectedKeys.value.indexOf(item.id) === -1
  );
  _leftDataSource.value.forEach((item) => {
    if (leftSelectedKeys.value.indexOf(item.id) != -1) {
      _rightDataSource.value.push(item);
    }
  });
  _leftDataSource.value = _leftDataSource.value.filter(
    (item) => leftSelectedKeys.value.indexOf(item.id) === -1
  );
  leftSelectedKeys.value = [];
};

const remove = () => {
  if (rightSelectedKeys.value.length === 0) {
    return;
  }
  rightDataSource.value.forEach((item) => {
    if (rightSelectedKeys.value.indexOf(item.id) != -1) {
      leftDataSource.value.push(item);
    }
  });
  rightDataSource.value = rightDataSource.value.filter(
    (item) => rightSelectedKeys.value.indexOf(item.id) === -1
  );
  _rightDataSource.value.forEach((item) => {
    if (rightSelectedKeys.value.indexOf(item.id) != -1) {
      _leftDataSource.value.push(item);
    }
  });
  _rightDataSource.value = _rightDataSource.value.filter(
    (item) => rightSelectedKeys.value.indexOf(item.id) === -1
  );
  rightSelectedKeys.value = [];
};

const searchLeft = (e: any) => {
  if (e.target.value === "") {
    leftDataSource.value = _leftDataSource.value;
  }
  leftDataSource.value = _leftDataSource.value.filter((item) => {
    if (item.title.indexOf(e.target.value) != -1) {
      return item;
    }
  });
};

const searchRight = (e: any) => {
  if (e.target.value === "") {
    rightDataSource.value = _rightDataSource.value;
  }
  rightDataSource.value = _rightDataSource.value.filter((item) => {
    if (item.title.indexOf(e.target.value) != -1) {
      return item;
    }
  });
};

const boxStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
  };
});
</script>

<template>
  <div>
    <div class="layui-transfer layui-form layui-border-box">
      <div class="layui-transfer-box" :style="boxStyle">
        <div class="layui-transfer-header">
          <LayCheckbox
            v-model="hasLeftChecked"
            :is-indeterminate="!allLeftChecked"
            skin="primary"
            value="all"
            @change="allLeftChange"
          >
            <span>{{ title[0] }}</span>
          </LayCheckbox>
        </div>
        <div class="layui-transfer-search" v-if="showSearch">
          <lay-input
            prefix-icon="layui-icon-search"
            @input="searchLeft"
            placeholder="关键词搜索"
          ></lay-input>
        </div>
        <ul class="layui-transfer-data">
          <li v-for="dataSource in leftDataSource" :key="dataSource">
            <LayCheckbox
              v-model="leftSelectedKeys"
              skin="primary"
              :value="dataSource[id]"
            >
              <slot v-if="slots.item" name="item" :data="dataSource"></slot>
              <span v-else>{{ dataSource.title }}</span>
            </LayCheckbox>
          </li>
        </ul>
        <div class="layui-transfer-footer" v-if="slots.leftFooter">
          <slot name="leftFooter"></slot>
        </div>
      </div>
      <div class="layui-transfer-active">
        <div class="layui-transfer-button-group">
          <LayButton
            type="primary"
            :disabled="leftSelectedKeys.length == 0"
            @click="add"
            ><i class="layui-icon layui-icon-next"></i
          ></LayButton>
          <LayButton
            type="primary"
            :disabled="rightSelectedKeys.length == 0"
            @click="remove"
            ><i class="layui-icon layui-icon-prev"></i
          ></LayButton>
        </div>
      </div>
      <div class="layui-transfer-box" :style="boxStyle">
        <div class="layui-transfer-header">
          <LayCheckbox
            v-model="hasRightChecked"
            :is-indeterminate="!allRightChecked"
            skin="primary"
            value="all"
            @change="allRightChange"
          >
            <span>{{ title[1] }}</span>
          </LayCheckbox>
        </div>
        <div class="layui-transfer-search" v-if="showSearch">
          <lay-input
            prefix-icon="layui-icon-search"
            @input="searchRight"
            placeholder="关键词搜索"
          ></lay-input>
        </div>
        <ul class="layui-transfer-data">
          <li v-for="dataSource in rightDataSource" :key="dataSource">
            <LayCheckbox
              v-model="rightSelectedKeys"
              skin="primary"
              :value="dataSource[id]"
            >
              <slot v-if="slots.item" name="item" :data="dataSource"></slot>
              <span v-else>{{ dataSource.title }}</span>
            </LayCheckbox>
          </li>
        </ul>
        <div class="layui-transfer-footer" v-if="slots.rightFooter">
          <slot name="rightFooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
