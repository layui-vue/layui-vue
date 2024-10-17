import { nextTick, h, defineComponent } from "vue";
import { describe, expect, test } from "vitest";
import { layer } from "../index";
// import { sleep } from "../../../component/test-utils";

const CustomComponent = defineComponent({
  setup(props, ctx) {
    return () => h("div", { class: "custom-footer" }, ctx.slots);
  },
});

describe("Layer", () => {
  test("layer.open 支持title/footer渲染组件", async () => {
    const open = () => {
      layer.open({
        type: 1,
        title: () =>
          h(CustomComponent, { class: "custom-title" }, () => "title"),
        footer: () =>
          h(CustomComponent, { class: "custom-footer" }, () => "footer"),
        content: "内容",
      });
    };

    open();

    await nextTick();

    const titleDom = document.querySelector(
      ".layui-layer .layui-layer-title .custom-title"
    ) as HTMLDivElement;
    const footerDom = document.querySelector(
      ".layui-layer .layui-layer-footer .custom-footer"
    ) as HTMLDivElement;

    expect(titleDom.innerText).toBe("title");
    expect(footerDom.innerText).toBe("footer");
  });
});
