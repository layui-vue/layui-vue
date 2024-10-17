import { reactive, nextTick, h, Fragment, Text, render, renderList } from "vue";
import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LayCarousel from "../index.vue";
import LayCarouselItem from "../../carouselItem/index.vue";

// https://github.com/vuejs/test-utils/issues/2409
vi.spyOn(console, "warn").mockImplementation(() => {});

const data = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];

const generateCarouselItems = (_data?: any[]) => {
  _data = _data || data;
  return _data.map((i) => <LayCarouselItem key={i} id={i.id} />);
};

const _mount = (props?: any, list?: any[]) => {
  return mount({
    setup() {
      const data = reactive({
        modelValue: "1",
        autoplay: false,
        ...props,
      });

      return () => (
        <LayCarousel
          autoplay={data.autoplay}
          {...props}
          v-model={data.modelValue}
        >
          {generateCarouselItems(list)}
        </LayCarousel>
      );
    },
  });
};

describe("LayCarousel", () => {
  test("Items length", async () => {
    const wrapper = _mount();

    expect(wrapper.find("[carousel-item]").findAll("li").length).toEqual(3);
  });

  test("vModel", async () => {
    const wrapper = _mount({ modelValue: "2" });
    await nextTick();

    expect(
      (
        wrapper
          .find("[carousel-item]")
          .find('[data-id="1"]')
          .attributes("style") as string
      ).includes("visibility: inherit")
    ).toBeFalsy();
    expect(
      (
        wrapper
          .find("[carousel-item]")
          .find('[data-id="2"]')
          .attributes("style") as string
      ).includes("visibility: inherit")
    ).toBeTruthy();
  });

  test("autoplay and interval", async () => {
    const wrapper = _mount({
      autoplay: true,
      interval: 500,
    });

    await nextTick();
    await sleep(100);
    const bodyItems = wrapper.vm.$el
      .querySelector("[carousel-item]")
      .querySelectorAll("li");
    const indicatorItems = wrapper.vm.$el
      .querySelector(".layui-carousel-ind")
      .querySelectorAll("li");
    expect(
      bodyItems[0].getAttribute("style").includes("visibility: inherit")
    ).toBeTruthy();
    expect(indicatorItems[0].classList.contains("layui-this")).toBeTruthy();
    await nextTick();
    await sleep(600);
    expect(
      bodyItems[1].getAttribute("style").includes("visibility: inherit")
    ).toBeTruthy();
    expect(indicatorItems[1].classList.contains("layui-this")).toBeTruthy();
  });

  test("pauseOnHover", async () => {
    const wrapper = _mount({
      autoplay: true,
      interval: 500,
    });

    await nextTick();
    await sleep(100);
    const bodyItems = wrapper.vm.$el
      .querySelector("[carousel-item]")
      .querySelectorAll("li");

    expect(
      bodyItems[0].getAttribute("style").includes("visibility: inherit")
    ).toBeTruthy();

    await wrapper.trigger("mouseenter");
    await nextTick();
    await sleep(600);
    expect(
      bodyItems[0].getAttribute("style").includes("visibility: inherit")
    ).toBeTruthy();

    await wrapper.trigger("mouseleave");
    await nextTick();
    await sleep(600);
    expect(
      bodyItems[0].getAttribute("style").includes("visibility: inherit")
    ).toBeFalsy();
    expect(
      bodyItems[1].getAttribute("style").includes("visibility: inherit")
    ).toBeTruthy();
  });

  test("manual change", async () => {
    const wrapper = _mount();

    const Carousel = wrapper.getComponent(LayCarousel);
    const btn = wrapper.vm.$el.querySelectorAll(".layui-carousel-arrow");

    await btn[1].click();
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("2");

    await btn[0].click();
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("1");

    await btn[1].click();
    await btn[1].click();
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("3");

    await btn[1].click();
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("1");
  });

  test("ref", async () => {
    const wrapper = _mount({
      ref: "carousel",
    });

    const Carousel = wrapper.getComponent(LayCarousel);
    const CarouselRef = wrapper.findComponent({ ref: "carousel" }).vm;

    CarouselRef.next();
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("2");

    CarouselRef.prev();
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("1");

    CarouselRef.setActive("3");
    await nextTick();
    await sleep(100);
    expect(Carousel.props("modelValue")).toBe("3");
  });

  test("carousel item edge switching 轮播项目边界切换测试", async () => {
    const wrapper = _mount({
      autoplay: false,
    });

    const component = wrapper.findComponent(LayCarousel);
    expect(component.exists()).toBe(true);
    expect((component.vm as any).active).toBe("1");
    (component.vm as any).prev();
    await nextTick();
    expect((component.vm as any).active).toBe("3");
    (component.vm as any).next();
    await nextTick();
    expect((component.vm as any).active).toBe("1");
  });

  test("carousel item edge switching with async children 轮播项目边界切换 + 异步加载测试", async () => {
    const defaultSlot = h(Fragment, []);
    const data = reactive({
      modelValue: 1,
      autoplay: false,
    });
    const wrapper = mount(LayCarousel, {
      props: {
        modelValue: data.modelValue,
        autoplay: data.autoplay,
      },
      slots: {
        default: defaultSlot,
      },
    });

    const component = wrapper.findComponent(LayCarousel);
    expect(component.exists()).toBe(true);
    expect((component.vm as any).active).toBe(1);
    await nextTick();
    setTimeout(() => {
      defaultSlot.children = [
        h(LayCarouselItem, { id: 1 }, [h(Text, "1")]),
        h(LayCarouselItem, { id: 2 }, [h(Text, "2")]),
        h(LayCarouselItem, { id: 3 }, [h(Text, "3")]),
      ];
      (component.vm as any).setItemInstanceBySlot(defaultSlot.children);
    }, 1);
    await sleep(5);
    await nextTick();
    expect((component.vm as any).children.length).toBe(3);
    expect(component.find('.layui-carousel-item[data-id="1"]').exists()).toBe(
      true
    );
    expect(data.modelValue).toBe(1);
    (component.vm as any).prev();
    await nextTick();
    expect(component.emitted("update:modelValue")![0][0]).toBe(3);
    wrapper.setProps({
      modelValue: 3,
    });
    await nextTick();
    (component.vm as any).next();
    await nextTick();
    expect(component.emitted("update:modelValue")![1][0]).toBe(1);
  });
});
