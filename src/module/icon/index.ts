import type { App } from "vue";
import { LayIcon as Component } from "@layui/icons-vue";
import type { IDefineComponent } from "../type/index";

Component.install = (app: App) => {
  app.component(Component.name || "LayIcon", Component);
};

export default Component as IDefineComponent;
