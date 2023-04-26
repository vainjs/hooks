import typescript from '@rollup/plugin-typescript'

export default {
  input: 'packages/index.ts',
  output: [
    {
      file: 'dist/cjs/bundle.js',
      format: 'cjs',
    },
    {
      file: 'dist/es/bundle.es.js',
      format: 'es',
    },
  ],
  plugins: [typescript()],
}
