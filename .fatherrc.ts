import { defineConfig } from 'father'
import path from 'path'

export default defineConfig({
  alias: { '@': path.resolve(__dirname, 'packages') },
  esm: { input: 'packages' },
  cjs: { input: 'packages' },
})
