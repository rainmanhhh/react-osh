import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import pkg from './package.json'

const globals = {
  react: 'React'
}

export default {
  input: `src/index.ts`,
  output: [
    {file: pkg.main, name: 'main', format: 'umd', sourcemap: true, globals},
    {file: pkg.module, format: 'es', sourcemap: true, globals}
  ],
  external: ['react'],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn"t understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use "external" to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ]
}
