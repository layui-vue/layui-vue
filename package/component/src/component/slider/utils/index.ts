export function handle_select(e: Event): void {
  e.preventDefault();
}

export function makeDots(props: any) {
  if (props.step === 0) return [];
  let val = props.min;
  let dots = [props.min];
  let count = Math.floor((props.max - props.min) / props.step) - 1;
  for (let i = 0; i < count; i++) {
    val += props.step;
    dots.push(val);
  }
  dots.push(props.max);
  return dots;
}
