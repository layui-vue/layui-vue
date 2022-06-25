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

        meta: { title: "指南" },
      },
    ],
  },
];

export default zhCN;
