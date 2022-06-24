import {
  createRouter as _createRouter,
  createWebHistory,
  Router,
} from "vue-router";
import zhCN from "./zh-CN";

const routes = [...zhCN];

export function createRouter(): Router {
  const baseUrl = import.meta.env.BASE_URL;
  return _createRouter({
    history: createWebHistory(baseUrl),
    routes: routes,
  });
}
