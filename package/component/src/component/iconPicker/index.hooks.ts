import { LayFormContext } from "../../types";
import { computed, inject } from "vue";

export default function useProps(props: any) {
  const size = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);

    return props.size || formContext.size || "md";
  });

  return { size };
}
