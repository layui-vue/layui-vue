<script lang="ts">
export default {
  name: "LayTransfer",
};
</script>

<script setup lang="ts">
import "./index.less";
import LayScroll from "../scroll";
import { Ref, ref, useSlots, watch } from "vue";
import { Recordable } from "../../types";

export interface LayTransferProps {
  id?: string;
  title?: string[];
  showSearch?: boolean;
  dataSource: Recordable[];
}

const slot = useSlots();

const props = withDefaults(defineProps<LayTransferProps>(), {
  id: "id",
  title: () => ["主列表", "副列表"],
  dataSource: () => [],
  showSearch: false,
  selectedKeys: () => [],
});

const leftDataSource: Ref<any[]> = ref([...props.dataSource]);
const rightDataSource: Ref<any[]> = ref([]);

const _leftDataSource: Ref<any[]> = ref([...props.dataSource]);
const _rightDataSource: Ref<any[]> = ref([]);

const leftSelectedKeys: Ref<string[]> = ref([]);
const rightSelectedKeys: Ref<string[]> = ref([]);

const allLeftChecked = ref(false);
const allRightChecked = ref(false);

const allLeftChange = function (checked: any) {
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
  },
  { deep: true }
);

const allRightChange = function (checked: any) {
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
      rightDataSource.value.length != 0
    ) {
      allRightChecked.value = true;
    } else {
      allRightChecked.value = false;
    }
  },
  { deep: true }
);

const add = function () {
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

const remove = function () {
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
    if(e.target.value === "") {
      leftDataSource.value = _leftDataSource.value;
    }
    leftDataSource.value = _leftDataSource.value.filter((item) => {
      if(item.title.indexOf(e.target.value) != -1) {
        return item;
      };
    })
}

const searchRight = (e: any) => {
    if(e.target.value === "") {
      rightDataSource.value = _rightDataSource.value;
    }
    rightDataSource.value = _rightDataSource.value.filter((item) => {
      if(item.title.indexOf(e.target.value) != -1) {
        return item;
      };
    })
}
</script>

<template>
  <div>
    <div class="layui-transfer layui-form layui-border-box">
      <div class="layui-transfer-box" style="width: 200px; height: 360px">
        <div class="layui-transfer-header">
          <lay-checkbox
            v-model="allLeftChecked"
            skin="primary"
            label="all"
            @change="allLeftChange"
          >
            <span>{{ title[0] }}</span>
          </lay-checkbox>
        </div>
        <div class="layui-transfer-search" v-if="showSearch">
          <i class="layui-icon layui-icon-search"></i
          ><input type="input" class="layui-input" @input="searchLeft" placeholder="关键词搜索" />
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li v-for="dataSource in leftDataSource" :key="dataSource">
            <lay-checkbox
              v-model="leftSelectedKeys"
              skin="primary"
              :label="dataSource[id]"
            >
              <slot v-if="slot.item" name="item" :data="dataSource"></slot>
              <span v-else>{{ dataSource.title }}</span>
            </lay-checkbox>
          </li>
        </ul>
      </div>
      <div class="layui-transfer-active">
        <lay-button
          type="primary"
          :disabled="leftSelectedKeys.length == 0"
          @click="add"
          ><i class="layui-icon layui-icon-next"></i
        ></lay-button>
        <lay-button
          type="primary"
          :disabled="rightSelectedKeys.length == 0"
          @click="remove"
          ><i class="layui-icon layui-icon-prev"></i
        ></lay-button>
      </div>
      <div class="layui-transfer-box" style="width: 200px; height: 360px">
        <div class="layui-transfer-header">
          <lay-checkbox
            v-model="allRightChecked"
            skin="primary"
            label="all"
            @change="allRightChange"
          >
            <span>{{ title[1] }}</span>
          </lay-checkbox>
        </div>
        <div class="layui-transfer-search" v-if="showSearch">
          <i class="layui-icon layui-icon-search"></i
          ><input type="input" class="layui-input" @input="searchRight" placeholder="关键词搜索" />
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li v-for="dataSource in rightDataSource" :key="dataSource">
            <lay-checkbox
              v-model="rightSelectedKeys"
              skin="primary"
              :label="dataSource[id]"
            >
              <slot v-if="slot.item" name="item" :data="dataSource"></slot>
              <span v-else>{{ dataSource.title }}</span>
            </lay-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
