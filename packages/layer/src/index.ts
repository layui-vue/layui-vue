import { render, h, isVNode, AppContext, App } from "vue";
import LayLayer, { LayerProps } from "./component/index.vue";
import { InstallOptions } from "./types";
import { zIndexKey } from "./tokens";
import { nextId, removeNotifiyFromQueen } from "./utils";

// 实例队列
const layerInstance: any = [];

// 新增实例
const addInstance = (instance: any) => {
  layerInstance.push(instance);
};

// 删除实例
const delInstance = (id: any) => {
  layerInstance.forEach((item: any, index: number) => {
    if (item.modalContainer.id === id) {
      // 删除元素
      layerInstance.splice(index, 1);
    }
  });
};

// 清空实例
const cleanInstance = () => {
  layerInstance.splice(0, layerInstance.length);
};

// 是否存在
const isExist = (id: any) => {
  let b = false;
  layerInstance.forEach((item: any, index: number) => {
    if (item.modalContainer.id == id) {
      b = true;
    }
  });
  return b;
};

const findById = (id: any) => {
  let instance = null;
  layerInstance.forEach((item: any, index: number) => {
    if (item.modalContainer.id === id) {
      instance = item;
    }
  });
  return instance;
};

// 聚合 modal 配置
const mergeOption = (option: any, defaultOption: any) => {
  if (option) defaultOption = Object.assign(defaultOption, option);
  return defaultOption;
};

// 创建 modal 容器
const createContainer = (options: any) => {
  const modalContainer = document.createElement("div");
  modalContainer.id = options.id;
  document.body.appendChild(modalContainer);
  return modalContainer;
};

// modal 子 VNode
const modalChildrenVNode = (content: any) => {
  if (typeof content === "function") {
    return isVNode(content()) ? { default: () => content() } : undefined;
  }
  return isVNode(content) ? { default: () => content } : undefined;
};

