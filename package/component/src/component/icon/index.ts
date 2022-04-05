import type { App } from "vue";
import { LayIcon as Component } from "@layui/icons-vue";

Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
