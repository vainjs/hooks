import { defineConfig } from 'father'

export default defineConfig({
  esm: { input: 'packages', platform: 'browser' },
  cjs: { input: 'packages', platform: 'node' },
  umd: { entry: 'packages/index' },
})
