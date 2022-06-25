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
  // @ts-ignore
  if (typeof area == "string") {
    return [area];
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
  if (offset === "l" || offset === "r") {
    return [drawerArea, "100%"];
  } else if (offset === "t" || offset === "b") {
    return ["100%", drawerArea];
  }
  return [drawerArea, "100%"];
}

// 计算偏移
// @param offset
// @param domSize
// @return 正确位置
export function calculateOffset(offset: any, area: any, type: any) {
  var arr = ["t", "r", "b", "l", "lt", "lb", "rt", "rb"];
  var t = offset[0];
  var l = offset[1];
  if (offset instanceof Array && type === "drawer") {
    offset = "r";
  }
  // @ts-ignore
  if (arr.indexOf(offset) > -1) {
    t = "50%";
    l = "50%";
  }
  // 预备处理
  if (arr.indexOf(offset) != -1 || t.indexOf("%") > -1)
    t = "calc(" + t + " - (" + (area === "auto" ? "100px" : area[1]) + "/2 ))";
  if (arr.indexOf(offset) != -1 || l.indexOf("%") > -1)
    l = "calc(" + l + " - (" + (area === "auto" ? "100px" : area[0]) + "/2 ))";
  // 关键字处理
  if (offset === "t") t = "0px";
  else if (offset === "r") l = "calc(100% - " + area[0] + ")";
  else if (offset === "b") t = "calc(100% - " + area[1] + ")";
  else if (offset === "l") l = "0px";
  else if (offset === "lt") {
    t = "0px";
    l = "0px";
  } else if (offset === "lb") {
    t = "calc(100% - " + area[1] + ")";
    l = "0px";
  } else if (offset === "rt") {
    t = "0px";
    l = "calc(100% - " + area[0] + ")";
  } else if (offset === "rb") {
    t = "calc(100% - " + area[1] + ")";
    l = "calc(100% - " + area[0] + ")";
  }

  // 返回位置
  return [t, l];
}

// 窗体类型
export function calculateType(modalType: number | string) {
  if (modalType === "dialog" || modalType === 0 || modalType === "0") {
    return 0;
  } else if (
    modalType === "page" ||
    modalType === "drawer" ||
    modalType === 1 ||
    modalType === "1"
  ) {
    return 1;
  } else if (modalType === "iframe" || modalType === 2 || modalType === "2") {
    return 2;
  } else if (modalType === "loading" || modalType === 3 || modalType === "3") {
    return 3;
  } else if (modalType === "photos") {
    return 4;
  }
  return 0;
}

// 计算高度
// @param height 高度
// @param btn 操作集合
export function calculateContent(
  height: any,
  btn: any,
  type: any,
  isMessage?: boolean
) {
  if (height && height.indexOf("%") != -1) {
    height = "100%";
  }
  if (btn && btn.length > 0) {
    if (type === 0) {
      return "calc(" + height + " - 137px)";
    }
    if (type === 1) {
      return "calc(" + height + " - 102px)";
    }
    if (type === 2) {
      return "calc(" + height + " - 102px)";
    }
  } else {
    if (type === 0) {
      return isMessage ? height : "calc(" + height + " - 137px)";
    }
    if (type === 1) {
      return "calc(" + height + " - 51px)";
    }
    if (type === 2) {
      return "calc(" + height + " - 51px)";
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

// 抽屉动画类
export function getDrawerAnimationClass(offset: any, isClose: boolean = false) {
  const prefix = "layer-drawer-anim layer-anim";
  let suffix = "rl";
  if (offset === "l") {
    suffix = "lr";
  } else if (offset === "r") {
    suffix = "rl";
  } else if (offset === "t") {
    suffix = "tb";
  } else if (offset === "b") {
    suffix = "bt";
  }
  return isClose ? `${prefix}-${suffix}-close` : `${prefix}-${suffix}`;
}

//图片预加载
export function loadImage(url: string, callback: Function, error: any) {
  let img = new Image();
  img.src = url;
  if (img.complete) {
    return callback(img);
  }
  img.onload = function () {
    img.onload = null;
    callback(img);
  };
  img.onerror = function (e) {
    img.onerror = null;
    error(e);
  };
}

export async function calculatePhotosArea(url: string, options: object) {
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
    var winarea = [window.innerWidth - 100, window.innerHeight - 100];
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
