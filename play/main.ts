import { createApp } from "vue";
import layui from "@layui/layui-vue";
import layer from "@layui/layer-vue";
import "@layui/layui-vue/lib/index.css";

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

  app.use(layui);

  // app.use(layer);

  // app.use(LayJsonSchemaForm);

  app.mount("#play");
})();
