<script lang="ts">
import usePopper from "../popper/usePopper";
import { on } from "../../tools/domUtil";
import { defineComponent, h, render} from "vue";
import popper from "../popper/index.vue";
export default defineComponent({
  name: "LayTooltip",
  props: {
    content: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "top",
    },
    isDark: {
      type: Boolean,
      default: true,
    }
  },
  render() {
    return this.$slots.default && this.$slots.default()[0];
  },
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      on(_this.$el, 'mouseenter', () => {
          const container: HTMLDivElement = document.createElement("div");
          render(h(popper, {...this.$props, el: this.$el}), container);
          container.firstElementChild && document.body.appendChild(container.firstElementChild);
      })
    });
  },
});
</script>
