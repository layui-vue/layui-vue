import Layout from "./App.vue";
import { App, createApp as _createApp } from "vue";
import { createRouter } from "./router/index";
import { Router } from "vue-router";
import Store from "./store";
import layui from "layui-component/index";
import LayJsonSchemaForm from "json-schema-form/src/index";
import LayCode from "./components/LayCode.vue";
import LaySearch from "./components/LaySearch.vue";
import LayTableBox from "./components/LayTableBox.vue";
import LayAnchor from "./components/LayAnchor.vue";
import LayContributor from "./components/LayContributor.vue";

import Children from "./document/zh-CN/components/components/Children.vue";
import Children1 from "./document/zh-CN/components/components/Children1.vue";
import Children2 from "./document/zh-CN/components/components/Children2.vue";

import "./assets/css/index.css";

export function createApp(): {
  app: App<Element>;
  router: Router;
} {
  const app = _createApp(Layout);
  const router = createRouter();

  app
    .use(layui)
    .use(LayJsonSchemaForm)
    .use(Store)
    .use(router)
    .component("Children", Children)
    .component("Children1", Children1)
    .component("Children2", Children2)
    .component("LayCode", LayCode)
    .component("LaySearch", LaySearch)
    .component("LayTableBox", LayTableBox)
    .component("LayAnchor", LayAnchor)
    .component("LayContributor", LayContributor);

  return { app, router };
}
