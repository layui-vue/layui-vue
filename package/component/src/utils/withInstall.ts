import { App, Component, Plugin } from "vue";

export type WithInstallType<T> = T & Plugin;

export const withInstall = <T>(comp: T): T & Plugin => {
  const component = comp as T & Component & Plugin;

  component.install = (app: App) => {
    app.component(component.name!, comp as T & Component & Plugin);
  };

  return component as T & Plugin;
};
