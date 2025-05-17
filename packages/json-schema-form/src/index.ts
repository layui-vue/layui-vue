import type { App } from "vue";
// import type { InstallOptions } from "./types";

import LayJsonSchemaForm from "./component/form/index";

// 全局安装
function install(app: App): void {
  app.component(LayJsonSchemaForm.name!, LayJsonSchemaForm);
}

export { install, LayJsonSchemaForm };

export default { install };
