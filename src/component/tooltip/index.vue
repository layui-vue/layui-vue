<template>
  <slot></slot>
  <lay-popper v-if="isMounted" v-bind="innerProps"></lay-popper>
</template>

<script lang="ts">
import LayPopper from "../popper/index.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "LayTooltip",
  components: {
    LayPopper
  },
  props: {
    content: {
      type: [Number, String],
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
    },
    visible: {
      type: Boolean,
      default: false,
    },
    isCanHide: {
      type: Boolean,
      default: true,
    },
  },
  setup(){
    const isMounted = ref(false);
    return {
      isMounted
    }
  },
  computed: {
    innerProps(){
      return {el: this.$el.nextElementSibling, ...this.$props};
    }
  },
  mounted() {
    this.$nextTick(() => this.isMounted = true);
  }
});
</script>
