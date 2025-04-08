import type { Ref } from "vue";
import type { OriginalTreeData, ReplaceFieldsOptions, TreeData, TreeEmits, TreeProps } from "../interface";

import { isArray, isBoolean, normalizeValue } from "@layui/component/utils";

import { computed, nextTick, ref, watch } from "vue";
import { treeReplaceFields } from "../constant";

export function useTree(props: TreeProps, emits: TreeEmits) {
  /**
   * 树形结构数据
   */
  const treeData: Ref<Array<TreeData>> = ref([]);

  /**
   * 替换字段
   */
  const replaceField = computed<ReplaceFieldsOptions>(() => {
    return Object.assign(
      {},
      treeReplaceFields,
      props.replaceFields,
    );
  });

  /**
   * 将树形结构展开为一维数组
   */
  const flatTree = computed(() => {
    const ret: Array<TreeData> = [];
    const flatter = (target: Array<TreeData>) => {
      target.forEach((item) => {
        ret.push(item);
        if (item.children?.length) {
          flatter(item.children);
        }
      });
    };
    flatter(treeData.value);
    return ret;
  });

  /**
   * 查找mock节点
   */
  const checkedNodesMock = computed(() => flatTree.value.filter(d => d.mock));

  /**
   * 已勾选的节点
   */
  const checkedNodes = computed(() =>
    flatTree.value.filter(
      d => d.checked, // && (props.checkStrictly ? true : !d.children.length)
    ),
  );

  /**
   * 已勾选的节点id
   */
  const checkedKeys = computed(() => checkedNodes.value.map(d => d.id));

  /**
   * 已勾选的节点路径
   */
  const checkedPath = computed(() =>
    checkedNodes.value.map(d => findNodePath(d.id).map(e => e.id)),
  );

  /**
   * 已勾选的节点标题
   */
  const checkedTitle = computed(() => {
    return checkedNodes.value.map(d => d.title);
  });

  /**
   * 已勾选的节点标题路径
   */
  const checkedTitlePath = computed(() =>
    checkedNodes.value.map(d => findNodePath(d.id).map(e => e.title)),

  );

  /**
   * 已展开的节点ID
   */
  const expandedKeys = computed(() =>
    flatTree.value.filter(d => d.expanded).map(d => d.id),
  );

  /**
   * 已展开的节点ID路径
   */
  const expandedPath = computed(() =>
    expandedKeys.value.map(d => findNodePath(d).map(e => e.id)),
  );

  /**
   * init
   */
  watch(
    () => [props.data, props.cacheData],
    () => {
      treeData.value = [];
      const _data = normalizeValue(isArray(props.data) ? props.data : [props.data]);

      init(_data);
    },
    {
      deep: true,
      immediate: true,
    },
  );

  /**
   * init
   */
  function init(data: OriginalTreeData[]) {
    if (!data.length) {
      lazyLoad().catch(console.error);
    }
    else {
      mixin(data);
    }

    if (props.cacheData) {
      mixin(props.cacheData, undefined, true);
    }

    // mock数据剔除
    if (checkedNodesMock.value.length) {
      removeMockNodes(flatTree.value.filter(a => !a.mock).map(a => a.original));
    }
  };

  /**
   * 懒加载
   * @param node 节点
   */
  function lazyLoad(node?: TreeData): Promise<void> {
    return new Promise((resolve) => {
      if (props.lazy) {
        if (!node) {
          props.load?.(undefined, (data: Array<OriginalTreeData>) => {
            data = data.filter(a => a); // 过滤无效节点
            if (data.length) {
              mixin(data);
            }
          });
          return resolve();
        }

        if (node?.children.length || node.leaf) {
          return resolve();
        }

        node.loading = true;
        const disabled = node.disabled;
        if (!disabled) {
          node.disabled = true;
        }

        props.load?.(node.original, (data: Array<OriginalTreeData>) => {
          node.loading = false;
          if (!disabled) {
            node.disabled = false;
          }

          data = data.filter(a => a); // 过滤无效节点
          mixin(data, node.id);
          if (!data.length) {
            node.leaf = true;
          }

          resolve();
        });
      }
      else {
        resolve();
      }
    });
  }

  /**
   * 混入子节点，直接混入原始数据，会自动转换为树形结构
   * @param mixin 需要混入的节点
   * @param parent 父节点id
   * @param mock 是否cacheData
   */
  function mixin(
    mixin: Array<OriginalTreeData>,
    parent?: TreeData["id"],
    mock = false,
  ) {
    if (mixin.length) {
      if (mock) {
        mixin = mixin.map(d => ({ ...d, mock: true })) as Array<OriginalTreeData>;
      }

      if (parent) {
        const _node = flatTree.value.find(d => d.id === parent);
        if (_node) {
          _node.children = [..._node.children, ...normalizeTreeData(mixin, parent)];

          /**
           * 当 checkStrictly 为 false 且点击的节点 checked 为 true 时，
           * 默认将所有加载的子节点（disabled 为 false）的 checked 设置为 true
           */
          // !props.checkStrictly && _node.checked && findAllChildrenNodes(_node.id)?.forEach((child) => {
          //   if (!child.disabled) {
          //     child.checked = true;
          //   }
          // });
        }
      }
      else {
        treeData.value = [...treeData.value, ...normalizeTreeData(mixin)];
      }
    }

    !mock && removeMockNodes(mixin);
    !props.checkStrictly && reloadAllNodeStatus();

    /**
     * 1. 等待props.checkedKeys/expandKeys 第一次初始完，再与props.data中可能包含的checked与expanded/spread为true的节点合并
     * 2. 懒加载的数据存在checked与expanded/spread为true的节点需要与 props.checkedKeys/expandKeys 合并
     */
    nextTick(() => {
      emits("update:expand-keys", expandedKeys.value);
      emits("update:checked-keys", checkedKeys.value);
    });
  }

  /**
   * 节点工厂
   * @param d 原始数据
   */
  function nodeFactory(
    d: OriginalTreeData,
    parent?: string | number,
  ): TreeData {
    return {
      id: d[replaceField.value.id],
      title: d[replaceField.value.title],
      children: [],
      parent,
      disabled: Boolean(d[replaceField.value.disabled] ?? false),
      checked: Boolean(d[replaceField.value.checked] ?? false),
      expanded: Boolean(d[replaceField.value.expanded] ?? false),
      isIndeterminate: false,
      loading: false,
      leaf: Boolean(d[replaceField.value.leaf] ?? false),
      original: d,
      mock: d.mock ?? false,
      slot: d.slot,
      visible: true,
    } as TreeData;
  }

  /**
   * 将原始数据转换为树形结构
   * @param data 原始数据
   * @param parent 父节点
   */
  function normalizeTreeData(
    data: Array<OriginalTreeData>,
    parent?: TreeData["id"],
  ): Array<TreeData> {
    return data.map((d) => {
      const r: TreeData = nodeFactory(d, parent);

      const ch = d[replaceField.value.children] as Array<OriginalTreeData> | undefined;

      r.children = ch?.length ? normalizeTreeData(ch, r.id) : [];
      /**
       * 当 lazy 懒加载 || children.length 有子节点 || slot 存在 子节点自定义渲染时
       * 需要可以展开下一级
       */
      r.leaf = r.leaf || !(props.lazy || r.children.length || r.slot);
      return r;
    });
  }

  /**
   * 去除mock节点
   */
  function removeMockNodes(mixin: Array<OriginalTreeData>) {
    const ids = mixin.map(d => d[replaceField.value.id]);

    checkedNodesMock.value
      .filter(d => ids.includes(d.id))
      .forEach((d) => {
        findMockNodes(d.id)?.forEach((mnode) => {
          // 节点摘除
          const deattached_nodes = ((mock_node) => {
            if (mock_node && mock_node.parent !== undefined) {
              const p = findNode(mock_node?.parent);
              return p?.children.splice(p?.children.indexOf(d), 1);
            }
            else {
              return treeData.value.splice(treeData.value.indexOf(d), 1);
            }
          })(mnode);

          // 状态复制
          deattached_nodes?.forEach((n) => {
            const real_node = findNode(n.id);
            if (real_node) {
              Object.assign(real_node, {
                checked: n.checked,
                isIndeterminate: n.isIndeterminate,
                expanded: n.expanded,
              });
            }
          });
        });
      });
  }

  /**
   * 查找mock节点
   */
  function findMockNodes(
    id?: string | number,
  ): Array<TreeData> | undefined {
    return flatTree.value.filter(d => d.id === id && d.mock);
  }

  /**
   * 重新加载节点状态
   */
  function reloadAllNodeStatus() {
    // 刷新叶子节点
    flatTree.value
      .filter(d => !d.disabled && !d.children.length)
      .forEach((d) => {
        const pNode = findNode(d.parent);
        if (!pNode) {
          return;
        }

        pNode.checked = pNode.children.every(c => c.checked);

        if (!pNode.checked) {
          pNode.isIndeterminate = pNode.children.some(c => c.isIndeterminate || c.checked);
        }
      });

    // 刷新中间节点
    flatTree.value
      .filter(d => !d.disabled && d.parent)
      .forEach((d) => {
        const pNode = findNode(d.parent);
        if (!pNode) {
          return;
        }

        pNode.checked = pNode.children.every(c => c.checked);

        if (!pNode.checked) {
          pNode.isIndeterminate = pNode.children.some(c => c.isIndeterminate || c.checked);
        }
      });

    // 刷新根节点
    flatTree.value
      .filter(d => !d.disabled && !d.parent && d.children.length)
      .forEach((d) => {
        d.checked = d.children.every(c => c.checked);

        if (!d.checked) {
          d.isIndeterminate = d.children.some(c => c.isIndeterminate || c.checked);
        }
      });
  }

  /**
   * 查找节点
   * @param id 节点id
   */
  function findNode(id?: string | number): TreeData | undefined {
    return flatTree.value.find(d => d.id === id && !d.mock);
  }

  /**
   * 查找父节点
   * @param id 节点id
   */
  const findParentNode = (id?: string | number): TreeData | undefined => {
    const node = flatTree.value.find(d => d.id === id);
    return flatTree.value.find(d => d.id === node?.parent);
  };

  /**
   * 查找兄弟节点
   * @param id 节点id
   */
  const findSiblingsNodes = (id?: string | number): Array<TreeData> | undefined => {
    const node = flatTree.value.find(d => d.id === id);
    return node?.parent
      ? flatTree.value.find(d => d.id === node.parent)?.children
      : treeData.value;
  };

  /**
   * 节点向下查找全部叶子节点
   * @param id 节点id
   */
  function findAllLeafNodes(id?: string | number): Array<TreeData> | undefined {
    const node = flatTree.value.find(d => d.id === id);
    if (!node)
      return undefined;
    return normalizeValue(
      node.children.flatMap(n => n.children.length ? findAllLeafNodes(n.id) : n),
    );
  };

  /**
   * 节点向下查找全部节点
   * @param id 节点id
   */
  // function findAllChildrenNodes(id?: string | number): Array<TreeData> | undefined {
  //   const node = flatTree.value.find(d => d.id === id);
  //   if (!node)
  //     return undefined;
  //   return normalizeValue(
  //     node.children.flatMap(n => n.children.length ? [n, ...findAllLeafNodes(n.id)!] : n),
  //   );
  // };

  /**
   * 查找节点路径
   * @param id 节点id
   */
  function findNodePath(id: string | number): TreeData[] {
    let tmp = findNode(id);
    const path = [];
    if (tmp) {
      path.push(tmp);
      while (tmp?.parent) {
        tmp = findNode(tmp.parent);
        if (!tmp) {
          break;
        }

        path.push(tmp);
      }
    }
    return path.reverse();
  }

  watch(
    () => props.defaultExpandAll,
    (val) => {
      /**
       * 非lazy模式，并且外部通过props传了defaultExpandAll生效
       */
      !props.lazy && isBoolean(val) && nextTick(() => {
        flatTree.value.forEach((d) => {
          d.expanded = val;
        });

        if (!props.checkStrictly) {
          reloadAllNodeStatus();
        }
      });
    },
    { immediate: true },
  );

  watch(
    () => props.checkedKeys,
    (val, oldVal) => {
      oldVal
        ?.filter(a => !val?.includes(a))
        ?.forEach((k) => {
          findNode(k) && (findNode(k)!.checked = false);
          findMockNodes(k)?.forEach(a => (a.checked = false));
        });

      val?.forEach((k) => {
        findNode(k) && (findNode(k)!.checked = true);
        findMockNodes(k)?.forEach(a => (a.checked = true));
      });
      if (!props.checkStrictly) {
        reloadAllNodeStatus();
      }
    },
    { immediate: true },
  );

  watch(
    () => props.expandKeys,
    (val, oldVal) => {
      oldVal
        ?.filter(a => !val?.includes(a))
        ?.forEach((k) => {
          findNode(k) && (findNode(k)!.expanded = false);
          findMockNodes(k)?.forEach(a => (a.expanded = false));
        });

      val?.forEach((k) => {
        findNode(k) && (findNode(k)!.expanded = true);
        findMockNodes(k)?.forEach(a => (a.expanded = true));
      });
      if (!props.checkStrictly)
        reloadAllNodeStatus();
    },
    { immediate: true },
  );

  function filter(value: string) {
    const traverse = function (node: TreeData[]) {
      node.forEach((child: TreeData) => {
        const childNodes = child.children as TreeData[];
        child.visible = props.searchNodeMethod!(child.original, value);

        traverse(childNodes);

        if (!child.visible && childNodes.length) {
          let allHidden = true;
          allHidden = !childNodes.some(child => child.visible);

          child.visible = allHidden === false;
        }
        if (!value)
          return;

        if (child.visible && !child.expanded && !props.lazy)
          child.expanded = true;
      });
    };

    traverse(treeData.value);
  }

  return {
    treeData,
    flatTree,
    findNode,
    findMockNodes,
    findNodePath,
    findParentNode,
    findSiblingsNodes,
    findAllLeafNodes,
    lazyLoad,
    reloadAllNodeStatus,
    filter,
    expandedKeys,
    expandedPath,
    checkedKeys,
    checkedPath,
    checkedTitle,
    checkedTitlePath,
  };
}

export type UseTreeReturn = ReturnType<typeof useTree>;
