import { defineComponent } from "vue";

import type { PropType } from "vue";

export default defineComponent({
  name: "Renderer",
  props: {
    renderFn: {
      type: Function,
      default: null,
    },
    data: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      if (typeof props.renderFn !== "function") {
        return null;
      }

      return props.renderFn(props.data);
    };
  },
});
