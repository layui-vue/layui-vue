import type { App, Plugin } from "vue";
import i18n from "../language";

export type WithInstallType<T> = T & Plugin;

export const withInstall = <T>(comp: T): T & Plugin => {
  const component = comp as any;

  component.install = (app: App | any) => {
    if (!app.__VUE_I18N_SYMBOL__) {
      app.use(i18n);
    }
    app.component(component.name, comp);
  };

  return component as T & Plugin;
};
