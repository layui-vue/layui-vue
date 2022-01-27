import type { App } from "vue";
import Component from "./index.vue";
import type { IDefineComponent } from "../../types/index";

Component.install = (app: App) => {
  app.component(Component.name || "LayDropdown", Component);
};

export default Component as IDefineComponent;
