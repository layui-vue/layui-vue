import { render, h, isVNode, getCurrentInstance, AppContext, App } from "vue";
import LayLayer from "./component/index.vue";
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
  open: (option: any, callback?: Function) => {
    let defaultOption = {};
    return layer.create(option, defaultOption, callback);
  },
  // 抽屉
  drawer: (option: any, callback?: Function) => {
    let defaultOption = {
      type: "drawer",
    };
    return layer.create(option, defaultOption, callback);
  },
  // 消息
  msg: (message: string, option?: any, callback?: Function) => {
    let defaultOption = {
      type: 0,
      title: false,
      content: message,
      closeBtn: false,
      shadeClose: false,
      isMessage: true,
      shade: false,
      time: 1000,
      btn: false,
    };
    return layer.create(option, defaultOption, callback);
  },
  // 加载
  load: (load: number, option?: any, callback?: Function) => {
    let defaultOption = {
      type: 3,
      load: load,
      anim: 5,
      isOutAnim: false,
      shadeClose: false,
    };
    return layer.create(option, defaultOption, callback);
  },
  // 确认
  confirm: (msg: string, option?: any, callback?: Function) => {
    let defaultOption = {
      type: 0,
      content: msg,
      shadeClose: false,
    };
    return layer.create(option, defaultOption, callback);
  },
  //图片预览
  photos: (option: any, callback?: Function) => {
    if (typeof option === "string") {
      option = {
        imgList: [{ src: option }],
      };
    }
    let defaultOption = {
      type: 5,
      anim: 2,
      startIndex: 0,
      isOutAnim: true,
      shadeClose: true,
      shadeOpacity: "0.7",
    };
    return layer.create(option, defaultOption, callback);
  },
  //通知
  notifiy: (option: any = {}, callback?: Function) => {
    option.type = 6;
    let defaultOption = {
      offset: "rt",
      time: 2000,
      area: "auto",
      shade: false,
    };
    return layer.create(option, defaultOption, callback);
  },
  // 创建弹出层
  create: (option: any, defaultOption: any, callback?: Function) => {
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
        destroy() {
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
        //Notifiy特殊处理
        if (options.type === 6) {
          removeNotifiyFromQueen(options.id);
        }
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
      // 找到这个实例
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
  reset: (instance: any) => {
    instance.modalInstance.component?.exposed?.reset();
  },
};

// 全局安装
const install = (app: App, options?: InstallOptions): void => {
  layer._context = app._context;
  app.component(LayLayer.name, LayLayer);
  app.config.globalProperties.$layer = layer;
  if (options) {
    app.provide(zIndexKey, options.zIndex);
  }
};

export { layer, LayLayer };

export default { install };

import "./theme/index.css";
import { getSystemErrorMap } from "util";
