function getParentNode(el: any) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el && getComputedStyle(el).position === "relative") {
      return el;
    }
  }
  return null;
}

const useMove = function (
  el: HTMLElement,
  moveOut: boolean,
  callback: Function,
  endCallback: Function,
  startCallback: Function
) {
  let offsetX: number, offsetY: number;
  var clientX = 0;
  var clientY = 0;
  var flag = true;
  if (el != null) {
    el.addEventListener("mousedown", function (event: any) {
      const path = (event.composedPath && event.composedPath()) || event.path;
      if (path[0].className === "layui-layer-title") {
        if (event.button == 0 && el != null) {
          const cs: any = getComputedStyle(el);
          offsetX = event.pageX - el.offsetLeft + parseInt(cs["margin-left"]);
          offsetY = event.pageY - el.offsetTop + parseInt(cs["margin-right"]);
          clientX = event.clientX;
          clientY = event.clientY;
          const move = function (event: any) {
            if (el != null) {
              // 按下后的首次偏移，将触发 moveStart() 回调函数
              if (
                event.clientX - clientX != 0 ||
                event.clientY - clientY != 0
              ) {
                if (flag) {
                  flag = false;
                  startCallback();
                }
              }

              let x = event.pageX - offsetX;
              let y = event.pageY - offsetY;
              let documentWidth = document.documentElement.clientWidth;
              let documentHeight = document.documentElement.clientHeight;

              if (!moveOut) {
                var documentX = documentWidth - el.offsetWidth;
                var documentY = documentHeight - el.offsetHeight;

                if (el.style.position === "absolute") {
                  const parent = getParentNode(el);
                  if (parent != null) {
                    documentX = parent.clientWidth - el.offsetWidth;
                    documentY = parent.clientHeight - el.offsetHeight;
                  }
                }

                if (x < 0) {
                  x = 0;
                } else if (x > documentX) {
                  x = documentX;
                }
                if (y < 0) {
                  y = 0;
                } else if (y > documentY) {
                  y = documentY;
                }
              }
              el.style.top = `${y}px`;
              el.style.left = `${x}px`;
              callback(el.style.left, el.style.top);
            }
            return false;
          };
          const stop = function () {
            // 恢复标识，保证下次拖拽开始时，可触发 moveStart 回调
            flag = true;
            // 说明结束，传递 moveEnd 事件
            endCallback();
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);
          };
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", stop);
        }
      }
      return false;
    });
  }
};

const useResize = function (el: HTMLElement, callback: Function) {
  if (el != null) {
    el.addEventListener("mousedown", function (event: any) {
      const path = (event.composedPath && event.composedPath()) || event.path;
      if (path[0].className === "layui-layer-resize") {
        if (event.button == 0 && el != null) {
          var x = el.offsetLeft;
          var y = el.offsetTop;
          const move = function (moveEvent: any) {
            if (window.getSelection != undefined) {
              window.getSelection()?.removeAllRanges();
            }
            if (el != null) {
              var offsetX = moveEvent.clientX;
              var offsetY = moveEvent.clientY;
              var w = offsetX - x;
              var h = offsetY - y;
              w < 260 && (w = 260);
              h < 115 && (h = 115);
              el.style.width = `${w}px`;
              el.style.height = `${h}px`;
              callback(el.style.width, el.style.height);
            }
            return false;
          };
          document.addEventListener("mousemove", move);
          const stop = function () {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);
          };
          document.addEventListener("mouseup", stop);
        }
      }
      return false;
    });
  }
};

export { useResize, useMove };
