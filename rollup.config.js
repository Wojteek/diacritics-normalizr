import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/index.js',
        format: 'cjs'
      },
      {
        file: './dist/index.mjs',
        format: 'esm'
      },
    ],
    plugins: [
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
];
