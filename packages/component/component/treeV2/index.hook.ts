import { computed, ComputedRef, nextTick, Ref, ref, watch } from "vue";
import { OriginalTreeData, TreeData, TreeProps } from "./interface";

type UseTree_ReplaceField = {
  id: string;
  title: string;
  parent: string;
  children: string;
  checked: string;
  disabled: string;
  expanded: string;
  leaf: string;
};

export type UseTree = {
  /**
   * 树形结构数据
   */
  _tree: Ref<TreeData[]>;
  /**
   * 树形结构展开的一维数组
   */
  _flatTree: ComputedRef<TreeData[]>;
  /**
   * 查找父节点
   * @param id 节点id
   */
  _findParent: (id?: string | number) => TreeData | undefined;
  /**
   * 查找兄弟节点
   * @param id 节点id
   */
  _findSiblings: (id?: string | number) => Array<TreeData> | undefined;
  /**
   * 节点向下查找全部叶子节点
   * @param id 节点id
   */
  _findLeafs: (id?: string | number) => Array<TreeData> | undefined;
  /**
   * 懒加载
   * @param node 节点
   */
  _lazyLoad: (node?: TreeData) => Promise<any>;
  /**
   * 重新加载节点状态
   */
  _reloadNodeStatus: () => void;
  /**
   * 已勾选的节点id
   */
  checkedKeys: ComputedRef<(string | number)[]>;
  /**
   * 已勾选的节点路径
   */
  checkedPath: ComputedRef<(string | number)[][]>;
  /**
   * 已勾选的节点标题
   */
  checkedTitle: ComputedRef<string[]>;
  /**
   * 已勾选的节点标题路径
   */
  checkedTitlePath: ComputedRef<string[][]>;
  /**
   * 查找节点
   * @param id 节点id
   */
  _findNode: (id?: string | number) => TreeData | undefined;
  /**
   * 查找mock节点
   */
  _findMockNodes: (id?: string | number) => Array<TreeData> | undefined;
  /**
   * 已展开的节点ID
   */
  expandedKeys: ComputedRef<(string | number)[]>;
};

