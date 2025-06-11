<script setup lang="ts">
import type { TabHeaderProps } from "./interface";

import LayRender from "@layui/component/component/_components/render";
import LayIcon from "@layui/component/component/icon";
import { clsPrefix } from "@layui/component/utils";
import { useTabHeader } from "../hooks/useTabHeader";

const props = defineProps<TabHeaderProps>();

const closeIconClass = `${clsPrefix("icon-close")} ${clsPrefix("unselect")} ${clsPrefix("tab-close")}`;
const preNextContainerClass = `${clsPrefix("unselect")} ${clsPrefix("tab-bar")}`;

const {
  isHorizontal,
  preRef,
  nextRef,
  ulRef,
  liSRefS,
  isShowPreNext,

  classTabHead,
  styleTabHead,
  classTabTitle,
  styleTabTitle,
  styleTabBar,
  renderTabIcon,
  renderTabTitle,

  handleChange,
  handlePreClick,
  handleNextClick,
  handleUlScroll,
  handleClose,

} = useTabHeader(props);
</script>

<template>
  <div :class="classTabHead" :style="styleTabHead">
    <span v-if="isShowPreNext" ref="preRef" :class="`${preNextContainerClass} prev`" @click="handlePreClick">
      <LayIcon :type="isHorizontal ? 'layui-icon-left' : 'layui-icon-up'" />
    </span>

    <ul ref="ulRef" :class="classTabTitle" :style="styleTabTitle" @wheel="handleUlScroll">
      <li
        v-for="(item, index) in defaultSlot"
        ref="liSRefS"
        :key="item.props.id"
        :class="{ [clsPrefix('this')]: item.props.id === modelValue }"
        @click.stop="handleChange(item.props.id)"
      >
        <LayRender
          v-if="item.props.icon"
          :render="renderTabIcon"
          :tab-data="item"
        />
        <LayRender :render="renderTabTitle" :tab-data="item" />

        <LayIcon
          v-if="allowClose && (item.props.closable ?? true)"
          :type="`${closeIconClass}`"
          @click.stop="handleClose(item.props.id, index)"
        />
      </li>

      <div
        v-if="type === 'brief'"
        :class="clsPrefix('tab-active-bar')"
        :style="styleTabBar"
      />
    </ul>

    <span v-if="isShowPreNext" ref="nextRef" :class="`${preNextContainerClass}`" @click="handleNextClick">
      <LayIcon :type="isHorizontal ? 'layui-icon-right' : 'layui-icon-down'" />
    </span>
  </div>
</template>
