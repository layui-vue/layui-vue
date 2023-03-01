import { off, title } from "process";
import { layer } from "../index";

// 随机数
export function nextId() {
  var s: any = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}

export function calculateMinArea(minArea: any) {
  if (!minArea) {
    return ["120px", "100px"];
  }
  if (typeof minArea == "string") {
    return [minArea];
  }
  return [minArea];
}

export function calculateArea(type: any, area: any, offset: any) {
  return type != "drawer"
    ? calculateBaseArea(area)
    : calculateDrawerArea(offset, area);
}

// 计算宽高
// @param area
// @param type
// @return 正确宽高
export function calculateBaseArea(area: any) {
  if (area === "auto") {
    return [];
  }
  if (typeof area == "string") {
    return [area];
  }
  if (area[1] && area[1] === "auto") {
    return [area[0]];
  }
  return [...area];
}

// 抽屉宽/高
export function calculateDrawerArea(
  offset: any,
  drawerArea: string[] | string = "30%"
) {
  if (drawerArea instanceof Array) {
    return drawerArea;
  }
  if (drawerArea === "auto") {
    drawerArea = "30%";
  }
  if (
    offset === "l" ||
    offset === "r" ||
    offset === "lt" ||
    offset === "lb" ||
    offset === "rt" ||
    offset === "rb"
  ) {
    return [drawerArea, "100%"];
  } else if (
    offset === "t" ||
    offset === "b" ||
    offset === "tr" ||
    offset === "tl" ||
    offset === "br" ||
    offset === "bl"
  ) {
    return ["100%", drawerArea];
  }
  return [drawerArea, "100%"];
}

/**
 * 计算 offset 属性
 *
 * @param offset 位置
 * @param area 尺寸
 * @param type 类型
 *
 * @return { Array } 正确位置
 */
export function calculateOffset(offset: any, area: any, type: any) {
  var arr = [
    "t",
    "r",
    "b",
    "l",
    "lt",
    "tl",
    "lb",
    "bl",
    "rt",
    "tr",
    "rb",
    "br",
  ];
  var tls = [];

  if (offset === "auto" && type == 4) {
    offset = "r";
  }

  if (typeof offset == "string") {
    // convert keyword
    if (arr.indexOf(offset) > -1) {
      if (offset === "t") {
        tls[0] = "0px";
        tls[1] = "calc(50% - " + area[0] + "/2)";
      }
      if (offset === "l") {
        tls[0] = "calc(50% - " + area[1] + "/2)";
        tls[1] = "0px";
      }
      if (offset === "b") {
        tls[0] = "calc(100% - " + area[1] + ")";
        tls[1] = "calc(50% - " + area[0] + "/2)";
      }
      if (offset === "r") {
        tls[0] = "calc(50% - " + area[1] + "/2)";
        tls[1] = "calc(100% - " + area[0] + ")";
      }
      if (offset === "lt" || offset === "tl") {
        tls[0] = "0px";
        tls[1] = "0px";
      }
      if (offset === "lb" || offset === "bl") {
        tls[0] = "calc(100% - " + area[1] + ")";
        tls[1] = "0px";
      }
      if (offset === "rt" || offset === "tr") {
        tls[0] = "0px";
        tls[1] = "calc(100% - " + area[0] + ")";
      }
      if (offset === "rb" || offset === "br") {
        tls[0] = "calc(100% - " + area[1] + ")";
        tls[1] = "calc(100% - " + area[0] + ")";
      }
    } else {
      if (offset == "auto") {
        tls[0] = "calc(50% - " + area[1] + "/2)";
        tls[1] = "calc(50% - " + area[0] + "/2)";
      } else {
        tls[0] = offset;
        tls[1] = "calc(50% - " + area[0] + "/2)";
      }
    }
  } else {
    tls[0] = offset[0];
    tls[1] = offset[1];
  }
  return tls;
}

/**
 * 转换 number 类型
 */
export function calculateType(modalType: number | string) {
  if (modalType === "dialog" || modalType == 0) {
    // 普通消息
    return 0;
  } else if (modalType === "page" || modalType == 1) {
    // 插槽页面
    return 1;
  } else if (modalType === "iframe" || modalType == 2) {
    // 远程页面
    return 2;
  } else if (modalType === "loading" || modalType == 3) {
    // 加载动画
    return 3;
  } else if (modalType === "drawer" || modalType == 4) {
    // 抽屉组件
    return 4;
  } else if (modalType === "photos" || modalType == 5) {
    // 相册展示
    return 5;
  } else if (modalType === "notifiy" || modalType == 6) {
    // 消息通知
    return 6;
  }
  return 0;
}

