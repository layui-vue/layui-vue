import { useTimeoutFn } from "@vueuse/core";

import { unref } from "vue";

interface UseDelayedToggleProps {
  showAfter: number;
  hideAfter: number;
  show: () => void;
  hidden: () => void;
}

function useDelayTrigger({
  showAfter,
  hideAfter,
  show,
  hidden,
}: UseDelayedToggleProps) {
  let hiddenStop: () => void;

  const onShow = () => {
    hiddenStop && hiddenStop();
    useTimeoutFn(show, unref(showAfter));
  };
  const onHidden = () => {
    const state = useTimeoutFn(hidden, unref(hideAfter));
    hiddenStop = state.stop;
  };

  return { onShow, onHidden };
}

export default useDelayTrigger;
