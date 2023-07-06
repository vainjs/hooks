import typescript from '@rollup/plugin-typescript'
import { fileURLToPath } from 'node:url'
import clear from 'rollup-plugin-clear'
import { globSync } from 'glob'
import path from 'node:path'
import pkg from './package.json' assert { type: 'json' }

const getDir = (url) => path.parse(url).dir

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
        plugins: [
          clear({
            targets: ['dist'],
          }),
          typescript({ compilerOptions: { declarationDir: esDir } }),
        ],
      },
    ],
    external: Object.keys(pkg.peerDependencies),
  },
  {
    input: entries,
    output: [
      {
        format: 'cjs',
        dir: cjsDir,
      },
    ],
    plugins: [
      clear({
        targets: ['dist'],
      }),
      typescript({ compilerOptions: { declarationDir: cjsDir } }),
    ],
    external: Object.keys(pkg.peerDependencies),
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
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      clear({
        targets: ['dist'],
      }),
      typescript({ compilerOptions: { declaration: false } }),
    ],
  },
]
