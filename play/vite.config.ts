import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import './vite.init'

export default defineConfig(() => {
  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
    ]
  }

})
