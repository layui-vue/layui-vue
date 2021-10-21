import type { App } from 'vue'
import Component from './index.vue'
import { DefineComponent } from 'vue'

Component.install = (app: App) => {
  app.component(Component.name || 'LayColorPicker', Component)
}

export default Component as DefineComponent
