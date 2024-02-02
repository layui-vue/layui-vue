import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { makeScroll } from "../../../test-utils/index";

import LayAffix from "../index";

const TEXT = "test LayAffix";

describe("LayAffix.vue", () => {
  test("test LayAffix slot", async () => {
    const wrapper = mount(() => <LayAffix>{TEXT}</LayAffix>);

    expect(wrapper.text()).toContain(TEXT);
  });

  test("test LayAffix is fixed state", async () => {
    const wrapper = mount(() => <LayAffix></LayAffix>);

    await makeScroll(document.body, "scrollTop", 200);

    expect(wrapper.attributes("style")).toContain(
      "position: fixed !important;"
    );
  });

  test("test LayAffix offset", async () => {
    const wrapper = await mount(() => <LayAffix offset={30}></LayAffix>);

    await makeScroll(document.documentElement, "scrollTop", 200);

    expect(wrapper.attributes("style")).toContain("top: 30px;");
  });
});
