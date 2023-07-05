import typescript from '@rollup/plugin-typescript'
import clear from 'rollup-plugin-clear'
import pkg from './package.json' assert { type: 'json' }
import { globSync } from 'glob'
import { fileURLToPath } from 'node:url'

export default [
  {
    input: Object.fromEntries(
      globSync('packages/**/*.ts').map((file) => [
        console.log(file),
        // 这里将删除 `src/` 以及每个文件的扩展名。
        // 因此，例如 src/nested/foo.js 会变成 nested/foo
        // path.relative(
        //   'src',
        //   file.slice(0, file.length - path.extname(file).length)
        // ),
        // 这里可以将相对路径扩展为绝对路径，例如
        // src/nested/foo 会变成 /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ])
    ),
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      clear({
        targets: ['dist'],
      }),
      typescript(),
    ],
    external: Object.keys(pkg.peerDependencies),
  },
  // {
  //   input: 'packages/index.ts',
  //   output: [
  //     {
  //       file: pkg.main,
  //       format: 'cjs',
  //     },
  //     {
  //       file: pkg.module,
  //       format: 'es',
  //     },
  //     {
  //       file: pkg.unpkg,
  //       format: 'umd',
  //       name: 'ihooks',
  //       globals: {
  //         react: 'React',
  //       },
  //     },
  //   ],
  //   external: Object.keys(pkg.peerDependencies),
  //   plugins: [
  //     clear({
  //       targets: ['dist'],
  //     }),
  //     typescript(),
  //   ],
  // },
]
