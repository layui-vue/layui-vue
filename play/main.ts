import { createApp } from "vue";
import layui from "../packages/component/src/index";
import layer from "../packages/layer/src/index";
import "../packages/component/lib/index.css";
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
  app.use(layer);

  app.mount("#play");
})();