/**
 * 计算 content 高度
 */
export function calculateContent(
  title: any,
  height: any,
  btn: any,
  type: any,
  isMessage?: boolean
) {
  if (height && height.indexOf("%") != -1) {
    height = "100%";
  }
  if (btn && btn.length > 0) {
    if (type == 0) {
      if (title) {
        return "calc(" + height + " - 137px)";
      } else {
        return "calc(" + height + " - 86px)";
      }
    }
    if (type == 1 || type == 4) {
      if (title) {
        return "calc(" + height + " - 102px)";
      } else {
        return "calc(" + height + " - 51px)";
      }
    }
    if (type == 2) {
      if (title) {
        return "calc(" + height + " - 102px)";
      } else {
        return "calc(" + height + " - 51px)";
      }
    }
  } else {
    if (type == 0) {
      if (title) {
        return isMessage ? "" : "calc(" + height + " - 137px)";
      } else {
        return isMessage ? "" : "calc(" + height + " - 86px)";
      }
    }
    if (type == 1 || type == 4) {
      if (title) {
        return "calc(" + height + " - 51px)";
      } else {
        return "calc(" + height + " - 0px)";
      }
    }
    if (type == 2) {
      if (title) {
        return "calc(" + height + " - 51px)";
      } else {
        return "calc(" + height + " - 0px)";
      }
    }
  }
}

// 尺寸常量
export function maxArea() {
  return { w: "100%", h: "100%" };
}

// 初始位置
export function maxOffset() {
  return { t: "0px", l: "0px" };
}

// 最小化尺寸
export function minArea() {
  return { w: "180px", h: "51px" };
}

// 最小化位置
export function minOffset(left: any) {
  return { t: "calc(100% - 51px)", l: left + "px" };
}

// 元素位置
// @param x 横坐标
// @param y 纵坐标
export function getPosition(dom: any) {
  return { x: dom?.style.left, y: dom?.style.top };
}

// 元素宽高
export function getArea(dom: any) {
  // @ts-ignore
  let width = getComputedStyle(dom, null).width;
  // @ts-ignore
  let height = getComputedStyle(dom, null).height;
  return [width, height];
}

// 最小化的队列
let minArrays: Array<String> = [];

// 更新最小化队列
export function updateMinArrays(id: string, state: Boolean) {
  var i = 0;
  if (state) {
    const index = minArrays.findIndex((v) => v === undefined);
    if (index === -1) {
      minArrays.push(id);
      i = minArrays.length - 1;
    } else {
      minArrays[index] = id;
      i = index;
    }
  } else {
    delete minArrays[minArrays.findIndex((v) => v == id)];
    i = -1;
  }
  return i;
}

/**
 * 根据 offset 返回 anim 动画
 */
export function getDrawerAnimationClass(offset: any, isClose: boolean = false) {
  const suffix = ["rl"];
  const prefix = "layer-drawer-anim layer-anim";
  if (offset === "l" || offset === "lt" || offset === "lb") {
    suffix[0] = "lr";
  } else if (offset === "r" || offset === "rt" || offset === "rb") {
    suffix[0] = "rl";
  } else if (offset === "t" || offset === "tr" || offset === "tl") {
    suffix[0] = "tb";
  } else if (offset === "b" || offset === "br" || offset === "bl") {
    suffix[0] = "bt";
  }
  return isClose ? `${prefix}-${suffix[0]}-close` : `${prefix}-${suffix[0]}`;
}

/**
 * 计算 image 尺寸, 缩放尺寸
 */
export async function calculatePhotosArea(
  url: string,
  options: object
): Promise<Array<string>> {
  let img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    if (img.complete) {
      resolve(area(img));
      return;
    }
    const layerId = layer.load(2);
    img.onload = () => {
      layer.close(layerId);
      resolve(area(img));
    };
    img.onerror = () => {
      layer.close(layerId);
      layer.msg("图片加载失败");
      reject(false);
    };
  });

  function area(img: { width: number; height: number }) {
    var imgarea = [img.width, img.height];
    var winarea = [window.innerWidth - 250, window.innerHeight - 250];
    //如果 实际图片的宽或者高比 屏幕大（那么进行缩放）
    if (imgarea[0] > winarea[0] || imgarea[1] > winarea[1]) {
      let wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]]; //取宽度缩放比例、高度缩放比例
      if (wh[0] > wh[1]) {
        //取缩放比例最大的进行缩放
        imgarea[0] = imgarea[0] / wh[0];
        imgarea[1] = imgarea[1] / wh[0];
      } else if (wh[0] < wh[1]) {
        imgarea[0] = imgarea[0] / wh[1];
        imgarea[1] = imgarea[1] / wh[1];
      }
    }
    return [imgarea[0] + "px", imgarea[1] + "px"];
  }
}

