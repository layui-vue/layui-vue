<script lang="ts">
import usePopper from "../popper/usePopper";
import { defineComponent} from "vue";
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
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  render() {
    return this.$slots.default && this.$slots.default()[0];
  },
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      usePopper.createPopper(_this.$el, _this.$props, 'hover')
    });
  }
});
</script>
