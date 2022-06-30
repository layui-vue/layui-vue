<script lang="ts">
import { h, PropType, defineComponent } from "vue";
import { TabData } from "./interface";

export default defineComponent({
  name: "RenderTitle",
  props: {
    tag: {
      type: String,
      required: false,
      default: "span",
    },
    tabItemData: {
      type: Object as PropType<TabData>,
      required: false,
    },
  },
  setup(props) {
    return props.tabItemData?.slots?.title
      ? () =>
          h(
            props.tag,
            props.tabItemData?.slots?.title && props.tabItemData?.slots.title()
          )
      : () => props.tabItemData?.title;
  },
});
</script>
