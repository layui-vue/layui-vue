import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { useTree } from "../hooks/useTree";

describe("hook", () => {
  it("should work", async () => {
    const { flatTree } = useTree({
      data: [
        {
          id: 1,
          title: 2,
          children: [
            {
              id: 3,
              title: 4,
            },
          ],
        },
        {
          id: 2,
          title: 3,
        },
      ],
    }, () => {});

    expect(flatTree.value).toEqual([
      {
        id: 1,
        title: 2,
        children: [
          {
            id: 3,
            title: 4,
            children: [],
            disabled: false,
            expanded: false,
            checked: false,
            isIndeterminate: false,
            parent: 1,
            leaf: true,
            loading: false,
            mock: false,
            original: {
              id: 3,
              title: 4,
            },
            slot: undefined,
            visible: true,
          },
        ],
        disabled: false,
        expanded: false,
        checked: false,
        isIndeterminate: false,
        parent: undefined,
        leaf: false,
        loading: false,
        mock: false,
        original: {
          id: 1,
          title: 2,
          children: [
            {
              id: 3,
              title: 4,
            },
          ],
        },
        slot: undefined,
        visible: true,
      },
      {
        id: 3,
        title: 4,
        children: [],
        disabled: false,
        expanded: false,
        checked: false,
        isIndeterminate: false,
        parent: 1,
        leaf: true,
        loading: false,
        mock: false,
        slot: undefined,
        visible: true,
        original: {
          id: 3,
          title: 4,
        },
      },
      {
        id: 2,
        title: 3,
        children: [],
        disabled: false,
        expanded: false,
        checked: false,
        isIndeterminate: false,
        parent: undefined,
        leaf: true,
        loading: false,
        mock: false,
        slot: undefined,
        visible: true,
        original: {
          id: 2,
          title: 3,
        },
      },
    ]);
  });

  it("should work with replaceField", async () => {
    const { flatTree } = useTree({
      data: [
        {
          id: 1,
          label: "A",
        },
      ],
      replaceFields: {
        title: "label",
      },
    }, () => {});

    expect(flatTree.value).toEqual([
      {
        id: 1,
        title: "A",
        children: [],
        disabled: false,
        expanded: false,
        checked: false,
        isIndeterminate: false,
        parent: undefined,
        leaf: true,
        loading: false,
        mock: false,
        slot: undefined,
        visible: true,
        original: {
          id: 1,
          label: "A",
        },
      },
    ]);
  });

  it("should work with loading", async () => {
    const { flatTree, lazyLoad } = useTree({
      data: [],
      lazy: true,
      load: (node, resolve) => {
        if (!node) {
          resolve([
            { id: 1, title: "A" },
            { id: 2, title: "B" },
          ]);
        }
        else {
          resolve([
            {
              id: node.id + 1000,
              title: `node${node.id + 1000}`,
            },
          ]);
        }
      },
    }, () => {});

    expect(flatTree.value.length).toBe(2);
    lazyLoad(flatTree.value[0]);
    await nextTick();
    expect(flatTree.value.length).toBe(3);
  });

  it("should work with loading and replaceField", async () => {
    const { flatTree, lazyLoad } = useTree({
      data: [],
      replaceFields: {
        title: "label",
      },
      lazy: true,
      load: (node, resolve) => {
        if (!node) {
          resolve([
            { id: 1, label: "A" },
            { id: 2, label: "B" },
          ]);
        }
        else {
          resolve([
            {
              id: node.id + 1000,
              label: `node${node.id + 1000}`,
            },
          ]);
        }
      },
    }, () => {});

    expect(flatTree.value.length).toBe(2);
    lazyLoad(flatTree.value[0]);
    await nextTick();
    expect(flatTree.value.length).toBe(3);
  });

  it("should work with checked", async () => {
    const { checkedKeys, checkedPath, checkedTitle, checkedTitlePath }
      = useTree({
        data: [
          {
            id: 1,
            title: "A",
            children: [
              {
                id: 2,
                title: "B",
                checked: true,
              },
            ],
          },
          {
            id: 3,
            title: "C",
            children: [
              {
                id: 4,
                title: "D",
                checked: true,
              },
            ],
          },
        ],
      }, () => {});

    await nextTick();

    expect(checkedKeys.value).toEqual([1, 2, 3, 4]);
    expect(checkedPath.value).toEqual([[1], [1, 2], [3], [3, 4]]);
    expect(checkedTitle.value).toEqual(["A", "B", "C", "D"]);
    expect(checkedTitlePath.value).toEqual([
      ["A"],
      ["A", "B"],
      ["C"],
      ["C", "D"],
    ]);
  });

  it("should work with checked and strictly", async () => {
    const { checkedKeys, checkedPath, checkedTitle, checkedTitlePath }
      = useTree({
        checkStrictly: true,
        data: [
          {
            id: 1,
            title: "A",
            children: [
              {
                id: 2,
                title: "B",
                checked: true,
              },
            ],
          },
          {
            id: 3,
            title: "C",
            children: [
              {
                id: 4,
                title: "D",
                checked: true,
              },
            ],
          },
        ],
      }, () => {});

    expect(checkedKeys.value).toEqual([2, 4]);
    expect(checkedPath.value).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(checkedTitle.value).toEqual(["B", "D"]);
    expect(checkedTitlePath.value).toEqual([
      ["A", "B"],
      ["C", "D"],
    ]);
  });

  it("should work with mock data", async () => {
    const { flatTree, lazyLoad, checkedKeys } = useTree({
      data: [],
      cacheData: [{ id: 1001, title: "node1001", checked: true }],
      lazy: true,
      load: (node, resolve) => {
        if (!node) {
          resolve([
            { id: 1, title: "A" },
            { id: 2, title: "B" },
          ]);
        }
        else {
          resolve([
            {
              id: node.id + 1000,
              title: `node${node.id + 1000}`,
            },
          ]);
        }
      },
    }, () => {});

    await nextTick();
    expect(flatTree.value.length).toBe(3);
    expect(flatTree.value.filter(item => item.mock).length).toBe(1);
    expect(checkedKeys.value.includes(1001)).toBeTruthy();
    lazyLoad(flatTree.value[0]);
    await nextTick();
    expect(flatTree.value.length).toBe(3);
    expect(flatTree.value.filter(item => item.mock).length).toBe(0);
    expect(checkedKeys.value.includes(1001)).toBeTruthy();
  });

  // it("should work with checkedKeys", async () => {
  //   const { checkedKeys, findNode } = useTree({
  //     data: [
  //       {
  //         id: 1,
  //         title: "A",
  //       },
  //       {
  //         id: 2,
  //         title: "B",
  //       },
  //       {
  //         id: 3,
  //         title: "C",
  //         checked: true,
  //       },
  //     ],
  //     checkedKeys: [1, 2],
  //   }, () => {});

  //   await nextTick();

  //   expect(checkedKeys.value).toEqual([1, 2, 3]);
  //   expect(findNode(1)?.checked).toBeTruthy();
  //   expect(findNode(2)?.checked).toBeTruthy();
  //   expect(findNode(3)?.checked).toBeTruthy();
  // });

  // it("should work with expandKeys", async () => {
  //   const { findNode } = useTree({
  //     data: [
  //       {
  //         id: 1,
  //         title: "A",
  //       },
  //       {
  //         id: 2,
  //         title: "B",
  //       },
  //       {
  //         id: 3,
  //         title: "C",
  //         spread: true,
  //       },
  //     ],
  //     expandKeys: [1, 2],
  //   }, () => {});

  //   await nextTick();

  //   expect(findNode(1)?.expanded).toBeTruthy();
  //   expect(findNode(2)?.expanded).toBeTruthy();
  //   expect(findNode(3)?.expanded).toBeTruthy();
  // });
});
