export function throttle(func: Function) {
  let timer: any = null;
  return function (args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func(args);
      }, 20);
    }
  };
}

export function handle_select(e: Event): void {
  e.preventDefault();
}


