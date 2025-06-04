<script setup lang="ts">
import type { TabHeaderProps } from "./interface";

import LayRender from "@layui/component/component/_components/render";
import LayIcon from "@layui/component/component/icon";
import { clsPrefix } from "@layui/component/utils";
import { useTabHeader } from "../hooks/useTabHeader";

const props = defineProps<TabHeaderProps>();

const closeIconClass = `${clsPrefix("icon-close")} ${clsPrefix("unselect")} ${clsPrefix("tab-close")}`;
// const preNextContainerClass = `${clsPrefix("unselect")} ${clsPrefix("tab-bar")}`;

const {
  classTabHead,
  classTabTitle,
  renderTabIcon,
  renderTabTitle,
} = useTabHeader(props);
</script>

<template>
  <div :class="classTabHead">
    <ul :class="classTabTitle">
      <div
        v-if="type === 'brief'"
        :class="clsPrefix('tab-active-bar')"
      />

      <li
        v-for="item in defaultSlot"
        :key="item.props.id"
        :class="{ [clsPrefix('this')]: item.props.id === modelValue }"
      >
        <span>
          <LayRender
            v-if="item.props.icon"
            :render="renderTabIcon"
            :tab-data="item"
          />
          <LayRender :render="renderTabTitle" :tab-data="item" />
        </span>

        <LayIcon
          v-if="allowClose && (item.props.closable ?? true)"
          :type="`${closeIconClass}`"
        />
      </li>
    </ul>

    <!-- <span :class="`${preNextContainerClass} prev`">
      <LayIcon type="layui-icon-left" />
    </span>

    <span :class="`${preNextContainerClass}`">
      <LayIcon type="layui-icon-right" />
    </span> -->
  </div>
</template>
