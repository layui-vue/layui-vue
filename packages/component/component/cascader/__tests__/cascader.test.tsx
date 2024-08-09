import { nextTick, ref, onMounted } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayCascader from "../index.vue";

describe("LayTree", () => {
  test("options 数据源改变内部未更新", async () => {
    const wrapper = mount({
      setup() {
        const options = ref([
          { label: "label1", value: "1" },
          { label: "label2", value: "2" },
        ]);

        onMounted(() => {
          options.value = [
            { label: "label1", value: "1" },
            { label: "label2", value: "2" },
            { label: "label3", value: "3" },
          ];
        });

        return () => <LayCascader options={options.value}></LayCascader>;
      },
    });

    const component = wrapper.getComponent(LayCascader);

    await nextTick();

    expect((component.vm as any)._context.flatData.value.length).toBe(3);
  });
});
