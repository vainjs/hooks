import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import clear from 'rollup-plugin-clear'
import path from 'node:path'
import pkg from './package.json' assert { type: 'json' }

const getDir = (url) => path.parse(url).dir
const external = Object.keys(pkg.peerDependencies || {})
const commonPlugins = [process.env.NODE_ENV === 'production' && terser()]

export default [
  {
    input: 'packages/index.ts',
    output: [
      {
        entryFileNames: '[name].mjs',
        dir: getDir(pkg.module),
        preserveModules: true,
        format: 'es',
      },
    ],
    plugins: [
      clear({
        targets: ['dist'],
      }),
      typescript({ compilerOptions: { declarationDir: getDir(pkg.types) } }),
      ...commonPlugins,
    ],
    external,
  },
  {
    input: 'packages/index.ts',
    output: [
      {
        entryFileNames: '[name].cjs',
        preserveModules: true,
        dir: getDir(pkg.main),
        format: 'cjs',
      },
    ],
    plugins: [
      typescript({ compilerOptions: { declaration: false } }),
      ...commonPlugins,
    ],
    external,
  },
  {
    input: 'packages/index.ts',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'vhooks',
        globals: {
          react: 'React',
        },
      },
    ],
    plugins: [
      typescript({ compilerOptions: { declaration: false } }),
      ...commonPlugins,
    ],
    external,
  },
]
