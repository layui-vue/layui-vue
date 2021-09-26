import type { App } from 'vue'
import type { IDefineComponent, InstallOptions } from './module/type/index'

import "./css/layui.css";
import LayRadio from './module/radio/index'
import LayButton from './module/button/index'
import LayIcon from './module/icon/index'
import LayLayout from "./module/layout/index"
import LaySide from "./module/side/index"
import LayBody from "./module/body/index"
import LayHeader from "./module/header/index"
import LayFooter from "./module/footer/index"
import LayLogo from "./module/logo/index"
import LayPanel from "./module/panel/index"

const components: Record<string, IDefineComponent> = {
  LayRadio,
  LayButton,
  LayIcon,
  LayLayout,
  LaySide,
  LayHeader,
  LayBody,
  LayFooter,
  LayLogo,
  LayPanel
}

const install = (app: App, options?: InstallOptions): void => {
  const _options = options;
  app.config.globalProperties.$PROOPTIONS = _options

  for (const key in components) {
    const item = components[key]
    app.component(item.name || key, item)
  }
}

export {
  LayRadio,
  LayIcon,
  LayButton,
  LayLayout,
  LaySide,
  LayHeader,
  LayBody,
  LayFooter,
  LayLogo,
  LayPanel, 
  install,
}

export default { install }
