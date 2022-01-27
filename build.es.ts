import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import * as fs from 'fs'

const inputDir = resolve(__dirname, './src/component')

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
  const componentDir = resolve(inputDir, name)
  const isDir = fs.lstatSync(componentDir).isDirectory()
  return isDir && fs.readdirSync(componentDir).includes('index.ts')
})

const inputs = inputsArray.reduce((backObj, pkgName) => {
  backObj[pkgName] = resolve(__dirname, `./src/component/${pkgName}/index.ts`)
  return backObj
}, {})

inputs['index'] = resolve(__dirname, './src/index.ts')

export default (): UserConfigExport => {
  return {
    publicDir: false,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      },
      postcss: {}
    },
    plugins: [vue()],
    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      outDir: 'es',
      lib: {
        entry: './index.ts',
        formats: ['es']
      },
      rollupOptions: {
        input: inputs,
        output: {
          globals: {
            vue: 'Vue'
          },
          entryFileNames: ({ name }) => {
            return name === 'index' ? 'index.js' : '[name]/index.js'
          },
          assetFileNames: '[name]/index.css'
        },
        external: ['vue', 'vue-router']
      }
    }
  }
}