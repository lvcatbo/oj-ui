import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver  } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
/** @type {import('tailwindcss').Config} */
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8121',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
