const useMove = function (el: HTMLElement, callback: Function) {
  el.style.position = "fixed";
  let offsetX: number;
  let offsetY: number;
  if (el != null) {
    el.addEventListener("mousedown", function (event: any) {
      const path = (event.composedPath && event.composedPath()) || event.path;
      if (path[0].className === "layui-layer-title") {
        if (event.button == 0 && el != null) {
          const lexObj: any = getComputedStyle(el);
          offsetX =
            event.pageX - el.offsetLeft + parseInt(lexObj["margin-left"]);
          offsetY =
            event.pageY - el.offsetTop + parseInt(lexObj["margin-right"]);
          const move = function (event: any) {
            if (el != null) {
              let x = event.pageX - offsetX;
              let y = event.pageY - offsetY;
              if (x < 0) {
                x = 0;
              } else if (
                x >
                document.documentElement.clientWidth - el.offsetWidth
              ) {
                x = document.documentElement.clientWidth - el.offsetWidth;
              }
              if (y < 0) {
                y = 0;
              } else if (
                y >
                document.documentElement.clientHeight - el.offsetHeight
              ) {
                y = document.documentElement.clientHeight - el.offsetHeight;
              }
              el.style.left = `${x}px`;
              el.style.top = `${y}px`;
              callback(el.style.left, el.style.top);
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
