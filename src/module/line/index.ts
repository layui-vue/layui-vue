import type { App } from 'vue'
import Component from './index.vue'
import type { IDefineComponent } from '../type/index'

Component.install = (app: App) => {
    app.component(Component.name || 'LayLine', Component)
}

export default Component as IDefineComponent
