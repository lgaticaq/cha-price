import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/browser.js',
  output: {
    file: 'dist/cha-price.min.js',
    format: 'iife',
    name: 'ChaPrice',
    sourcemap: 'inline',
    globals: {
      'jssha': 'jsSHA'
    }
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel(),
    uglify()
  ]
}
