import { mount, config } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { sleep } from "@layui/component/test-utils";
import { h, nextTick } from "vue";
import LayAvatar from "../index";
import LayIcon from "@layui/component/component/icon";


config.global.components = {
  "lay-icon": LayIcon,
};
describe("Avatar.vue", () => {
  test("render avatar test", async () => {
    const wrapper = mount(LayAvatar, {});
    expect(wrapper.find(".layui-avatar-text")).toBeTruthy();
  });
  test("render src test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        src: "https://foruda.gitee.com/avatar/1677022544584087390/4835367_jmysy_1578975358.png",
      },
    });
    // console.log(wrapper.vm.src)
    expect(wrapper.find("img").attributes().src).toEqual(wrapper.vm.src);
  });
  test("render icon test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        icon: "layui-icon-face-smile",
      },
    });
    expect(wrapper.find(".layui-icon-face-smile")).toBeTruthy();
  });

  test("render icon test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        icon: "layui-icon-face-smile",
        radius: true,
      },
    });
    expect(wrapper.find(".layui-avatar-radius")).toBeTruthy();
    expect(wrapper.find(".layui-icon-face-smile")).toBeTruthy();
  });
  test("render fallback test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        src: "error.png",
        fallback: "http://abc.pearadmin.com/logo-png.png",
      },
    });
    await nextTick();
    wrapper.find("img").trigger("error");
    expect(wrapper.find("img").attributes().src).toEqual(wrapper.vm.fallback);
  });
  test("render avatar test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        size: "xs",
      },
    });
    expect(wrapper.find(".layui-avatar-xs")).toBeTruthy();
  });

  test("avatar test position", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        src: "https://www.layui-vue.com/assets/logo-C6qhPaYZ.jpg",
      },
    });

    expect(wrapper.find(".layui-avatar-text").exists()).toBeFalsy();

    await wrapper.setProps({src: ''})
    await sleep(200)
    const emptyDom = wrapper.find(".layui-avatar-text")
    expect(emptyDom.exists()).toBeTruthy();

    // 目前无法模拟真实DOM效果，故此校验无法正常进行
    // 可等后续可校验真实DOM可放开
    // expect(emptyDom.attributes('style')!.includes('transform')).toBeTruthy();

  });

  test("avatar test slots", async () => {
    const wrapper = mount(LayAvatar, {
      slots: {
        default: h('div', {class: 'text'}, '1')
      }
    });

    const emptyDom = wrapper.find(".layui-avatar-text")

    expect(emptyDom.exists()).toBeTruthy();
    expect(emptyDom.find('.layui-icon').exists()).toBeFalsy();
    expect(emptyDom.find('.text').exists()).toBeTruthy();
  });
});
