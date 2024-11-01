<template>
  <div
    v-for="(item, index) in tree ?? _tree"
    :key="index"
    :class="[
      'layui-tree-set',
      {
        'layui-tree-set-end': !props.standalone ? hasShortDash(item) : false,
      },
    ]"
  >
    <div
      :class="[
        'layui-tree-entry',
        {
          'layui-this': selectedKey === item.id,
        },
      ]"
    >
      <div class="layui-tree-main">
        <span
          :class="[
            'layui-tree-iconClick',
            `layui-tree-icon-${
              shouldIconBorder(item) ? 'border' : 'no-border'
            }`,
            `layui-tree-icon-${
              nodeIconType(item).length ? 'pad-left' : 'no-pad-left'
            }`,
          ]"
          @click.capture="handleIconClick($event, item)"
        >
          <lay-icon :type="nodeIconType(item)" />
        </span>
        <LayCheckbox
          :value="item.checked ? 1 : 0"
          skin="primary"
          v-model="item.checked"
          :disabled="item.disabled"
          :isIndeterminate="item.indeterminated"
          @change="handleItemCheck($event, item)"
          v-if="showCheckbox"
        />
        <lay-icon
          v-if="item.loading"
          class="layui-tree-loading layui-anim layui-anim-rotate layui-anim-loop"
          type="layui-icon-loading"
        />
        <LayRender :outProps="{ item }" :render="slots.title ?? 'default'">
          <span
            @dblclick="handleItemDblclick($event, item)"
            @contextmenu="handleItemContextmenu($event, item)"
            @click="handleItemClick($event, item)"
            class="layui-tree-txt"
            >{{ item.title }}</span
          >
        </LayRender>
      </div>
    </div>
    <lay-transition :enable="collapseTransition">
      <div
        v-if="item.expanded"
        class="layui-tree-pack"
        :class="[{ 'layui-tree-showLine': showLine }]"
        style="display: block"
      >
        <LayRender :outProps="{ item }" :render="slots[item.slot] ?? 'default'">
          <tree-node
            @update-checked-keys="emitCheckedKeys"
            @update-selected-key="emitSelectedKey"
            @update-expanded-keys="emitExpandedKeys"
            @node-check="emitNodeCheck"
            @node-click="emitNodeClick"
            v-bind="props"
            :slots="slots"
            :tree="item.children"
          ></tree-node>
        </LayRender>
      </div>
    </lay-transition>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, watch } from "vue";
import { TREE_CONTEXT, TreeData, TreeProps } from "./interface";
import { UseTree } from "./index.hook";
import LayCheckbox from "../checkboxV2/index";
import { LayIcon } from "@layui/icons-vue";
import LayTransition from "../transition/index";
import { isArray, isFunction } from "../../utils";
import LayRender from "../_components/render";

const props = withDefaults(
  defineProps<
    TreeProps & {
      slots: any;
    }
  >(),
  {}
);

const emit = defineEmits<{
  (e: "update-selected-key", key: TreeData): void;
  (e: "update-checked-keys", keys: Array<string | number>): void;
  (e: "update-expanded-keys", keys: Array<string | number>): void;
  (e: "node-click", key: TreeData): void;
  (e: "node-check", key: TreeData): void;
}>();

let {
  _tree,
  _flatTree,
  _lazyLoad,
  _findNode,
  _findNodePath,
  _findSiblings,
  _findLeafs,
  _reloadNodeStatus,
  checkedKeys,
  expandedKeys,
  expandedPath,
} = inject(TREE_CONTEXT) as UseTree;

const hasShortDash = (node: TreeData) => {
  const siblings = _findSiblings(node.parent) ?? [];
  return siblings.findIndex((i) => i.id === node.id) === siblings.length - 1;
};

const nodeIconType = (node: TreeData): string => {
  if (isFunction(props.tailNodeIcon)) return props.tailNodeIcon(node) as string;
  if (isArray(node.icon) && node.icon.length == 2)
    return node.expanded ? node.icon[0] : node.icon[1];

  if (node.children.length) {
    if (!props.showLine)
      return node.expanded ? "layui-icon-triangle-d" : "layui-icon-triangle-r";
    else
      return node.expanded ? "layui-icon-subtraction" : "layui-icon-addition";
  } else if (props.tailNodeIcon) return props.tailNodeIcon as string;

  return !props.lazy ? "" : "";
};

