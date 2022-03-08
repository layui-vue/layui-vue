import Layout from './App.vue'
import { App, createApp as _createApp } from 'vue'
import { createRouter } from './router/index'
import { Router } from 'vue-router'
import layui from '../../src/index'
import LayCode from './components/LayCode.vue'
import LaySearch from './components/LaySearch.vue'
import LayTableBox from './components/LayTableBox.vue'
import LayComment from './components/LayComment.vue'
import LayAnchor from './components/LayAnchor.vue'
import InstantSearch from 'vue-instantsearch/vue3/es';
import './assets/css/index.css'

export function createApp(): {
  app: App<Element>
  router: Router
} {
  
  const app = _createApp(Layout);
  const router = createRouter();

  app
    .use(layui)
    .use(router)
    .use(InstantSearch)
    .component('LayCode', LayCode)
    .component('LaySearch', LaySearch)
    .component('LayTableBox', LayTableBox)
    .component('LayComment', LayComment)
    .component('LayAnchor',LayAnchor)

  return { app, router }
}