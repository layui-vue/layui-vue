import Layout from "./App.vue";
import { App, createApp as _createApp } from "vue";
import { createRouter } from "./router/index";
import { Router } from "vue-router";
import Store from "./store";
// import layui from "../../component/src/index";
import LayCode from "./components/LayCode.vue";
import LaySearch from "./components/LaySearch.vue";
import LayTableBox from "./components/LayTableBox.vue";
import LayAnchor from "./components/LayAnchor.vue";
import "./assets/css/index.css";

export function createApp(): {
  app: App<Element>;
  router: Router;
} {
  const app = _createApp(Layout);
  const router = createRouter();

  console.log("DEV_MODE", import.meta.env.VITE_DEV_MODE ?? import.meta.env.DEV);

  if (import.meta.env.VITE_DEV_MODE != "demand") {
    import("../../component/src/index").then((layui) => {
      app
        .use(layui)
        .use(router)
        .use(Store)
        .component("LayCode", LayCode)
        .component("LaySearch", LaySearch)
        .component("LayTableBox", LayTableBox)
        .component("LayAnchor", LayAnchor);
    });
  } else {
    import("../../component/src/language").then((i18n) => {
      app
        .use(i18n.default)
        .use(router)
        .use(Store)
        .component("LayCode", LayCode)
        .component("LaySearch", LaySearch)
        .component("LayTableBox", LayTableBox)
        .component("LayAnchor", LayAnchor);
    });
  }

  return { app, router };
}