const useTree = (props: TreeProps): UseTree => {
  /**
   * 原始数据内部缓存
   */
  const _data = ref(props.data ?? []);
  /**
   * 树形结构数据
   */
  const _tree: Ref<Array<TreeData>> = ref([]);

  /**
   * 替换字段
   */
  const _replaceField: ComputedRef<UseTree_ReplaceField> = computed(() => {
    return Object.assign(
      {
        id: "id",
        title: "title",
        parent: "parent",
        children: "children",
        checked: "checked",
        disabled: "disabled",
        expanded: "spread",
        leaf: "leaf",
      },
      props.replaceFields
    );
  });

  /**
   * 节点工厂
   * @param d 原始数据
   */
  const _nodeFactory = (
    d: OriginalTreeData,
    parent?: string | number
  ): TreeData => {
    return {
      id: d[_replaceField.value.id],
      title: d[_replaceField.value.title],
      children: [],
      parent,
      disabled: Boolean(d[_replaceField.value.disabled] ?? false),
      checked: Boolean(d[_replaceField.value.checked] ?? false),
      expanded: Boolean(d[_replaceField.value.expanded] ?? false),
      indeterminated: false,
      loading: false,
      leaf: Boolean(d[_replaceField.value.leaf] ?? false),
      original: d,
      mock: d.mock ?? false,
      slot: d.slot,
    } as TreeData;
  };

  /**
   * 将原始数据转换为树形结构
   * @param data 原始数据
   * @param parent 父节点
   */
  const _normalize = (
    data: Array<OriginalTreeData>,
    parent?: string | number
  ): Array<TreeData> => {
    return data.map((d) => {
      const r: TreeData = _nodeFactory(d, parent);
      const ch = d[_replaceField.value.children] as
        | Array<OriginalTreeData>
        | undefined;
      r.children = ch?.length ? _normalize(ch, r.id) : [];
      r.leaf = r.leaf || (!props.lazy && !r.children.length);
      return r;
    });
  };

  /**
   * 将树形结构展开为一维数组
   */
  const _flatTree = computed(() => {
    const ret: Array<TreeData> = [];
    const flatter = (target: Array<TreeData>) => {
      target.forEach((item) => {
        ret.push(item);
        if (item.children?.length) {
          flatter(item.children);
        }
      });
    };
    flatter(_tree.value);
    return ret;
  });

  /**
   * 懒加载
   * @param node 节点
   */
  const _lazyLoad = (node?: TreeData) => {
    return new Promise(() => {
      if (props.lazy) {
        if (!node) {
          props.load?.(undefined, (data: Array<OriginalTreeData>) =>
            mixin(data)
          );
          return;
        }

        if (node?.children.length || node.leaf) return;
        node.loading = true;
        const disabled = node.disabled;
        if (!disabled) node.disabled = true;
        props.load?.(node, (data: Array<OriginalTreeData>) => {
          node.loading = false;
          if (!disabled) node.disabled = false;
          data = data.filter((a) => a); // 过滤无效节点
          mixin(data, node.id);
          if (!data.length) node.leaf = true;
        });
      }
    });
  };

  /**
   * 混入子节点，直接混入原始数据，会自动转换为树形结构
   * @param mixin 需要混入的节点
   * @param parent 父节点id
   * @param mock 是否cacheData
   */
  const mixin = (
    mixin: Array<OriginalTreeData>,
    parent?: string | number,
    mock = false
  ) => {
    if (mixin.length) {
      if (mock) mixin = mixin.map((d) => Object({ ...d, mock: true }));
      if (parent) {
        const _node = _flatTree.value.find((d) => d.id === parent);
        if (_node)
          _node.children = [..._node.children, ..._normalize(mixin, parent)];
      } else _tree.value = [..._tree.value, ..._normalize(mixin)];
    }
    if (!mock) removeMockNodes(mixin);
    if (!props.checkStrictly) _reloadNodeStatus();
  };

  /**
   * 去除mock节点
   */
  const removeMockNodes = (mixin: Array<OriginalTreeData>) => {
    const ids = mixin.map((d) => d[_replaceField.value.id]);
    _mocked_nodes.value
      .filter((d) => ids.includes(d.id))
      .forEach((d) => {
        _find_mock_nodes(d.id)?.forEach((mnode) => {
          // 节点摘除
          const deattached_nodes = ((mock_node) => {
            if (mock_node && mock_node.parent !== undefined) {
              const p = _find_node(mock_node?.parent);
              return p?.children.splice(p?.children.indexOf(d), 1);
            } else {
              return _tree.value.splice(_tree.value.indexOf(d), 1);
            }
          })(mnode);

          // 状态复制
          deattached_nodes?.forEach((n) => {
            const real_node = _find_node(n.id);
            if (real_node)
              Object.assign(real_node, {
                checked: n.checked,
                indeterminated: n.indeterminated,
                expanded: n.expanded,
              });
          });
        });
      });
  };

  /**
   * 重新加载节点状态
   */
  const _reloadNodeStatus = () => {
    // 刷新叶子节点
    _flatTree.value
      .filter((d) => !d.disabled && !d.children.length)
      .forEach((d) => {
        const pnode = _find_node(d.parent);
        if (!pnode) return;
        pnode.checked = pnode.children.every((c) => c.checked);
        pnode.indeterminated =
          pnode.children.some((c) => c.indeterminated || c.checked) &&
          !pnode.checked;
      });
    // 刷新中间节点
    _flatTree.value
      .filter((d) => !d.disabled && d.parent)
      .forEach((d) => {
        const pnode = _find_node(d.parent);
        if (!pnode) return;
        pnode.checked = pnode.children.every((c) => c.checked);
        pnode.indeterminated =
          pnode.children.some((c) => c.indeterminated || c.checked) &&
          !pnode.checked;
      });
    // 刷新根节点
    _flatTree.value
      .filter((d) => !d.disabled && !!d.parent && d.children.length)
      .forEach((d) => {
        d.checked = d.children.every((c) => c.checked);
        d.indeterminated =
          d.children.some((c) => c.indeterminated || c.checked) && !d.checked;
      });
  };

  /**
   * 查找节点
   * @param id 节点id
   */
  const _find_node = (id?: string | number): TreeData | undefined =>
    _flatTree.value.find((d) => d.id === id && !d.mock);
  /**
   * 查找父节点
   * @param id 节点id
   */
  const _findParent = (id?: string | number): TreeData | undefined => {
    const node = _flatTree.value.find((d) => d.id === id);
    return _flatTree.value.find((d) => d.id === node?.parent);
  };
  /**
   * 查找兄弟节点
   * @param id 节点id
   */
  const _findSiblings = (id?: string | number): Array<TreeData> | undefined => {
    const node = _flatTree.value.find((d) => d.id === id);
    return node?.parent
      ? _flatTree.value.find((d) => d.id === node.parent)?.children
      : _tree.value;
  };
  /**
   * 节点向下查找全部叶子节点
   * @param id 节点id
   */
  const _findLeafs = (id?: string | number): Array<TreeData> | undefined => {
    const node = _flatTree.value.find((d) => d.id === id);
    if (!node) return undefined;
    return node.children
      .flatMap((n) => (n.children.length ? _findLeafs(n.id) : n))
      .filter((n) => !!n);
  };
  /**
   * 查找mock节点
   */
  const _find_mock_nodes = (
    id?: string | number
  ): Array<TreeData> | undefined =>
    _flatTree.value.filter((d) => d.id === id && d.mock);
  /**
   * 查找节点路径
   * @param id 节点id
   */
  const _find_path = (id: string | number) => {
    let tmp = _find_node(id);
    const path = [];
    if (tmp) {
      path.push(tmp);
      while (tmp?.parent && (tmp = _find_node(tmp.parent))) {
        path.push(tmp);
      }
    }
    return path.reverse();
  };
  /**
   * 已勾选的节点
   */
  const _checked_nodes = computed(() =>
    _flatTree.value.filter(
      (d) => d.checked && (props.checkStrictly ? true : !d.children.length)
    )
  );
  /**
   * 已勾选的mock节点
   */
  const _mocked_nodes = computed(() => _flatTree.value.filter((d) => d.mock));
  /**
   * 已勾选的节点id
   */
  const checkedKeys = computed(() => _checked_nodes.value.map((d) => d.id));
  /**
   * 已勾选的节点路径
   */
  const checkedPath = computed(() =>
    _checked_nodes.value.map((d) => _find_path(d.id).map((e) => e.id))
  );
  /**
   * 已勾选的节点标题
   */
  const checkedTitle = computed(() => _checked_nodes.value.map((d) => d.title));
  /**
   * 已勾选的节点标题路径
   */
  const checkedTitlePath = computed(() =>
    _checked_nodes.value.map((d) => _find_path(d.id).map((e) => e.title))
  );
  /**
   * 已展开的节点ID
   */
  const expandedKeys = computed(() =>
    _flatTree.value.filter((d) => d.expanded).map((d) => d.id)
  );

  if (!_data.value.length) _lazyLoad();
  else mixin(_data.value);
  if (props.cacheData) mixin(props.cacheData, undefined, true);

  // mock数据剔除
  if (_mocked_nodes.value.length)
    removeMockNodes(
      _flatTree.value.filter((a) => !a.mock).map((a) => a.original)
    );

  watch(
    () => props.defaultExpandAll,
    (val) => {
      nextTick(() => {
        _flatTree.value.forEach((d) => (d.expanded = Boolean(val)));
        if (!props.checkStrictly) _reloadNodeStatus();
      });
    },
    { immediate: true }
  );
  watch(
    () => props.checkedKeys,
    (val) => {
      val?.forEach((k) => _find_node(k) && (_find_node(k)!.checked = true));
      val?.forEach((k) =>
        _find_mock_nodes(k)?.forEach((a) => (a.checked = true))
      );
      if (!props.checkStrictly) _reloadNodeStatus();
    },
    { immediate: true }
  );
  watch(
    () => props.expandKeys,
    (val) => {
      val?.forEach((k) => _find_node(k) && (_find_node(k)!.expanded = true));
      val?.forEach((k) =>
        _find_mock_nodes(k)?.forEach((n) => (n.expanded = true))
      );
      if (!props.checkStrictly) _reloadNodeStatus();
    },
    { immediate: true }
  );

  return {
    _tree,
    _flatTree,
    _findNode: _find_node,
    _findMockNodes: _find_mock_nodes,
    _findParent,
    _findSiblings,
    _findLeafs,
    _lazyLoad,
    _reloadNodeStatus,
    expandedKeys,
    checkedKeys,
    checkedPath,
    checkedTitle,
    checkedTitlePath,
  };
};

export { useTree };
