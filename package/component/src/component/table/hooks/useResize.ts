// 节流
const throttle = (func: Function, wait: number) => {
  let timer: any = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, wait);
    }
  };
};

// TODO add type
let stashColumn: any = null;
let isResizing = false;
let startX = 0;
let startWidth = 0;
let touchElem: HTMLElement | null = null;
const resizing = throttle((e: MouseEvent) => {
  if (!isResizing) return;
  const offset = e.clientX - startX;
  const newWidth = startWidth + offset;
  stashColumn.width = newWidth + "px";
}, 20);

const stopResize = () => {
  startX = 0;
  startWidth = 0;
  stashColumn = null;
  touchElem = null;
  isResizing = false;
};

document.addEventListener("mousemove", resizing);
document.addEventListener("mouseup", stopResize);

export const startResize = (e: MouseEvent, column: any) => {
  stashColumn = column;
  startX = e.clientX;
  isResizing = true;
  const target = e.target as HTMLElement;
  console.log(target);
  const parentNode = target.parentNode as HTMLElement;
  startWidth = parentNode.offsetWidth;
};
