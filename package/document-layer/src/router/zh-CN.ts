import BaseLayout from "../layouts/Layout.vue";

const zhCN = [
  {
    path: "/",
    redirect: "/zh-CN/demo",
    component: BaseLayout,
    meta: { title: "首页" },
    children: [
      {
        path: "/zh-CN/demo",
        component: () => import("../document/zh-CN/demo.md"),
        meta: { title: "示例" },
      },
    ],
  },
];

export default zhCN;
