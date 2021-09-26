import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  Router,
} from 'vue-router'
import zhCN from './zh-CN'
import type { IRouteRecordRaw } from '/@src/index'

const routes: IRouteRecordRaw[] = [...zhCN]

export function createRouter(): Router {
  const baseUrl = import.meta.env.BASE_URL
  return _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(baseUrl)
      : createWebHistory(baseUrl),
    routes:  routes 
  })
}