const shouldIconBorder = (node: TreeData) => {
  const _iconName = nodeIconType(node);
  if (["layui-icon-subtraction", "layui-icon-addition"].includes(_iconName))
    return true;
  return isFunction(props.shouldIconBorder)
    ? Boolean(props.shouldIconBorder(_iconName))
    : false;
};

const emitSelectedKey = (node: TreeData) => emit("update-selected-key", node);
const emitNodeClick = (node: TreeData) => emit("node-click", node);
const emitNodeCheck = (node: TreeData) => emit("node-check", node);
const emitCheckedKeys = () =>
  emit("update-checked-keys", checkedKeys.value ?? []);
const emitExpandedKeys = () => {
  emit(
    "update-expanded-keys",
    _flatTree.value.filter((i) => i.expanded).map((i) => i.id) ?? []
  );
};

const stopEventPopup = (e: Event) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  e.preventDefault();
};

const handleIconClick = (e: MouseEvent, item: TreeData) => {
  emitNodeClick(item);
  if (props.nodeClick && props.nodeClick(item)) return stopEventPopup(e);
  item.expanded = !item.expanded;
  _lazyLoad(item).catch(() => {});

  if (props.accordion) {
    const _curNodeIdPath = _findNodePath(item.id).map((a) => a.id);
    const _expandedPath = expandedPath.value;

    // 异树，在根节点切换
    const _diff_tree = _expandedPath
      .filter((a) => a.at(0) !== _curNodeIdPath.at(0))
      .map((b) => _findNode(b.at(0)))
      .filter((c) => !!c);
    // 同树，在同层节点切换
    const _same_tree =
      _curNodeIdPath.length >= 2 &&
      _expandedPath
        .filter(
          (a) =>
            a.length === _curNodeIdPath.length &&
            a.at(0) === _curNodeIdPath.at(0) &&
            a.at(-1) !== _curNodeIdPath.at(-1)
        )
        .map((b) => _findNode(b.at(-1)))
        .filter((d) => !!d)
        .filter((e) => e.expanded);

    _diff_tree.forEach((a) => (a.expanded = false));
    _same_tree && _same_tree.forEach((a) => (a.expanded = false));
  }

  emitExpandedKeys();
};

const handleItemClick = (e: MouseEvent, item: TreeData) => {
  if (props.onlyIconControl) return;
  if (!props.showCheckbox) emitSelectedKey(item);
  handleIconClick(e, item);
};

const handleItemDblclick = (e: MouseEvent, item: TreeData) => {
  if (props.nodeDblClick && props.nodeDblClick(item)) return stopEventPopup(e);
};

const handleItemContextmenu = (e: MouseEvent, item: TreeData) => {
  if (props.nodeContextMenu && props.nodeContextMenu(item))
    return stopEventPopup(e);
};

const handleItemCheck = (checked: boolean, item: TreeData) => {
  const job = (item: TreeData) => {
    // 严格模式下直接勾选，然后更新状态
    if (props.checkStrictly) {
      item.checked = checked;
      emitNodeCheck(item);
      emitCheckedKeys();
      return;
    }

    const leafs = _findLeafs(item.id);
    // 非严格模式下，要检查这个节点下面的叶子节点是否有禁用的，如果有禁用的就跳过
    if (leafs && item.indeterminated && checked)
      checked = leafs.every((i) => !i.disabled);

    leafs
      ?.filter((i) => !i.disabled)
      .forEach((i) => (i.checked = checked) && emitNodeCheck(i));

    // 如果没有更深的叶子，那说明是节点自己勾选了就把自身emit出去
    if (!leafs?.length) emitNodeCheck(item);
    emitCheckedKeys();
    _reloadNodeStatus();
  };

  if (item.disabled) return;

  if (props.loadOnCheck)
    _lazyLoad(item)
      .catch(console.warn)
      .finally(() => job(item));
  else job(item);
};

watch(
  () => checkedKeys.value,
  (val) => emit("update-checked-keys", val)
);

watch(
  () => expandedKeys.value,
  (val) => emit("update-expanded-keys", val)
);

onMounted(() => {
  if (props.checkedKeys) emit("update-checked-keys", checkedKeys.value);
  if (props.expandKeys) emit("update-expanded-keys", expandedKeys.value);
});

defineOptions({
  name: "TreeNode",
});
</script>
