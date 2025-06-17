import { ref, nextTick } from "vue";
import { describe, expect, test, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LayTab from "../index.vue";
import LayTabItem from "../../tabItem/index.vue";

const list = [
  {
    title: "选项一",
    id: 1,
  },
  {
    title: "选项二",
    id: 2,
  },
  {
    title: "选项三",
    id: 3,
  },
]

describe("LayTab", () => {

  test("LayTab modelValue", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(2);

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onUpdate:modelValue={(val) => {value1.value = val as number }}
            >
              {list.map((item => {
                return <LayTabItem 
                  title={item.title} 
                  id={item.id}
                  v-slots={{
                    default: () => item.title,
                  }}
                >{item.title}</LayTabItem>
              }))}
              
            </LayTab>
          </div>
        );
      },
    });

    const lis = wrapper.findAll('.layui-tab-title li')
    const currentLi1 = wrapper.find('.layui-tab-title .layui-this')
    const showContent1 = wrapper.find('.layui-tab-content .layui-show')
    
    expect(lis.length).toBe(3);
    expect(currentLi1.exists()).toBeTruthy()
    expect(currentLi1.text()).toBe('选项二');
    expect(showContent1.text()).toBe('选项二');

    await lis[0].trigger("click");

    const currentLi2 = wrapper.find('.layui-tab-title .layui-this')
    const showContent2 = wrapper.find('.layui-tab-content .layui-show')

    expect(currentLi2.text()).toBe('选项一');
    expect(showContent2.text()).toBe('选项一');
  });

  test("LayTab title function", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onUpdate:modelValue={(val) => {value1.value = val as number }}
            >
              {[...Array(3)].map(((item, index) => {
                return <LayTabItem title={() => `custom${index}`} id={index} v-slots={{
                  default: () => `custom${index}`
                }}></LayTabItem>
              }))}
              
            </LayTab>
          </div>
        );
      },
    });

    const lis = wrapper.findAll('.layui-tab-title li')
    const currentLi1 = wrapper.find('.layui-tab-title .layui-this')

    expect(lis.length).toBe(3);
    expect(currentLi1.exists()).toBeTruthy()
    expect(currentLi1.text()).toBe('custom1');

    await lis[0].trigger("click");

    const currentLi2 = wrapper.find('.layui-tab-title .layui-this')

    expect(currentLi2.text()).toBe('custom0');
  });

  test("LayTab title slots", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onUpdate:modelValue={(val) => {value1.value = val as number }}
            >
              {
                [...Array(3)].map(((item, index) => {
                  return <LayTabItem 
                    title={() => `custom${index}`}
                    key={index}
                    id={index}
                    v-slots={{
                      default: () => `custom${index}`,
                      title: () => <>title{index}</>,
                    }}
                    ></LayTabItem>
                }))
              }
              
            </LayTab>
          </div>
        );
      },
    });

    const lis = wrapper.findAll('.layui-tab-title li')
    const currentLi1 = wrapper.find('.layui-tab-title .layui-this')

    expect(lis.length).toBe(3);
    expect(currentLi1.exists()).toBeTruthy()
    expect(currentLi1.text()).toBe('title1');

    await lis[0].trigger("click");

    const currentLi2 = wrapper.find('.layui-tab-title .layui-this')

    expect(currentLi2.exists()).toBeTruthy()
    expect(currentLi2.text()).toBe('title0');
  })

  test("LayTab type brief", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(0);

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onUpdate:modelValue={(val) => {value1.value = val as number }}
              type="brief"
            >
              {
                [...Array(3)].map(((item, index) => {
                  return <LayTabItem 
                    title={() => `custom${index}`}
                    key={index}
                    id={index}
                    v-slots={{
                      default: () => `custom${index}`
                    }}
                    ></LayTabItem>
                }))
              }
              
            </LayTab>
          </div>
        );
      },
    });

    const bar = wrapper.find('.layui-tab-title .layui-tab-active-bar')

    expect(bar.exists()).toBeTruthy()
  })

  test("LayTab emit change", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(0);

        const handleChange = () => {

        }

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onChange={handleChange}
            >
              {
                [...Array(3)].map(((item, index) => {
                  return <LayTabItem 
                    title={() => `custom${index}`}
                    key={index}
                    id={index}
                    v-slots={{
                      default: () => `custom${index}`
                    }}
                    ></LayTabItem>
                }))
              }
              
            </LayTab>
          </div>
        );
      },
    });

    const tabInstance = wrapper.findComponent(LayTab);
    
    const lis = wrapper.findAll('.layui-tab-title li')

    await lis[1].trigger('click')

    expect(tabInstance.emitted()).toHaveProperty("change");
    expect((tabInstance.emitted().change[0] as any)[0]).toBe(1);
  })

  test("LayTab emit close", async () => {
    const value1 = ref(1);

    const wrapper = mount({
      setup() {

        const handleClose = () => {}

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onUpdate:modelValue={(val) => {value1.value = val as number }}
              allow-close={true}
              onClose={handleClose}
            >
              {
                [...Array(3)].map(((item, index) => {
                  return <LayTabItem 
                    title={() => `custom${index}`}
                    key={index}
                    id={index}
                    v-slots={{
                      default: () => `custom${index}`
                    }}
                    ></LayTabItem>
                }))
              }
              
            </LayTab>
          </div>
        );
      },
    });

    const tabInstance = wrapper.findComponent(LayTab);
    
    const closeIcons1 = wrapper.findAll('.layui-tab-title li .layui-tab-close')
    expect(closeIcons1).toHaveLength(3)

    await closeIcons1[1].trigger('click')

    expect(tabInstance.emitted()).toHaveProperty("close");
    expect((tabInstance.emitted().close[0] as any)[0]).toBe(1);

    const closeIcons2 = wrapper.findAll('.layui-tab-title li .layui-tab-close')
    expect(closeIcons2).toHaveLength(2)

    // 删除当前节点，后面还有节点，取后面节点id赋值modelValue
    expect(value1.value).toBe(2)

    await closeIcons2[1].trigger('click')

     // 删除当前节点，无后续节点，取第一个节点id赋值modelValue
    expect(value1.value).toBe(0)
  })

  test("LayTab props beforeClose", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(0);

        const handleBeforeClose = (id: any) => {
          return id !== 1
        }

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              beforeClose={handleBeforeClose}
              allow-close={true}
            >
              {
                [...Array(3)].map(((item, index) => {
                  return <LayTabItem 
                    title={() => `custom${index}`}
                    key={index}
                    id={index}
                    >{`custom${index}`}</LayTabItem>
                }))
              }
              
            </LayTab>
          </div>
        );
      },
    });
    
    const closeIcons1 = wrapper.findAll('.layui-tab-title li .layui-tab-close')
    expect(closeIcons1).toHaveLength(3)

    await closeIcons1[1].trigger('click')

    const closeIcons2 = wrapper.findAll('.layui-tab-title li .layui-tab-close')
    expect(closeIcons2).toHaveLength(3)

    await closeIcons1[2].trigger('click')

    const closeIcons3 = wrapper.findAll('.layui-tab-title li .layui-tab-close')
    expect(closeIcons3).toHaveLength(2)

  })

  test("LayTab props beforeLeave", async () => {
    const value1 = ref(0);

    const wrapper = mount({
      setup() {

        const handleBeforeLeave = (id: any) => {
          return id !== 1
        }

        return () => (
          <div>
            <LayTab
              modelValue={value1.value}
              onUpdate:modelValue={(val) => {value1.value = val as number }}
              beforeLeave={handleBeforeLeave}
            >
              {
                [...Array(3)].map(((item, index) => {
                  return <LayTabItem 
                    title={() => `custom${index}`}
                    key={index}
                    id={index}
                    >{`custom${index}`}</LayTabItem>
                }))
              }
              
            </LayTab>
          </div>
        );
      },
    });

    const tabInstance = wrapper.findComponent(LayTab);
    
    const lis = wrapper.findAll('.layui-tab-title li')
    expect(lis).toHaveLength(3)

    await lis[1].trigger('click')
    await nextTick()

    expect(value1.value).toBe(0)
    expect(tabInstance.emitted('change')).toBeUndefined();

    await lis[2].trigger('click')
    await nextTick()

    expect(value1.value).toBe(2)
    expect(tabInstance.emitted()).toHaveProperty("change");
    expect((tabInstance.emitted().change[0] as any)[0]).toBe(2);
  })
  
});
