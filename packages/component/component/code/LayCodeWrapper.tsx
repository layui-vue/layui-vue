import { PropType, defineComponent, h, ref } from "vue";
import LayCodePanel from "./LayCodePanel.vue";
import { LayCodeProps } from "./ILayCode";
import LayCodePreview from "./LayCodePreview.vue";
import LayTab from "../tab/index";
import LayTabItem from "../tabItem/index";

export default defineComponent({
  name: "LayCodeWrapper",
  props: {
    outProps: {
      type: Object as PropType<LayCodeProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const curTab = ref("code");
    const code = (
      <LayTabItem id="code" title={props.outProps.text?.code}>
        <LayCodePanel {...props.outProps}></LayCodePanel>
      </LayTabItem>
    );
    const preview = (
      <LayTabItem id="preview" title={props.outProps.text?.preview}>
        <LayCodePreview
          code={props.outProps.code}
          lang={props.outProps.lang}
        ></LayCodePreview>
      </LayTabItem>
    );

    const list = props.outProps.layout?.map((item) => {
      switch (item) {
        case "code":
          return code;

        case "preview":
          return preview;
      }
    });

    return () =>
      props.outProps.preview ? (
        <LayTab
          modelValue={curTab.value}
          onUpdate:modelValue={(v) => (curTab.value = v)}
          type="brief"
        >
          {list}
        </LayTab>
      ) : (
        <LayCodePanel {...props.outProps}></LayCodePanel>
      );
  },
});
