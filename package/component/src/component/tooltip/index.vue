<template>
  <div v-if="isAutoShow" class="lay-tooltip-content" ref="refTooltip">
    <span><slot></slot></span>
  </div>
  <slot v-else></slot>
  <lay-popper v-if="isMounted" v-bind="innerProps">
    <slot name="content"></slot>
  </lay-popper>
</template>

<script lang="ts">
import "./index.less";
import LayPopper from "../popper/index.vue";
import { defineComponent, PropType, ref } from "vue";
import { useEventListener } from "@vueuse/core";
export default defineComponent({
  name: "LayTooltip",
  components: {
    LayPopper,
  },
  props: {
    content: {
      type: [Number, String],
      required: false,
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
    },
    isCanHide: {
      type: Boolean,
      default: true,
    },
    isAutoShow: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: String as PropType<"click" | "hover">,
      default: "hover",
    },
  },
  setup() {
    const isMounted = ref(false);
    const refTooltip = ref<any>(null);
    return {
      isMounted,
      refTooltip,
    };
  },
  computed: {
    innerProps() {
      return { el: this.$el.nextElementSibling, ...this.$props };
    },
  },
  mounted() {
    if (this.isAutoShow) {
      useEventListener("resize", () => {
        this.setEllipsis();
      });
    }
    this.$nextTick(() => {
      this.setEllipsis();
    });
  },
  methods: {
    setEllipsis() {
      if (this.refTooltip) {
        let tooltipHtml = this.refTooltip;
        if (tooltipHtml.offsetWidth >= tooltipHtml.firstChild.offsetWidth) {
          this.isMounted = false;
        } else {
          this.isMounted = true;
        }
      } else {
        this.isMounted = true;
      }
    },
  },
});
</script>
