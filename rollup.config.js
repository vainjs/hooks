import typescript from '@rollup/plugin-typescript'
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
    ],
    external,
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
      clear({
        targets: ['dist'],
      }),
      typescript({ compilerOptions: { declaration: false } }),
    ],
    external,
  },
  {
    input: 'packages/index.ts',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'ihooks',
        globals: {
          react: 'React',
        },
      },
    ],
    external,
    plugins: [
      clear({
        targets: ['dist'],
      }),
      typescript({ compilerOptions: { declaration: false } }),
    ],
  },
]
