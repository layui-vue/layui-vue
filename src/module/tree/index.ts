import type { App } from 'vue'
// import Component from './index.vue'
import Component from './new-tree/index.vue'
import type { IDefineComponent } from '../type/index'

Component.install = (app: App) => {
  app.component(Component.name || 'LayTree', Component)
}

export default Component as IDefineComponent
