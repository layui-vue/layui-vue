export function sleep(wait: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, wait);
  });
}

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


