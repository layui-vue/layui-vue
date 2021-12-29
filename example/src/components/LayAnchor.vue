<template>
  <aside :class="classAside">
    <div class="lay-aside-top">
      <lay-button
        @click="handlerBtnClick()"
        type="primary"
        size="xs"
        :class="classAsideBtn"
      >
        <lay-icon :type="iconType" size="40"> </lay-icon>
      </lay-button>
    </div>
    <lay-scroll
      class="layui-side-scroll-bar layui-side-scroll::-webkit-scrollbar" >
      <ul>
        <li
          v-for="(item, index) in anchorsComput"
          :key="index"
          class="lay-aside-list"
          :class="{ active: index === curridx }"
          @click="curridx = index"
        >
          <a
            :href="`#${item}`"
            class="lay-aside-link"
            :class="{ active: index === curridx }"
            >{{ item }}</a
          >
        </li>
      </ul>
    </lay-scroll>
  </aside>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  anchors?: Array<string> | string;
  currIndex: number;
  show: boolean | string;
}>();

let curridx = ref(props.currIndex);
const show = ref(props.show);
const iconType = ref("layui-icon-right");
const anchor = props.anchors;

const anchorsComput = computed(() => {
  return typeof anchor === "string" ? anchor?.split(",") : anchor;
});

const classAside = computed(() => [
  "lay-aside",
  { "lay-aside-collapse": !show.value },
]);

const classAsideBtn = computed(() => [
  "lay-aside-collapse-btn",
  { "lay-aside-collapse-btn-collapse": !show.value },
]);

const handlerBtnClick = () => {
  show.value = !show.value;
  iconType.value = show.value ? "layui-icon-right" : "layui-icon-left";
};
</script>
<style lang="less" scoped>
.layui-side-scroll-bar{
  overflow-y: scroll; 
  max-width: 156px;
}
.layui-side-scroll::-webkit-scrollbar {
  width: 0;
}
.lay-aside {
  position: fixed;
  top: 65px;
  right: 17px;
  box-sizing: border-box;
  width: 180px;
  padding: 0 25px;
  background-color: #ffffff;
  border-left: 1px solid rgb(229 230 235);
  transition: right 200ms;
  height: calc(100% - 60px);
}

.lay-aside-top {
  height: 29px;
}

.lay-aside-link {
  display: inline-block;
  padding: 1px 4px;
  color: grey;
  font-size: 13px;
  line-height: 2;
  max-width: 140px;
  min-width: 68px;
  text-decoration: none;
  background-color: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  &:hover {
    background-color: #f6f6f6 !important;
    color: #5fb878;
  }
  &:active {
    background-color: #f6f6f6 !important;
    color: #89d89f;
  }
}
.lay-aside-list {
  position: relative;
  margin: 5px 0px 0px 4px;
  padding-left: 2px;
  max-width: 140px;
  border-radius: 2px;
  list-style: none;
  &:hover {
    background-color: #f6f6f6 !important;
    color: #5fb878;
  }
}
.active {
  background-color: #f6f6f6 !important;
  color: #5fb878 !important;
}

.lay-aside-collapse {
  right: -180px;
  opacity: 0.7;
}

.lay-aside-collapse-btn {
  position: fixed;
  right: 197px;
  top: calc(50% - 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 40px;
  background-color: #f6f6f6;
  border-radius: 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: rgb(229 230 235) 1px solid;
  border-right: none;
  transition: right 200ms;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  &:hover {
    background-color: #e2e2e2;
  }
}
.lay-aside-collapse-btn-collapse {
  right:0px;
}

@media screen and (max-width: 768px) {
  .lay-aside {
    width: 100px !important;
  }
  .lay-aside-collapse-btn {
    right: 98px;
  }
  .lay-aside-collapse-btn-collapse {
    right: 15px;
  }
  .lay-aside-list {
    max-width: 68px;
  }
  .layui-side-scroll-bar{
    max-width: 68px;
  }   
}
</style>
