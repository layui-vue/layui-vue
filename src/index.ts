import type { App } from 'vue'
import type { IDefineComponent, InstallOptions } from './module/type/index'

import "./css/layui.css"
import "./css/all.css"
import LayRadio from './module/radio/index'
import LayButton from './module/button/index'
import LayButtonContainer from './module/buttonContainer/index'
import LayButtonGroup from './module/buttonGroup/index'
import LayIcon from './module/icon/index'
import LayCard from './module/card/index'
import LayLayout from "./module/layout/index"
import LaySide from "./module/side/index"
import LayBody from "./module/body/index"
import LayHeader from "./module/header/index"
import LayFooter from "./module/footer/index"
import LayLogo from "./module/logo/index"
import LayPanel from "./module/panel/index"
import LayProgress from "./module/progress/index"
import LayCol from "./module/col/index"
import LayRow from "./module/row/index"
import LayInput from "./module/input/index"
import LayBadge from "./module/badge/index"
import LayBlock from "./module/block/index"
import LayLine from "./module/line/index"

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
  LayPanel,
  LayCard,
  LayProgress,
  LayButtonGroup,
  LayButtonContainer,
  LayRow,
  LayCol,
  LayInput,
  LayBadge,
  LayBlock,
  LayLine
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
  LayCard,
  LayProgress,
  LayButtonGroup,
  LayButtonContainer,
  LayRow,
  LayCol,
  LayInput,
  LayBadge,
  LayBlock,
  LayLine,
  install,
}

export default { install }
