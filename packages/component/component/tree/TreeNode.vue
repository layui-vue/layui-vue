<script lang="ts" setup>
import type { TreeData, TreeNodeProps } from "./interface";

import LayRender from "@layui/component/component/_components/render";
import LayCheckbox from "@layui/component/component/checkboxV2/index";
import LayTransition from "@layui/component/component/transition/index";
import { isFunction, isString, normalizeValue } from "@layui/component/utils";
import { LayIcon } from "@layui/icons-vue";
import { inject } from "vue";

import { LAY_TREE_CONTEXT } from "./constant";

defineOptions({
  name: "LayTreeNode",
});

const props = withDefaults(defineProps<TreeNodeProps>(), {});

const {
  treeEmits,
  treeSlots,

  useTreeData:
  { treeData, flatTree, lazyLoad, findNode, findNodePath, findSiblingsNodes, findAllLeafNodes, reloadAllNodeStatus, checkedKeys, expandedPath },
} = inject(LAY_TREE_CONTEXT)!;

function hasShortDash(node: TreeData) {
  const siblings = findSiblingsNodes(node.parent) ?? [];
  return siblings.findIndex(i => i.id === node.id) === siblings.length - 1;
}

function nodeIconType(node: TreeData): string {
  if (isFunction(props.tailNodeIcon)) {
    return props.tailNodeIcon(node) as string;
  }

  if (node.children.length || !node.leaf) {
    if (!props.showLine) {
      return node.expanded ? "layui-icon-triangle-d" : "layui-icon-triangle-r";
    }
    else {
      return node.expanded ? "layui-icon-subtraction" : "layui-icon-addition";
    }
  }
  else if (!props.showLine) {
    return "";
  }

  else if (props.tailNodeIcon) {
    return props.tailNodeIcon as string;
  }

  return "";
}

function shouldIconBorder(node: TreeData) {
  const _iconName = nodeIconType(node);
  if (["layui-icon-subtraction", "layui-icon-addition"].includes(_iconName)) {
    return true;
  }

  return isFunction(props.shouldIconBorder)
    ? Boolean(props.shouldIconBorder(_iconName))
    : false;
}

async function doNodeSwitch(e: MouseEvent, item: TreeData) {
  await lazyLoad(item);
  item.expanded = !item.expanded;

  if (props.accordion) {
    const _curNodeIdPath = findNodePath(item.id).map(a => a.id);
    const _expandedPath = expandedPath.value;

    // 异树，在根节点切换
    const _diff_tree = normalizeValue(_expandedPath
      .filter(a => a.at(0) !== _curNodeIdPath.at(0))
      .map(b => findNode(b.at(0))));

    // 同树，在同层节点切换
    const _same_tree
      = _curNodeIdPath.length >= 2
        && normalizeValue(_expandedPath
          .filter(
            a =>
              a.length === _curNodeIdPath.length
              && a.at(0) === _curNodeIdPath.at(0)
              && a.at(-1) !== _curNodeIdPath.at(-1),
          )
          .map(b => findNode(b.at(-1))))
          .filter(e => e.expanded);

    _diff_tree.forEach(a => (a.expanded = false));
    _same_tree && _same_tree.forEach(a => (a.expanded = false));
  }

  treeEmits(
    "update:expand-keys",
    flatTree.value.filter(i => i.expanded).map(i => i.id) ?? [],
  );

  treeEmits("update:checked-keys", checkedKeys.value);
}

function handleIconClick(e: MouseEvent, item: TreeData) {
  doNodeSwitch(e, item);
}

function handleNodeClick(e: MouseEvent, item: TreeData) {
  if (!item.disabled) {
    // if (!props.showCheckbox) {
    treeEmits("update:selected-key", item.id);
    // }

    treeEmits("node-click", item.original);
  }

  if (!props.onlyIconControl) {
    doNodeSwitch(e, item);
  }
}

