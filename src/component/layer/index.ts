import type { App } from "vue";
import { LayLayer } from "@layui/layer-vue";

LayLayer.install = (app: App) => {
  app.component(LayLayer.name, LayLayer);
};

export default LayLayer;
