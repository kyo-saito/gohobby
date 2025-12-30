import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// package.jsonからバージョンを読み込む（毎回最新の値を取得）
function getVersion() {
  try {
    const packageJson = JSON.parse(
      readFileSync(resolve(__dirname, 'package.json'), 'utf-8')
    )
    return packageJson.version
  } catch (error) {
    console.warn('Failed to read package.json version:', error)
    return '1.1.5'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: false,
  },
  define: {
    // 開発サーバー起動時に毎回最新のバージョンを読み込む
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(getVersion()),
  },
})
