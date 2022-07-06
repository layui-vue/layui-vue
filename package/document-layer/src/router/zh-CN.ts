import BaseLayout from "../layouts/Layout.vue";

const zhCN = [
  {
    path: "/",
    redirect: "/zh-CN/index",
    component: BaseLayout,
    meta: { title: "首页" },
    children: [
      {
        path: "/zh-CN/index",
        component: () => import("../document/zh-CN/index.md"),
        meta: { title: "入门" },
      },
      {
        path: "/zh-CN/demo",
        component: () => import("../document/zh-CN/demo.md"),
        meta: { title: "示例" },
      },
      {
        path: "/zh-CN/help",
        component: () => import("../document/zh-CN/help.md"),
        meta: { title: "帮助" },
      },
      {
        path: "/zh-CN/question",
        component: () => import("../document/zh-CN/question.md"),
        meta: { title: "问题" },
      },
    ],
  },
];

export default zhCN;
