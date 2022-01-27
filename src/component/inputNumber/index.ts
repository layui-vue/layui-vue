import type { App } from "vue";
import Component from "./index.vue";

Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
