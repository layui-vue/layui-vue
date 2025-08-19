<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import LayDropdown from "../../dropdown/index";
import LayDropdownMenu from "../../dropdownMenu/index";
import LayDropdownMenuItem from "../../dropdownMenuItem/index";
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
  theme,
  ellipsisTooltip,
} = usePage();
</script>

<template>
  <ul class="layui-pager">
    <li
      v-if="setPage[0] !== 1"
      :data-page="currentPage"
      class="layui-pager-number" :class="[
        {
          [theme ? `layui-bg-${theme}` : '']: 1 === currentPage,
          'is-active': 1 === currentPage,
        },
      ]"
      @click="handlePage(1)"
    >
      1
    </li>
    <template v-if="setPage[0] > 2">
      <LayDropdown
        :disabled="!ellipsisTooltip"
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
          <LayIcon
            :type="iconPrevHover ? 'layui-icon-more' : 'layui-icon-left'"
            size="12px"
          />
        </li>
        <template #content>
          <LayDropdownMenu style="max-height: 140px; overflow-y: auto">
            <LayDropdownMenuItem
              v-for="page of pageOpionData.resetLeft"
              :key="page"
              @click="handlePage(page)"
            >
              {{ page }}
            </LayDropdownMenuItem>
          </LayDropdownMenu>
        </template>
      </LayDropdown>
    </template>

    <li
      v-for="page of setPage"
      :key="page"
      :data-page="page"
      class="layui-pager-number"
      :class="[
        {
          [theme ? `layui-bg-${theme}` : '']: page === currentPage,
          'is-active': page === currentPage,
        },
      ]" @click="handlePage(page)"
    >
      {{ page }}
    </li>

    <template v-if="setPage[setPage.length - 1] < pageCount - 1">
      <LayDropdown
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
          <LayIcon
            :type="iconNextHover ? 'layui-icon-more' : 'layui-icon-right'"
            size="12px"
          />
        </li>
        <template #content>
          <LayDropdownMenu style="max-height: 140px; overflow-y: auto">
            <LayDropdownMenuItem
              v-for="page of pageOpionData.resetRight"
              :key="page"
              @click="handlePage(page)"
            >
              {{ page }}
            </LayDropdownMenuItem>
          </LayDropdownMenu>
        </template>
      </LayDropdown>
    </template>
    <li
      v-if="setPage[setPage.length - 1] !== pageCount"
      :data-page="pageCount"
      class="layui-pager-number" :class="[
        {
          [theme ? `layui-bg-${theme}` : '']: pageCount === currentPage,
          'is-active': pageCount === currentPage,
        },
      ]"
      @click="handlePage(pageCount)"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>
