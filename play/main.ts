import { createApp } from "vue";
// import layui from "../packages/component/index";
// import layer from "../packages/layer/src/index";

// import LayJsonSchemaForm from "../packages/json-schema-form/src/index";
import LayJsonSchemaForm from "../packages/json-schema-form/lib/json-schema-form.es.js";
import "../packages/json-schema-form/lib/index.css";
// import "../packages/component/lib/index.css";
(async () => {
  const apps = import.meta.glob("./src/*.vue");
  const name = location.pathname.replace(/^\//, "") || "App";
  const file = apps[`./src/${name}.vue`];
  if (!file) {
    location.pathname = "App";
    return;
  }
  const App = (await file()).default;
  const app = createApp(App);

  // app.use(layui);

  // app.use(layer);

  app.use(LayJsonSchemaForm);

  app.mount("#play");
})();
