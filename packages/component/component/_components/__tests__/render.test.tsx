import { describe, expect, test } from "vitest";
import {defineComponent, nextTick} from 'vue'
import { mount } from "@vue/test-utils";

import LayRender from "../render";

const CustomComponent = defineComponent({
  setup(props, ctx) {
    return () => (
      <div class='custom-class'>
        <LayRender slots={ctx.slots} render='default' row-index={1}></LayRender>
      </div>
    )
  },
})

describe("LayRender.vue", () => {
  test("作用域slot，参数名应保持为camelize形式", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <CustomComponent
            v-slots={{
              default: ({rowIndex}: {rowIndex: number}) => rowIndex + 1
            }}
          ></CustomComponent>
        );
      },
    });
    
    const dom = wrapper.find('.custom-class')
    expect(dom.text()).toBe('2');
  });
});
