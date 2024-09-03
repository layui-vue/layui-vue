import { nextTick, ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayDescriptions from "../descriptions.vue";
import LayDescriptionsItem from "../../descriptionsItem/descriptionsItem.vue";

describe("LayDescriptions", () => {
  test("数据变更 descriptionsItem 未重新渲染", async () => {
    type Info = {
      Id?: number;
    };

    const info = ref<Info>({});

    const wrapper = mount(
      {
        setup() {
          return () => (
            <LayDescriptions title="信息">
              <LayDescriptionsItem label="单号">
                {info.value.Id}
              </LayDescriptionsItem>
            </LayDescriptions>
          );
        },
      },
      {}
    );

    const content = wrapper.find(".layui-descriptions-content");
    expect(content.text()).toBe("");

    info.value.Id = 1;
    await nextTick();
    expect(content.text()).toBe("1");
  });
});
