import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useFullScreen = () => {
  const isFullScreen = ref(false)

  const fullScreen = function () {
    const docElm = document.documentElement
    switch (!isFullScreen.value) {
      case true:
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        }
        break
      case false:
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
        break
    }
    isFullScreen.value = !isFullScreen.value
  }

  return { isFullScreen, fullScreen }
}
export default useFullScreen
