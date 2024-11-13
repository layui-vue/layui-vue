<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-10-23 09:49:34
 * @LastEditors: baobaobao
-->
<template>
  <ul class="layui-pager">
    <li
      v-if="setPage[0] !== 1"
      :data-page="currentPage"
      @click="handlePage(1)"
      :class="[
        'layui-pager-number',
        {
          [theme ? 'layui-bg-' + theme : '']: 1 === currentPage,
          'is-active': 1 === currentPage,
        },
      ]"
    >
      1
    </li>
    <template v-if="setPage[0] > 2">
      <lay-dropdown
        :disabled="!ellipsisTooltip"
        ref="manualRef"
        trigger="hover"
        placement="bottom"
      >
        <li
          data-page="向前 3 页"
          class="layui-pager-number layui-page-left-number"
          @mouseleave="iconPrevHover = true"
          @mouseenter="iconPrevHover = false"
          @click="handlePage(currentPage - 3)"
        >
          <lay-icon
            :type="iconPrevHover ? 'layui-icon-more' : 'layui-icon-left'"
            size="12px"
          ></lay-icon>
        </li>
        <template #content>
          <lay-dropdown-menu style="max-height: 140px; overflow-y: auto">
            <lay-dropdown-menu-item
              v-for="page of pageOpionData.resetLeft"
              :key="page"
              @click="handlePage(page)"
            >
              {{ page }}
            </lay-dropdown-menu-item>
          </lay-dropdown-menu>
        </template>
      </lay-dropdown>
    </template>

    <li
      @click="handlePage(page)"
      v-for="page of setPage"
      :key="page"
      :data-page="page"
      :class="[
        'layui-pager-number',
        {
          [theme ? 'layui-bg-' + theme : '']: page === currentPage,
          'is-active': page === currentPage,
        },
      ]"
    >
      {{ page }}
    </li>

    <template v-if="setPage[setPage.length - 1] < pageCount - 1">
      <lay-dropdown
        :disabled="!ellipsisTooltip"
        trigger="hover"
        placement="bottom"
      >
        <li
          data-page="向后 3 页"
          class="layui-pager-number layui-page-right-number"
          @mouseleave="iconNextHover = true"
          @mouseenter="iconNextHover = false"
          @click="handlePage(currentPage + 3)"
        >
          <lay-icon
            :type="iconNextHover ? 'layui-icon-more' : 'layui-icon-right'"
            size="12px"
          ></lay-icon>
        </li>
        <template #content>
          <lay-dropdown-menu style="max-height: 140px; overflow-y: auto">
            <lay-dropdown-menu-item
              v-for="page of pageOpionData.resetRight"
              :key="page"
              @click="handlePage(page)"
            >
              {{ page }}
            </lay-dropdown-menu-item>
          </lay-dropdown-menu>
        </template>
      </lay-dropdown>
    </template>
    <li
      v-if="setPage[setPage.length - 1] !== pageCount"
      :data-page="pageCount"
      @click="handlePage(pageCount)"
      :class="[
        'layui-pager-number',
        {
          [theme ? 'layui-bg-' + theme : '']: pageCount === currentPage,
          'is-active': pageCount === currentPage,
        },
      ]"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import LayDropdown from "../../dropdown/index";
import LayDropdownMenu from "../../dropdownMenu/index";
import LayDropdownMenuItem from "../../dropdownMenuItem/index";
import { LayIcon } from "@layui/icons-vue";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPager",
});
const {
  pageCount,
  pageOpionData,
  handlePage,
  setPage,
  iconPrevHover,
  iconNextHover,
  currentPage,
  handleNext,
  theme,
  pageTotal,
  ellipsisTooltip,
} = usePage();
</script>