// 计算Notify位置 队列 此处先暂时定义Notify的间距为15px
export function calculateNotifOffset(offset: any, area: any, layerId: string) {
  let arr = ["lt", "lb", "rt", "rb"];
  let t = "0",
    l = "0";
  // 间隙
  let transOffsetLeft = 15;
  let transOffsetTop = 15;
  (window as any).NotifiyQueen = (window as any).NotifiyQueen || [];
  let notifiyQueen = (window as any).NotifiyQueen;
  if (typeof offset != "string" || arr.indexOf(offset) === -1) {
    offset = "rt";
  }
  // 当前区域元素集合
  let nodeList = notifiyQueen.filter((e: { offset: any }) => {
    if (e.offset === offset) {
      return e;
    }
  });
  //前一个元素
  let prevNode = nodeList.length > 0 ? nodeList[nodeList.length - 1] : null;
  if (prevNode) {
    prevNode = document.getElementById(prevNode["id"])?.firstElementChild
      ?.firstElementChild;
    if (offset === "rt" || offset === "lt") {
      transOffsetTop +=
        prevNode.offsetHeight + parseFloat(prevNode.style["top"]);
    } else {
      let bottom = parseFloat(prevNode.style["top"].split(" - ")[1]);
      transOffsetTop += prevNode.offsetHeight + bottom;
    }
  } else {
    if (offset === "rb" || offset === "lb") {
      transOffsetTop += parseFloat(area[1]);
    }
  }

  // 关键字处理
  if (offset === "rt") {
    t = transOffsetTop + "px";
    l = "calc(100% - " + (parseFloat(area[0]) + transOffsetLeft) + "px)";
  } else if (offset === "rb") {
    t = "calc(100vh - " + transOffsetTop + "px)";
    l = "calc(100% - " + (parseFloat(area[0]) + transOffsetLeft) + "px)";
  } else if (offset === "lt") {
    t = transOffsetTop + "px";
    l = transOffsetLeft + "px";
  } else if (offset === "lb") {
    t = "calc(100vh - " + transOffsetTop + "px)";
    l = transOffsetLeft + "px";
  }

  notifiyQueen.push({
    id: layerId,
    offset: offset,
  });
  // 返回位置
  return [t, l];
}

//移除Notify队列中某项，并且重新计算其他Notify位置
export function removeNotifiyFromQueen(layerId: string) {
  // 间隙
  let transOffsetTop = 15;
  // 删除项的高度
  let notifiyDom = document.getElementById(layerId)?.firstElementChild
    ?.firstElementChild as HTMLElement;
  let offsetHeight = notifiyDom.offsetHeight;
  (window as any).NotifiyQueen = (window as any).NotifiyQueen || [];
  let notifiyQueen = (window as any).NotifiyQueen;
  let index = notifiyQueen.findIndex((e: { id: string }) => e.id === layerId);
  let offsetType = notifiyQueen[index].offset;
  let list = notifiyQueen.filter((e: { offset: any }) => {
    if (e.offset === offsetType) {
      return e;
    }
  });
  let findIndex = list.findIndex((e: { id: string }) => e.id === layerId);
  // //得到需要修改的定位的Notifiy集合
  let needCalculatelist = list.slice(findIndex + 1);
  needCalculatelist.forEach((e: { id: string }) => {
    let dom = document.getElementById(e.id)?.firstElementChild
      ?.firstElementChild as HTMLElement;
    if (offsetType === "rt" || offsetType === "lt") {
      dom.style["top"] =
        parseFloat(dom.style["top"]) - transOffsetTop - offsetHeight + "px";
    } else {
      let bottom =
        parseFloat(dom.style["top"].split(" - ")[1]) -
        transOffsetTop -
        offsetHeight;
      dom.style["top"] = "calc(100vh - " + bottom + "px)";
    }
  });
  notifiyQueen.splice(index, 1); //删除
}

// Notify动画类
export function getNotifyAnimationClass(offset: any) {
  const prefix = "layer-drawer-anim layer-anim";
  let suffix = "";
  if (offset === "lt" || offset === "lb") {
    suffix = "lr";
  } else {
    suffix = "rl";
  }
  return `${prefix}-${suffix}`;
}
