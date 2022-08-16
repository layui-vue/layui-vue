import { App, Plugin } from "vue";

export type WithInstallType<T> = T & Plugin;

export const withInstall = <T>(comp: T): T & Plugin => {
  const component = comp as any;

  component.install = (app: App) => {
    app.component(component.name, comp);
  };

  return component as T & Plugin;
};