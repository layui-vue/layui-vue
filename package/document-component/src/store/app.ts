import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      theme: "light",
      themeVariable: {
        "--global-primary-color": "#009688",
        "--global-normal-color": "#1e9fff",
        "--global-warm-color": "#ffb800",
        "--global-danger-color": "#ff5722",
        "--global-checked-color": "#5fb878",
        "--global-border-radius": "2px",
        "--global-neutral-color-1": "#FAFAFA",
        "--global-neutral-color-2": "#F6F6F6",
        "--global-neutral-color-3": "#eeeeee",
        "--global-neutral-color-4": "#e2e2e2",
        "--global-neutral-color-5": "#dddddd",
        "--global-neutral-color-6": "#d2d2d2",
        "--global-neutral-color-7": "#cccccc",
        "--global-neutral-color-8": "#c2c2c2",
      },
    };
  },
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: "theme",
        storage: localStorage,
      },
      {
        key: "themeVariable",
        storage: localStorage,
      },
    ],
  },
});
