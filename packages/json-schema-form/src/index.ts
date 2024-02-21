import type { App } from "vue";
import type { InstallOptions } from "./types";

import LayJsonSchemaForm from "./component/index.vue";

// 全局安装
const install = (app: App, options?: InstallOptions): void => {
  app.component(LayJsonSchemaForm.name, LayJsonSchemaForm);
};

export { LayJsonSchemaForm };

export default { install };
