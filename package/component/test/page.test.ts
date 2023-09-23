import { mount, shallowMount, config } from "@vue/test-utils";
import LayPage from "../src/component/page";
// import LayPageCount from "../src/component/page/components/count.vue";
// import LayPageLimits from "../src/component/page/components/limits.vue";
// import LayPageNext from "../src/component/page/components/next.vue";
// import LayPager from "../src/component/page/components/page.vue";
// import LayPagePrev from "../src/component/page/components/prev.vue";
// import LayPageRefresh from "../src/component/page/components/refresh.vue";
// import LayPageSimple from "../src/component/page/components/simple.vue";
// import LayPageSkip from "../src/component/page/components/skip.vue";
import { nextTick } from 'vue';
import LayIcon from "../src/component/icon";
import { describe, expect, test } from "vitest";
import LayDropdown from '../src/component/dropdown';
import LayDropdownMenu from '../src/component/dropdownMenu';
import LayDropdownMenuItem from '../src/component/dropdownMenuItem';
import LaySelectOption from '../src/component/selectOption';
import LaySelect from '../src/component/select';
import LayButton from '../src/component/button';
import LayInput from '../src/component/input';
config.global.components = {
  'lay-select': LaySelect,
  'lay-icon': LayIcon,
  'lay-dropdown-menu': LayDropdown,
  'lay-dropdown-menu-item': LayDropdownMenuItem,
  'lay-dropdown': LayDropdown,
  'lay-select-option': LaySelectOption,
  'lay-button': LayButton,
  'lay-input': LayInput
}
// import { nextTick } from "vue";
const initMaxVal = 10
const initMinVal = 1
const total = 100
const limit = 5;
const changeTotal = 102
const changeLimit = 10
describe("LayCheckCard.vue", () => {
  test("render modelValue test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMaxVal,
        total
      },
    });
    expect(+wrapper.find(".layui-pager").find('.is-active').text()).toEqual(initMaxVal)
    expect(wrapper.find(".layui-pager").find('.is-active').exists()).toBe(true);
    wrapper.unmount();
  });

  test("render event perev next test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMaxVal,
        total,
        pages: 0
      },
    });

    await wrapper.find(".layui-page-next").trigger('click')
    expect(+wrapper.find(".layui-pager").find('.is-active').text()).toEqual(initMaxVal)
    expect(wrapper.find('.layui-page-next').classes('is-disabled')).toBe(true)

    await wrapper.setProps({ modelValue: initMinVal })

    await wrapper.find(".layui-page-prev").trigger('click')

    expect(+wrapper.find(".layui-pager").find('.is-active').text()).toEqual(initMinVal)
    expect(wrapper.find('.layui-page-prev').classes('is-disabled')).toBe(true)


    const initialValue = wrapper.vm.currentPage;
    await wrapper.setProps({ modelValue: 1 })

    await wrapper.find(".layui-page-next").trigger('click')


    expect(initialValue + 1).toBe(+wrapper.vm.currentPage)


    await wrapper.setProps({ modelValue: 5 })
    const initiaPrevlValue = wrapper.vm.currentPage;

    await wrapper.find(".layui-page-prev").trigger('click')
    expect(initiaPrevlValue - 1).toBe(+wrapper.vm.currentPage)
    wrapper.vm.handlePage(-1);
    await wrapper.vm.$nextTick();
    // let updatedValue = wrapper.vm.currentPage;
    expect(wrapper.vm.currentPage).toBe(1)

    wrapper.vm.handlePage(1000);
    
    await wrapper.vm.$nextTick();
    // console.log(wrapper.vm.currentPage, 111, total)
    expect(wrapper.vm.currentPage).toBe(Math.ceil(total / 10))


    expect(wrapper.vm.groups).toBe(wrapper.vm.pages + 1)



    await wrapper.setProps({ modelValue: 1000 })
    await nextTick()
    expect(wrapper.vm.currentPage).toBe(Math.ceil(total / 10))

    wrapper.unmount();
  });

  test("render more event  test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total
      },
    });

    await wrapper.find(".layui-page-right-number").trigger('click')

    expect(+wrapper.find(".layui-pager").find('.is-active').text()).toEqual(initMinVal + 3)

    await wrapper.setProps({ modelValue: initMaxVal })

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await wrapper.find(".layui-page-left-number").trigger('click')

    expect(+wrapper.find(".layui-pager").find('.is-active').text()).toEqual(initMaxVal - 3)
    wrapper.unmount();
  });


  test("render total limit  test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit
      }
    });
    expect(+wrapper.find('.layui-pager').find('li:last-child').text()).toEqual(Math.ceil(total / limit))
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await wrapper.setProps({ total: changeTotal, limit: changeLimit })
    expect(+wrapper.find('.layui-pager').find('li:last-child').text()).toEqual(Math.ceil(changeTotal / changeLimit))
    wrapper.unmount();
  });

  test("render layout test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
        layout: ["count", "prev", "page", "next", "limits", "refresh", "skip"]
      },
    });
    await wrapper.find(".layui-page-limits  .layui-select .layui-input .layui-input-wrapper").trigger('click')

    const options = wrapper.findAllComponents(LaySelectOption)
    options[3]?.trigger('click')
    await nextTick()
    expect(+wrapper.find('.layui-pager').find('li:last-child').text()).toEqual(Math.ceil(total / 40))
    await wrapper.setProps({ layout: ["count", "prev", "page", "next", "limits", "refresh", "skip"] })
    await nextTick()
    expect(wrapper.find('span:first-child').classes('layui-page-total-text')).toBe(true)
    await wrapper.find('.layui-page-jumper .layui-input input').setValue(2)
    await wrapper.find('.layui-page-jumper .layui-btn').trigger('click')
    await nextTick()
    expect(+wrapper.find('.layui-pager .is-active').text()).toEqual(2)

    const GETINPUT_DOM = wrapper.find('.layui-page-jumper input[type="number"]')
    const GETPAGELASTDOM = wrapper.find('.layui-pager  .layui-page-number:last-child')
    const GETPAGEFIRSTDOM = wrapper.find('.layui-pager  .layui-page-number:first-child')
    // const inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;
    // let inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;

    await GETINPUT_DOM.setValue(1000)
    // const inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;

    await GETINPUT_DOM.trigger('blur')

    await nextTick()
    let inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;

    // const inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;
    expect(+inputValue).toBe(+GETPAGELASTDOM.text())



    await GETINPUT_DOM.setValue(0)

    GETINPUT_DOM.trigger('blur')
    await nextTick()
    inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;
    expect(+inputValue).toBe(+GETPAGEFIRSTDOM.text())
    wrapper.find('.layui-page-refresh').trigger('click')
    // console.log(wrapper.html())
    wrapper.unmount();
  });

  test("render disabled test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        disabled: true
      }
    });
    console.log(wrapper.html())
    expect(wrapper.classes('is-disabled')).toBe(true)
    await  wrapper.setProps({ disabled: false })
    expect(wrapper.classes('is-disabled')).toBe(false)

    // expect(wrapper.find('.is-active').classes('layui-bg-blue')).toBe(true)
    // wrapper.unmount();
  });

  test("render theme test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
        theme: 'blue'
      }
    });
    expect(wrapper.find('.is-active').classes('layui-bg-blue')).toBe(true)
    await  wrapper.setProps({ theme: 'yellow' })
    expect(wrapper.find('.is-active').classes('layui-bg-yellow')).toBe(true)
    wrapper.unmount();
  });


  test("render slots test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
      },
      slots: {
        next: () => `next`,
        prev: () => `prev`,
      }
    });
    expect(wrapper.find('.layui-page-next').text()).toEqual('next')
    expect(wrapper.find('.layui-page-prev').text()).toEqual('prev')
    wrapper.unmount();
  });

  test("render simple test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        simple: true
      }
    });
    await wrapper.find('.layui-pager-jump input').setValue(1000)
    await wrapper.find('.layui-pager-jump input').trigger('blur')
    let currentPage =  wrapper.vm.currentPage

    expect(currentPage).toBe(Math.ceil(total / 10))

    await wrapper.find('.layui-pager-jump input').setValue(-1)
    await wrapper.find('.layui-pager-jump input').trigger('blur')
    let newVal =  wrapper.vm.currentPage
    
    expect(newVal).toBe(1)

  });

})