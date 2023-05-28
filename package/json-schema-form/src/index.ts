import { App } from "vue";
import LayJsonSchemaForm from "./component/index.vue";
import { InstallOptions } from "./types";

const install = (app: App, options?: InstallOptions): void => {
  app.component(LayJsonSchemaForm.name, LayJsonSchemaForm);
};

export { LayJsonSchemaForm };

export default { install };
