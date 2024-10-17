import { nextTick, h, defineComponent } from "vue";
import { describe, expect, it, test } from "vitest";
import { layer } from "../index";
import { afterEach } from "node:test";
import { sleep } from "../../../component/test-utils";

const CustomComponent = defineComponent({
  setup(props, ctx) {
    return () => h("div", { class: "custom-footer" }, ctx.slots);
  },
});

describe("Layer", () => {
  afterEach(async () => {
    layer.closeAll();
    await nextTick();
    await sleep();
  });

  it("should work", async () => {
    const open = () => {
      layer.open({
        title: "Hello",
      });
    };

    open();
    await nextTick();

    const dom = document.querySelector(
      ".layui-layer .layui-layer-title"
    ) as HTMLDivElement;
    expect(dom).toBeTruthy();
    expect(dom.innerText).toBe("Hello");
  });

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