const layer = {
  _context: <AppContext | null>null,

  // 页面
  open: (option: LayerProps) => {
    const defaultOption = {};
    return layer.create(option, defaultOption);
  },
  // 抽屉
  drawer: (option: LayerProps) => {
    const defaultOption: LayerProps = {
      type: "drawer",
    };
    return layer.create(option, defaultOption);
  },
  // 消息
  msg: (message: string, option: LayerProps = {}, callback?: Function) => {
    const defaultOption: LayerProps = {
      type: 0,
      title: false,
      content: message,
      shadeClose: false,
      closeBtn: false,
      isMessage: true,
      shade: false,
      btn: undefined,
      time: 1000,
    };
    return layer.create(option, defaultOption, callback);
  },
  // 加载
  load: (load: number, option: LayerProps = {}) => {
    const defaultOption: LayerProps = {
      type: 3,
      load: load,
      anim: 5,
      isOutAnim: false,
      shadeClose: false,
    };
    return layer.create(option, defaultOption);
  },
  // 确认
  confirm: (msg: string, option: LayerProps = {}) => {
    const defaultOption: LayerProps = {
      type: 0,
      content: msg,
      shadeClose: false,
    };
    return layer.create(option, defaultOption);
  },
  //图片预览
  photos: (option: string | LayerProps) => {
    if (typeof option === "string") {
      option = {
        imgList: [{ src: option }],
      };
    }
    const defaultOption: LayerProps = {
      type: 5,
      anim: 2,
      startIndex: 0,
      isOutAnim: true,
      shadeClose: true,
      shadeOpacity: "0.2",
    };
    return layer.create(option, defaultOption);
  },
  //通知
  notify: (option: LayerProps, callback?: Function) => {
    option.type = 6;
    const defaultOption: LayerProps = {
      offset: "rt",
      time: 2000,
      area: "auto",
      shade: false,
    };
    return layer.create(option, defaultOption, callback);
  },
  // 输入层
  prompt: (option: LayerProps) => {
    option.type = 7;
    const defaultOption: LayerProps = {
      type: "prompt",
      shadeClose: false,
      shadeOpacity: "0.2",
    };
    return layer.create(option, defaultOption);
  },
  // 创建弹出层
  create: (
    option: LayerProps,
    defaultOption: LayerProps,
    callback?: Function
  ) => {
    // 销毁定时
    let timer: NodeJS.Timeout;
    // 聚合配置 Opt
    const options = mergeOption(option, defaultOption);
    // 生成唯一标识
    if (options.hasOwnProperty("id")) {
      // 判断 id 存在, 并销毁窗体
      layer.close(options.id);
    } else {
      // 生成新的唯一标识
      options.id = nextId();
    }
    // 创建容器 Dom
    const modalContainer = createContainer(options);
    // 创建虚拟 Dom
    const modalInstance = h(
      LayLayer,
      {
        ...options,
        isFunction: true,
        internalDestroy() {
          clearTimeout(timer);
          modalInstance.component?.exposed?.close();
          setTimeout(() => {
            render(null, modalContainer);
            // 清空 dom
            if (document.body.contains(modalContainer)) {
              document.body.removeChild(modalContainer);
            }
          }, 2000);
          delInstance(modalContainer.id);
        },
      },
      modalChildrenVNode(options.content)
    );
    modalInstance.appContext = options.appContext || layer._context;
    // 将虚拟 dom 渲染到 dom 容器
    render(modalInstance, modalContainer);
    // 调用 open 函数
    modalInstance.component?.exposed?.open();
    // 延时 time 销毁
    if (
      defaultOption &&
      defaultOption.time != undefined &&
      defaultOption.time != 0
    ) {
      timer = setTimeout(() => {
        modalInstance.component?.exposed?.close();
        if (callback) callback(modalContainer.id);
        setTimeout(() => {
          render(null, modalContainer);
          if (document.body.contains(modalContainer)) {
            document.body.removeChild(modalContainer);
          }
        }, 2000);
        // 销毁实例
        delInstance(modalContainer.id);
      }, defaultOption.time);
    }
    // 维护实例
    addInstance({ modalContainer, modalInstance });
    // 返回实例
    return modalContainer.id;
  },
  // 关闭弹出层
  close: (id: any) => {
    if (id != null && isExist(id)) {
      const instance: any = findById(id);
      instance.modalInstance.component?.exposed?.close();
      setTimeout(() => {
        render(null, instance.modalContainer);
        if (document.body.contains(instance.modalContainer))
          document.body.removeChild(instance.modalContainer);
      }, 2000);
    }
    // 销毁实例
    delInstance(id);
  },
  // 关闭所有弹出层
  closeAll: () => {
    layerInstance.forEach((item: any) => {
      item.modalInstance.component?.exposed?.close();
      setTimeout(() => {
        render(null, item.modalContainer);
        if (document.body.contains(item.modalContainer))
          document.body.removeChild(item.modalContainer);
      }, 2000);
    });
    // 清空实例
    cleanInstance();
  },
  // 重置位置
  reset: (id: any) => {
    if (id != null && isExist(id)) {
      const instance: any = findById(id);
      instance.modalInstance.component?.exposed?.reset();
    }
  },
  // 最大化
  min: (id: any) => {
    if (id != null && isExist(id)) {
      const instance: any = findById(id);
      instance.modalInstance.component?.exposed?.min();
    }
  },
  // 最大化
  full: (id: any) => {
    if (id != null && isExist(id)) {
      const instance: any = findById(id);
      instance.modalInstance.component?.exposed?.full();
    }
  },
  // 复原最小/最大化
  revert: (id: any) => {
    if (id != null && isExist(id)) {
      const instance: any = findById(id);
      instance.modalInstance.component?.exposed?.revert();
    }
  },
};

// 全局安装
const install = (app: App, options?: InstallOptions): void => {
  layer._context = app._context;
  app.component(LayLayer.name as string, LayLayer);
  app.config.globalProperties.$layer = layer;
  if (options) {
    app.provide(zIndexKey, options.zIndex);
  }
};

export { layer, LayLayer };

export default { install };

export * from "./types";

import "./theme/index.css";
