import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  server: {
    host: true,
    hmr: {
      clientPort: process.env.FRONTEND_PORT,
    },
    port: process.env.FRONTEND_PORT,
    https: {
      key: fs.readFileSync(process.env.KEY_PATH),
      cert: fs.readFileSync(process.env.CERT_PATH),
    },
    watch: {
      usePolling: true,
    },
  },
})
