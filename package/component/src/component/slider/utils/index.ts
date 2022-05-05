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

export function makeDots(props: any) {
  if (props.step === 0) return [];
  let val = 0;
  let dots = [0];
  let count = Math.floor(100 / props.step) - 1;
  for (let i = 0; i < count; i++) {
    val += props.step;
    dots.push(val);
  }
  dots.push(100);
  return dots;
}
