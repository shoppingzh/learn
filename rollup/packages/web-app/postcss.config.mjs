import imp from 'postcss-import'
import nested from 'postcss-nested'

console.log('postcss');

export default {
  plugins: [
    imp({}),
    nested(),
  ]
}
