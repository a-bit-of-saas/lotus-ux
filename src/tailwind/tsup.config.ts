import { defineConfig } from 'tsup'

export default defineConfig({
  // minify: true,
  target: 'es2018',
  external: undefined,
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm', 'cjs']
})
