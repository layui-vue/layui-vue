import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useNestedEvent = (elementRef: Ref<HTMLElement | null>) => {
  const event = ref(false)
  return event
}
export default useNestedEvent
