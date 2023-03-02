import BaseLayout from "../layouts/Layout.vue";
import Components from "../view/components.vue";
import Resources from "../view/resources.vue";
import Guide from "../view/guide.vue";
import Index from "../view/index.vue";

const zhCN = [
  {
    path: "/",
    redirect: "/zh-CN/index",
    component: BaseLayout,
    meta: { title: "首页" },
    children: [
      {
        path: "/zh-CN/index",
        component: Index,
        meta: { title: "指南" },
      },
      {
        path: "/zh-CN/resources",
        component: Resources,
        meta: { title: "生态" },
      },
      {
        path: "/zh-CN/guide",
        redirect: "/zh-CN/guide/introduce",
        component: Guide,
        meta: { title: "指南" },
        children: [
          {
            path: "/zh-CN/guide/introduce",
            component: () => import("../document/zh-CN/guide/introduce.md"),
            meta: { title: "介绍" },
          },
          {
            path: "/zh-CN/guide/getStarted",
            component: () => import("../document/zh-CN/guide/getStarted.md"),
            meta: { title: "安装" },
          },
          {
            path: "/zh-CN/guide/changelog",
            component: () => import("../document/zh-CN/guide/changelog.md"),
            meta: { title: "更新" },
          },
          {
            path: "/zh-CN/guide/problem",
            component: () => import("../document/zh-CN/guide/problem.md"),
            meta: { title: "问题" },
          },
          {
            path: "/zh-CN/guide/member",
            component: () => import("../document/zh-CN/guide/member.md"),
            meta: { title: "团队" },
          },
          {
            path: "/zh-CN/guide/theme",
            component: () => import("../document/zh-CN/guide/theme.md"),
            meta: { title: "主题" },
          },
          {
            path: "/zh-CN/guide/locale",
            component: () => import("../document/zh-CN/guide/locale.md"),
            meta: { title: "语言" },
          },
          {
            path: "/zh-CN/guide/dark",
            component: () => import("../document/zh-CN/guide/dark.md"),
            meta: { title: "夜间" },
          },
          {
            path: "/zh-CN/guide/plugin",
            component: () => import("../document/zh-CN/guide/plugin.md"),
            meta: { title: "插件" },
          },
        ],
      },
      {
        path: "/zh-CN/components",
        redirect: "/zh-CN/components/color",
        component: Components,
        meta: { title: "组件" },
        children: [
          {
            path: "/zh-CN/components/splitPanel",
            component: () =>
              import("../document/zh-CN/components/splitPanel.md"),
            meta: { title: "分割面板" },
          },
          {
            path: "/zh-CN/components/skeleton",
            component: () => import("../document/zh-CN/components/skeleton.md"),
            meta: { title: "骨架屏" },
          },
          {
            path: "/zh-CN/components/layout",
            component: () => import("../document/zh-CN/components/layout.md"),
            meta: { title: "布局" },
          },
          {
            path: "/zh-CN/components/color",
            component: () => import("../document/zh-CN/components/color.md"),
            meta: { title: "颜色" },
          },
          {
            path: "/zh-CN/components/container",
            component: () =>
              import("../document/zh-CN/components/container.md"),
            meta: { title: "容器" },
          },
          {
            path: "/zh-CN/components/breadcrumb",
            component: () =>
              import("../document/zh-CN/components/breadcrumb.md"),
            meta: { title: "面包屑" },
          },
          {
            path: "/zh-CN/components/button",
            component: () => import("../document/zh-CN/components/button.md"),
            meta: { title: "按钮" },
          },
          {
            path: "/zh-CN/components/icon",
            component: () => import("../document/zh-CN/components/icon.md"),
            meta: { title: "图标" },
          },
          {
            path: "/zh-CN/components/panel",
            component: () => import("../document/zh-CN/components/panel.md"),
            meta: { title: "面板" },
          },
          {
            path: "/zh-CN/components/animation",
            component: () =>
              import("../document/zh-CN/components/animation.md"),
            meta: { title: "动画" },
          },
          {
            path: "/zh-CN/components/card",
            component: () => import("../document/zh-CN/components/card.md"),
            meta: { title: "卡片" },
          },
          {
            path: "/zh-CN/components/grid",
            component: () => import("../document/zh-CN/components/grid.md"),
            meta: { title: "栅格" },
          },
          {
            path: "/zh-CN/components/form",
            component: () => import("../document/zh-CN/components/form.md"),
            meta: { title: "表单" },
          },
          {
            path: "/zh-CN/components/badge",
            component: () => import("../document/zh-CN/components/badge.md"),
            meta: { title: "徽章" },
          },
          {
            path: "/zh-CN/components/quote",
            component: () => import("../document/zh-CN/components/quote.md"),
            meta: { title: "辅助" },
          },
          {
            path: "/zh-CN/components/line",
            component: () => import("../document/zh-CN/components/line.md"),
            meta: { title: "分割" },
          },
          {
            path: "/zh-CN/components/progress",
            component: () => import("../document/zh-CN/components/progress.md"),
            meta: { title: "进度" },
          },
          {
            path: "/zh-CN/components/menu",
            component: () => import("../document/zh-CN/components/menu.md"),
            meta: { title: "菜单" },
          },
          {
            path: "/zh-CN/components/timeline",
            component: () => import("../document/zh-CN/components/timeline.md"),
            meta: { title: "时间线" },
          },
          {
            path: "/zh-CN/components/collapse",
            component: () => import("../document/zh-CN/components/collapse.md"),
            meta: { title: "折叠面板" },
          },
          {
            path: "/zh-CN/components/step",
            component: () => import("../document/zh-CN/components/step.md"),
            meta: { title: "分步" },
          },
          {
            path: "/zh-CN/components/table",
            component: () => import("../document/zh-CN/components/table.md"),
            meta: { title: "表格" },
          },
          {
            path: "/zh-CN/components/avatar",
            component: () => import("../document/zh-CN/components/avatar.md"),
            meta: { title: "头像" },
          },
          {
            path: "/zh-CN/components/field",
            component: () => import("../document/zh-CN/components/field.md"),
            meta: { title: "字段" },
          },
          {
            path: "/zh-CN/components/empty",
            component: () => import("../document/zh-CN/components/empty.md"),
            meta: { title: "空" },
          },
          {
            path: "/zh-CN/components/rate",
            component: () => import("../document/zh-CN/components/rate.md"),
            meta: { title: "评分" },
          },
          {
            path: "/zh-CN/components/dropdown",
            component: () => import("../document/zh-CN/components/dropdown.md"),
            meta: { title: "下拉" },
          },
          {
            path: "/zh-CN/components/tab",
            component: () => import("../document/zh-CN/components/tab.md"),
            meta: { title: "选项卡" },
          },
          {
            path: "/zh-CN/components/iconPicker",
            component: () =>
              import("../document/zh-CN/components/iconPicker.md"),
            meta: { title: "图标选择" },
          },
          {
            path: "/zh-CN/components/tree",
            component: () => import("../document/zh-CN/components/tree.md"),
            meta: { title: "树形组件" },
          },
          {
            path: "/zh-CN/components/treeSelect",
            component: () =>
              import("../document/zh-CN/components/treeSelect.md"),
            meta: { title: "下拉树组件" },
          },
          {
            path: "/zh-CN/components/page",
            component: () => import("../document/zh-CN/components/page.md"),
            meta: { title: "分页" },
          },
          {
            path: "/zh-CN/components/transfer",
            component: () => import("../document/zh-CN/components/transfer.md"),
            meta: { title: "穿梭框" },
          },
          {
            path: "/zh-CN/components/checkbox",
            component: () => import("../document/zh-CN/components/checkbox.md"),
            meta: { title: "复选框" },
          },
          {
            path: "/zh-CN/components/radio",
            component: () => import("../document/zh-CN/components/radio.md"),
            meta: { title: "单选框" },
          },
          {
            path: "/zh-CN/components/input",
            component: () => import("../document/zh-CN/components/input.md"),
            meta: { title: "输入框" },
          },
          {
            path: "/zh-CN/components/inputNumber",
            component: () =>
              import("../document/zh-CN/components/inputNumber.md"),
            meta: { title: "数字输入框" },
          },
          {
            path: "/zh-CN/components/textarea",
            component: () => import("../document/zh-CN/components/textarea.md"),
            meta: { title: "文本域" },
          },
          {
            path: "/zh-CN/components/switch",
            component: () => import("../document/zh-CN/components/switch.md"),
            meta: { title: "开关" },
          },
          {
            path: "/zh-CN/components/slider",
            component: () => import("../document/zh-CN/components/slider.md"),
            meta: { title: "滑块" },
          },
          {
            path: "/zh-CN/components/carousel",
            component: () => import("../document/zh-CN/components/carousel.md"),
            meta: { title: "轮播" },
          },
          {
            path: "/zh-CN/components/select",
            component: () => import("../document/zh-CN/components/select.md"),
            meta: { title: "下拉选择" },
          },
          {
            path: "/zh-CN/components/colorPicker",
            component: () =>
              import("../document/zh-CN/components/colorPicker.md"),
            meta: { title: "颜色选择器" },
          },
          {
            path: "/zh-CN/components/datePicker",
            component: () =>
              import("../document/zh-CN/components/datePicker.md"),
            meta: { title: "日期选择器" },
          },
          {
            path: "/zh-CN/components/upload",
            component: () => import("../document/zh-CN/components/upload.md"),
            meta: { title: "文件上传" },
          },
          {
            path: "/zh-CN/components/layer",
            component: () => import("../document/zh-CN/components/layer.md"),
            meta: { title: "简介" },
          },
          {
            path: "/zh-CN/components/tooltip",
            component: () => import("../document/zh-CN/components/tooltip.md"),
            meta: { title: "文字提示" },
          },
          {
            path: "/zh-CN/components/modal",
            component: () => import("../document/zh-CN/components/modal.md"),
            meta: { title: "弹层" },
          },
          {
            path: "/zh-CN/components/load",
            component: () => import("../document/zh-CN/components/load.md"),
            meta: { title: "加载" },
          },
          {
            path: "/zh-CN/components/confirm",
            component: () => import("../document/zh-CN/components/confirm.md"),
            meta: { title: "询问" },
          },
          {
            path: "/zh-CN/components/msg",
            component: () => import("../document/zh-CN/components/msg.md"),
            meta: { title: "信息" },
          },
          {
            path: "/zh-CN/components/drawer",
            component: () => import("../document/zh-CN/components/drawer.md"),
            meta: { title: "抽屉" },
          },
          {
            path: "/zh-CN/components/backtop",
            component: () => import("../document/zh-CN/components/backtop.md"),
            meta: { title: "返回顶部" },
          },
          {
            path: "/zh-CN/components/countup",
            component: () => import("../document/zh-CN/components/countup.md"),
            meta: { title: "数字滚动" },
          },
          {
            path: "/zh-CN/components/exception",
            component: () =>
              import("../document/zh-CN/components/exception.md"),
            meta: { title: "异常" },
          },
          {
            path: "/zh-CN/components/result",
            component: () => import("../document/zh-CN/components/result.md"),
            meta: { title: "结果" },
          },
          {
            path: "/zh-CN/components/fullscreen",
            component: () =>
              import("../document/zh-CN/components/fullscreen.md"),
            meta: { title: "全屏" },
          },
          {
            path: "/zh-CN/components/scroll",
            component: () => import("../document/zh-CN/components/scroll.md"),
            meta: { title: "虚拟滚动" },
          },
          {
            path: "/zh-CN/components/transition",
            component: () =>
              import("../document/zh-CN/components/transition.md"),
            meta: { title: "过渡" },
          },
          {
            path: "/zh-CN/components/ripple",
            component: () => import("../document/zh-CN/components/ripple.md"),
            meta: { title: "水波纹" },
          },
          {
            path: "/zh-CN/components/noticeBar",
            component: () =>
              import("../document/zh-CN/components/noticeBar.md"),
            meta: { title: "通告栏" },
          },
          {
            path: "/zh-CN/components/pageheader",
            component: () =>
              import("../document/zh-CN/components/pageHeader.md"),
            meta: { title: "页头" },
          },
          {
            path: "/zh-CN/components/cascader",
            component: () => import("../document/zh-CN/components/cascader.md"),
            meta: { title: "级联选择器" },
          },
          {
            path: "/zh-CN/components/affix",
            component: () => import("../document/zh-CN/components/affix.md"),
            meta: { title: "锚点" },
          },
          {
            path: "/zh-CN/components/qrcode",
            component: () => import("../document/zh-CN/components/qrcode.md"),
            meta: { title: "二维码" },
          },
          {
            path: "/zh-CN/components/barcode",
            component: () => import("../document/zh-CN/components/barcode.md"),
            meta: { title: "条形码" },
          },
          {
            path: "/zh-CN/components/notifiy",
            component: () => import("../document/zh-CN/components/notifiy.md"),
            meta: { title: "通知" },
          },
          {
            path: "/zh-CN/components/photo",
            component: () => import("../document/zh-CN/components/photo.md"),
            meta: { title: "相册" },
          },
          {
            path: "/zh-CN/components/tag",
            component: () => import("../document/zh-CN/components/tag.md"),
            meta: { title: "标签" },
          },
          {
            path: "/zh-CN/components/tagInput",
            component: () => import("../document/zh-CN/components/tagInput.md"),
            meta: { title: "标签" },
          },
          {
            path: "/zh-CN/components/space",
            component: () => import("../document/zh-CN/components/space.md"),
            meta: { title: "间距" },
          },
        ],
      },
    ],
  },
];

export default zhCN;
