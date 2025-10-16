import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@components': resolve('src/renderer/src/components'),
        '@hooks': resolve('src/renderer/src/hooks'),
        '@utils': resolve('src/renderer/src/utils'),
        '@assets': resolve('src/renderer/src/assets'),
        '@styles': resolve('src/renderer/src/styles'),
        '@types': resolve('src/renderer/src/types'),
        '@contexts': resolve('src/renderer/src/contexts'),
        '@services': resolve('src/renderer/src/services'),
        '@preload': resolve('src/preload/index.d.ts')
      }
    },
    plugins: [react()]
  }
})
