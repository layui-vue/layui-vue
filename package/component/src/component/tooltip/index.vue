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
import { defineComponent, ref } from "vue";
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
  },
  setup() {
    const isMounted = ref(false);
    const refTooltip = ref(null);
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
    this.$nextTick(() => {
      if (this.refTooltip) {
        if (
          this.refTooltip.offsetWidth >= this.refTooltip.firstChild.offsetWidth
        ) {
          this.isMounted = false;
        } else {
          this.isMounted = true;
        }
      } else {
        this.isMounted = true;
      }
    });
  },
});
</script>
