import type { App } from "vue";
import { LayModal } from "@layui/layer-vue";
import type { IDefineComponent } from "../../type/index";

LayModal.install = (app: App) => {
  app.component(LayModal.name || "LayModal", LayModal);
};

export default LayModal as IDefineComponent;
