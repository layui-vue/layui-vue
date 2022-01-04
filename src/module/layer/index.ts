import type { App } from "vue";
import { LayLayer } from "@layui/layer-vue";
import type { IDefineComponent } from "../type/index";

LayLayer.install = (app: App) => {
  app.component(LayLayer.name || "LayLayer", LayLayer);
};

export default LayLayer as IDefineComponent;
