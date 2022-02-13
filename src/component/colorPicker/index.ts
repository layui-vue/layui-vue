import type { App } from "vue";
import Component from "./index.vue";

Component.install = (app: App) => {
  app.component("LayColorPicker", Component);
};

export default Component;
