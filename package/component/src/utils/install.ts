import type { App } from "vue";
import i18n from "../language";

export const withInstall = (comp: any) => {
  comp.install = (app: App | any) => {
    if (
      !app._instance?.isCE &&
      !app._instance?.appContext?.app?.__VUE_I18N_SYMBOL__
    ) {
      app.use(i18n);
    }

    app.component(comp.name, comp);
  };

  return comp;
};
