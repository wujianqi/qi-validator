import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const env = process.env.NODE_ENV;
let commonPlugins = [
  resolve(),
  commonjs({
    namedExports: {
      'lib/rules.js': ['norepeat', 'ext'],
      'es/rules.js': ['norepeat', 'ext']
    }
  }),
  typescript()
];

if (env && env.trim() === 'production') {
  commonPlugins.push(terser());
}

var config = [
  {
    input: './src/validator.ts',
    output: [{
      format: 'umd',
      name: 'validator',
      file: 'lib/validator.js'
    },{
      format: 'es',
      name: 'validator',
      file: 'es/validator.js'
    }],
    plugins: commonPlugins
  }, 
  {
    input: './src/methods.ts',
    output: [{
      format: 'umd',
      name: 'methods',
      file: 'lib/methods.js'
    },{
      format: 'es',
      name: 'methods',
      file: 'es/methods.js'
    }],
    plugins: commonPlugins
  },
  {
    input: './src/rules.ts',
    output: [{
      format: 'umd',
      name: 'rules',
      file: 'lib/rules.js'
    },{
      format: 'es',
      name: 'rules',
      file: 'es/rules.js'
    }],
    plugins: commonPlugins
  }
];

export default config;
