// 获取标签与窗口顶边距离
export function getTop(elem) {
    return elem.offsetTop + (elem.offsetParent && getTop(elem.offsetParent) || 0);
}

// 获取标签与窗口左边距离
export function getLeft(elem) {
    return elem.offsetLeft + (elem.offsetParent && getLeft(elem.offsetParent) || 0);
}

// 事件绑定
export function on(elem, events, handler) {
    [].concat(events).forEach(event => elem.addEventListener(event, handler, false));
}

export function once (elem, events, handler) {
    const listener = function (_this, args) {
        handler.apply(_this, args)
        off(elem, events, listener);
    }
    on(elem, events, listener)
}

// 事件解除
export function off(elem, events, handler) {
    [].concat(events).forEach(event => elem.removeEventListener(event, handler, false));
}