function handleItemDblclick(e: MouseEvent, item: TreeData) {
  e.stopPropagation();
  e.preventDefault();

  treeEmits("node-double", e, item.original);
}

function handleItemContextmenu(e: MouseEvent, item: TreeData) {
  e.stopPropagation();
  e.preventDefault();

  treeEmits("node-contextmenu", e, item.original);
}

function handleCheckboxChange(checked: boolean, item: TreeData) {
  const job = (item: TreeData) => {
    // 严格模式下直接勾选，然后更新状态
    if (props.checkStrictly) {
      item.checked = checked;

      treeEmits("check-change", item.original, checked);

      treeEmits("update:checked-keys", checkedKeys.value ?? []);
      return;
    }

    const leafs = findAllLeafNodes(item.id);
    // 非严格模式下，如果在子节点有禁用的，子树根节点必然不是 checked，此时简单置 checked 为 false 即可
    if (item.isIndeterminate) {
      checked = false;
    };
    leafs
      ?.filter(i => !i.disabled)
      .forEach((i) => {
        i.checked = checked;
      });

    reloadAllNodeStatus();

    // 等待 reloadAllNodeStatus 所有节点状态更新完，再emit当前节点checked状态
    treeEmits("check-change", item.original, item.checked);
    treeEmits("update:checked-keys", checkedKeys.value);
  };

  if (props.loadOnCheck) {
    lazyLoad(item)
      .catch(console.warn)
      .finally(() => job(item));
  }
  else {
    job(item);
  }
}
</script>

<template>
  <div class="layui-tree-block">
    <div
      v-for="(node, index) in tree ?? treeData ?? []"
      v-show="!node.mock && node.visible"
      :key="index"
      class="layui-tree-set" :class="[
        {
          'layui-tree-set-end': !props.standalone ? hasShortDash(node) : false,
        },
      ]"
    >
      <div
        class="layui-tree-entry" :class="[
          {
            'layui-this': selectedKey === node.id,
          },
        ]"
      >
        <div class="layui-tree-main">
          <span
            class="layui-tree-iconClick"
            :class="[
              `layui-tree-icon-${
                shouldIconBorder(node) ? 'border' : 'no-border'
              }`,
              `layui-tree-icon-${
                nodeIconType(node).length ? 'pad-left' : 'no-pad-left'
              }`,
            ]"
            @click.capture="handleIconClick($event, node)"
          >
            <LayIcon :type="nodeIconType(node)" />
          </span>

          <LayCheckbox
            v-if="showCheckbox"
            v-model="node.checked"
            :value="node.checked ? 1 : 0"
            skin="primary"
            :disabled="node.disabled"
            :is-indeterminate="node.isIndeterminate"
            @change="handleCheckboxChange($event, node)"
          />

          <LayIcon
            v-if="node.loading"
            class="layui-tree-loading layui-anim layui-anim-rotate layui-anim-loop"
            type="layui-icon-loading"
          />

          <span
            class="layui-tree-txt"
            :class="[node.disabled && 'layui-disabled']"
            @dblclick="handleItemDblclick($event, node)"
            @contextmenu="handleItemContextmenu($event, node)"
            @click="handleNodeClick($event, node)"
          >
            <LayRender v-if="treeSlots.title" :data="node.original" :slots="treeSlots" render="title" />
            <template v-else>{{ node.title }}</template>
          </span>
        </div>
      </div>

      <LayTransition :enable="collapseTransition">
        <div
          v-if="node.expanded"
          class="layui-tree-pack"
          :class="[{ 'layui-tree-showLine': showLine }]"
        >
          <LayRender
            v-if="(isString(node.slot) && treeSlots[node.slot]) || isFunction(node.slot)"
            :render="node.slot"
            :slots="treeSlots"
            :data="node.original"
          />

          <tree-node
            v-else
            v-bind="props"
            :tree="node.children"
          />
        </div>
      </LayTransition>
    </div>
  </div>
</template>
