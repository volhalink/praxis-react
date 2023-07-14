import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
  server: {
    host: true,
    hmr: {
      clientPort: process.env.UI_PORT,
    },
    port: process.env.UI_PORT,
    https: {
      key: fs.readFileSync(process.env.KEY_PATH),
      cert: fs.readFileSync(process.env.CERT_PATH),
    },
    watch: {
      usePolling: true,
    },
  },
})