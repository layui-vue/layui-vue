<script setup lang="ts">
import "./index.less";
import type {
  DescriptionsProps as _DescriptionsProps,
  DataListType,
} from "./interface";
import type { DescriptionsItemsNode } from "../descriptionsItem/interface";

import { h, computed, useSlots, provide, reactive } from "vue";
import { reactiveOmit } from "@vueuse/core";

import { flattedChildren } from "../../utils";
import { DESCRIPTIONS_INJECTION_KEY } from "./descriptions";

import LayDescriptionsItem from "../descriptionsItem";
import LayDescriptionsRow from "./descriptions-row";

export type DescriptionsProps = _DescriptionsProps;

const props = withDefaults(defineProps<DescriptionsProps>(), {
  direction: "horizontal",
  size: "md",
  column: 3,
  border: false,
});

defineOptions({
  name: "LayDescriptions",
});

const slots = useSlots();

const descriptionsClasses = computed(() => {
  return ["layui-descriptions", `layui-descriptions-${props.size}`];
});

const generateItemVNode = (
  dataList: DataListType[]
): DescriptionsItemsNode[] => {
  return dataList.map((data) => {
    return h(
      LayDescriptionsItem,
      { ...reactiveOmit(reactive(data), "label", "content") },
      {
        default: () => data.content,
        label: () => data.label,
      }
    ) as DescriptionsItemsNode;
  });
};

const setSpan = (
  node: DescriptionsItemsNode,
  span: number,
  count: number,
  isLast = false
) => {
  if (!node.props) {
    node.props = {};
  }
  if (span > count) {
    node.props.span = count;
  }
  if (isLast) {
    node.props.span = span;
  }
  return node;
};

const getRow = () => {
  let children: DescriptionsItemsNode[] = [];

  if (props.dataList && props.dataList.length) {
    children = generateItemVNode(props.dataList);
  } else if (slots?.default) {
    children = flattedChildren(slots.default()).filter(
      (node): node is DescriptionsItemsNode =>
        (node as any)!.type!.name === "LayDescriptionsItem"
    );
  }

  const rows: DescriptionsItemsNode[][] = [];
  let group: DescriptionsItemsNode[] = [];
  let count = props.column;
  let totalSpan = 0;

  children.forEach((child, index) => {
    const span = child.props?.span || 1;

    if (index < children.length - 1) {
      totalSpan += span > count ? count : span;
    }

    if (index === children.length - 1) {
      const lastSpan = props.column - (totalSpan % props.column);
      group.push(setSpan(child, lastSpan, count, true));
      rows.push(group);
      return;
    }

    if (span < count) {
      count -= span;
      group.push(child);
    } else {
      group.push(setSpan(child, span, count));
      rows.push(group);
      count = props.column;
      group = [];
    }
  });

  return rows;
};

provide(DESCRIPTIONS_INJECTION_KEY, {
  ...props,
});
</script>

<template>
  <div :class="descriptionsClasses">
    <div class="layui-descriptions-header" v-if="title || extra">
      <div class="layui-descriptions-header-title">
        <slot name="title">{{ title }}</slot>
      </div>

      <div class="layui-descriptions-header-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>

    <div class="layui-descriptions-body">
      <table :class="{ 'is-border': border }">
        <tbody>
          <template v-for="(row, index) in getRow()" :key="index">
            <lay-descriptions-row :row="row" />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
