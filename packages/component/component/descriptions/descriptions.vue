<script setup lang="tsx">
import "./index.less";
import type { VNode } from "vue";
import type { DescriptionsProps as _DescriptionsProps } from "./interface";

import { computed, useSlots, provide } from "vue";
import { flattedChildren } from "../../utils";
import { DESCRIPTIONS_INJECTION_KEY } from "./descriptions";

import LayDescriptionsItem from "../descriptionsItem";
import LayDescriptionsRow from "./descriptions-row";

export type DescriptionsProps = _DescriptionsProps;

const props = withDefaults(defineProps<DescriptionsProps>(), {
  dataList: [],
  direction: "horizontal",
  size: "md",
  column: 3,
});

defineOptions({
  name: "LayDescriptions",
});

const slots = useSlots();

const descriptionsClasses = computed(() => {
  return ["layui-descriptions", `layui-descriptions-${props.size}`];
});

const generateItemVNode = (dataList): VNode[] => {
  return dataList.map((data) => {
    return <LayDescriptionsItem {...data}></LayDescriptionsItem>;
  });
};

const filledNode = (
  node: VNode,
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
    // set the last span
    node.props.span = span;
  }
  return node;
};

const getRow = () => {
  let children: VNode[] = [];

  if (props.dataList.length) {
    children = generateItemVNode(props.dataList);
  } else if (slots?.default) {
    children = flattedChildren(slots.default()).filter(
      (node: any) => (node!.type!.name = "LayDescriptionsItem")
    );
  }

  const rows: any[][] = [];
  let group: any[] = [];
  let count = props.column;
  let totalSpan = 0;

  children.forEach((child, index) => {
    const span = child.props?.span || 1;

    if (index < children.length - 1) {
      totalSpan += span > count ? count : span;
    }

    if (index === children.length - 1) {
      const lastSpan = props.column - (totalSpan % props.column);
      group.push(filledNode(child, lastSpan, count, true));
      rows.push(group);
      return;
    }

    if (span < count) {
      count -= span;
      group.push(child);
    } else {
      group.push(filledNode(child, span, count));
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
    <div class="layui-descriptions-header">
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
