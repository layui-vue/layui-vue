import { withInstall } from "@layui/component/utils";
import Component from "./popper.vue";

export * from "./types";
export * from "./usePopper/types";

const component = withInstall(Component);
export default component;
