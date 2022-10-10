const useMove = function (el: HTMLElement, callback: Function) {
  if (el != null) {
    el.addEventListener("mousedown", function (event: any) {
      const path = (event.composedPath && event.composedPath()) || event.path;
      if (path[0].className === "layui-layer-resize") {
        if (event.button == 0 && el != null) {
          var x = el.offsetLeft;
          var y = el.offsetTop;
          const move = function (moveEvent: any) {
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
export default useMove;
