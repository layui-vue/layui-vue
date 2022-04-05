export function throttle(func: Function) {
  let timer: any = null;
  return function (args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func(args);
      }, 30);
    }
  };
}

export function handle_select(e: Event): void {
  e.preventDefault();
}
