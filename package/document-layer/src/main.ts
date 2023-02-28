import Layout from "./App.vue";
import { App, createApp as _createApp } from "vue";
import { createRouter } from "./router/index";
import { Router } from "vue-router";
import LayCode from "./components/LayCode.vue";
import Children1 from "./components/Children1.vue";
import Children2 from "./components/Children2.vue";
import Children3 from "./components/Children3.vue";
import Children4 from "./components/Children4.vue";
import layui from "../../component/src/index";
import layer from "../../layer/src/index";
import "./assets/css/index.css";

export function createApp(): {
  app: App<Element>;
  router: Router;
} {
  const app = _createApp(Layout);
  const router = createRouter();

  app
    .use(layui)
    .use(layer)
    .use(router)
    .component("LayCode", LayCode)
    .component("Children1", Children1)
    .component("Children2", Children2)
    .component("Children3", Children3)
    .component("Children4", Children4);

  return { app, router };
}
