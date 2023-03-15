import type { Configuration } from 'webpack'
import HTMLPlugin from 'html-webpack-plugin'

const configure: Configuration = {
  context: __dirname,
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: require.resolve('ts-loader'),
      },
    ],
  },
  plugins: [new HTMLPlugin({ title: 'FPGA and ASIC costs analytics' })],
}

export default configure
