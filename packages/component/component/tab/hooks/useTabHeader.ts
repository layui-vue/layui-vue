import type { RenderFunc } from "@layui/component/component/_components/render";
import type { TabItemVNode } from "../components/interface";

import type { TabProps } from "../interface";
import LayIcon from "@layui/component/component/icon";
import { clsPrefix, isFunction, isString } from "@layui/component/utils";

import { computed, createTextVNode, Fragment, h } from "vue";

export function useTabHeader(props: TabProps) {
  const classTabHead = computed(() => {
    return [
      clsPrefix("tab-head"),
      {
        [`is-${props.tabPosition}`]: props.tabPosition,
      },
    ];
  });

  const classTabTitle = computed(() => {
    return [
      clsPrefix("tab-title"),
      {
        [`is-${props.tabPosition}`]: props.tabPosition,
      },
    ];
  });

  /**
   * header icon render function
   */
  function renderTabIcon(params: Parameters<RenderFunc>[0]) {
    const { props } = params.tabData as TabItemVNode;

    if (isFunction(props.icon)) {
      return props.icon();
    }
    else if (isString(props.icon)) {
      return h(LayIcon, {
        type: props.icon as string,
        style: "margin-right: 8px;",
      });
    }
  };

  /**
   * header title render function
   */
  function renderTabTitle(params: Parameters<RenderFunc>[0]) {
    const { children, props } = params.tabData as TabItemVNode;

    if (children?.title) {
      return h(Fragment, children?.title && children.title());
    }
    if (isFunction(props.title)) {
      return props.title();
    }
    else if (isString(props.title)) {
      return createTextVNode(props.title as string);
    }
  };

  return { classTabHead, classTabTitle, renderTabIcon, renderTabTitle };
}

export type UseTabHeader = ReturnType<typeof useTabHeader>;
