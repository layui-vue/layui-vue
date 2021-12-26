/**
 * 获取 top 属性值
 * <p>
 * @param elem dom
 * */
export function getTop(elem) {
  return (
    elem.offsetTop + ((elem.offsetParent && getTop(elem.offsetParent)) || 0)
  );
}

/**
 * 获取 left 属性值
 * <p>
 * @param elem dom
 * */
export function getLeft(elem) {
  return (
    elem.offsetLeft + ((elem.offsetParent && getLeft(elem.offsetParent)) || 0)
  );
}

/**
 * 事件绑定
 * <p>
 * @param elem dom
 * @param events 事件
 * @param handler 事件回调
 * */
export function on(elem, events, handler) {
  []
    .concat(events)
    .forEach((event) => elem.addEventListener(event, handler, false));
}

/**
 * 单次事件
 * <p>
 * @param elem dom
 * @param events 事件
 * @param handler 事件回调
 * */
export function once(elem, events, handler) {
  const listener = function (_this, args) {
    handler.apply(_this, args);
    off(elem, events, listener);
  };
  on(elem, events, listener);
}

/**
 * 事件解除
 * <p>
 * @param elem dom
 * @param events 事件
 * @param handler 事件回调
 * */
export function off(elem, events, handler) {
  []
    .concat(events)
    .forEach((event) => elem.removeEventListener(event, handler, false));
}
