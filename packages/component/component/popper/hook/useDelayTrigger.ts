import { unref } from "vue";

import { useTimeoutFn } from "@vueuse/core";

type UseDelayedToggleProps = {
  showAfter: number;
  hideAfter: number;
  show: () => void;
  hidden: () => void;
};

const useDelayTrigger = ({
  showAfter,
  hideAfter,
  show,
  hidden,
}: UseDelayedToggleProps) => {
  let hiddenStop: () => void;

  const onShow = () => {
    hiddenStop && hiddenStop();
    useTimeoutFn(show, unref(showAfter));
  };
  const onHidden = () => {
    const state = useTimeoutFn(hidden, hideAfter);
    hiddenStop = state.stop;
  };

  return { onShow, onHidden };
};

export default useDelayTrigger;
