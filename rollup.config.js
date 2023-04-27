import typescript from '@rollup/plugin-typescript'
import clear from 'rollup-plugin-clear'

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
  plugins: [
    clear({
      targets: ['dist'],
    }),
    typescript(),
  ],
}
