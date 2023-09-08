import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { fileURLToPath } from 'node:url'
import clear from 'rollup-plugin-clear'
import { globSync } from 'glob'
import path from 'node:path'
import pkg from './package.json' assert { type: 'json' }

const getDir = (url) => path.parse(url).dir

const external = Object.keys(pkg.peerDependencies)
const cjsDir = getDir(pkg.main)
const esDir = getDir(pkg.module)
const entries = Object.fromEntries(
  globSync('packages/**/*.ts', { ignore: '**/__tests__/**' }).map((file) => [
    path.relative(
      'packages',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
)
const commonPlugins = [process.env.NODE_ENV === 'production' && terser()]

export default [
  {
    input: entries,
    output: [
      {
        format: 'es',
        dir: esDir,
        entryFileNames: '[name].mjs',
      },
    ],
    plugins: [
      clear({
        targets: ['dist'],
      }),
      typescript({ compilerOptions: { declarationDir: esDir } }),
      ...commonPlugins,
    ],
    external,
    watch: {
      include: 'packages/**',
    },
  },
  {
    input: entries,
    output: [
      {
        format: 'cjs',
        dir: cjsDir,
        entryFileNames: '[name].cjs',
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
    external,
    plugins: [
      typescript({ compilerOptions: { declaration: false } }),
      ...commonPlugins,
    ],
  },
]
