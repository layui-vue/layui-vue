import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from "vue-router";
// @ts-expect-error TODO
import NProgress from "nprogress";
import {
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";
import zhCN from "./zh-CN";
import "nprogress/nprogress.css";

const routes = [...zhCN];

export function createRouter(): Router {
  const router = _createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      NProgress.start();

      next();
    },
  );

  router.afterEach(() => {
    NProgress.done();
  });

  return router;
}
