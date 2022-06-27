import Layout from "./App.vue";
import { App, createApp as _createApp } from "vue";
import { createRouter } from "./src/router/index";
import { Router } from "vue-router";
import LayCode from "./src/components/LayCode.vue";
import Children1 from "./src/components/Children1.vue";
import Children2 from "./src/components/Children2.vue";
import layer from "../layer/src/index";
import "./src/assets/css/index.css";

export function createApp(): {
  app: App<Element>;
  router: Router;
} {
  const app = _createApp(Layout);
  const router = createRouter();

  app
    .use(layer)
    .use(router)
    .component("LayCode", LayCode)
    .component("Children1", Children1)
    .component("Children2", Children2);

  return { app, router };
}
