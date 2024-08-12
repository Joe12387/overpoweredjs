const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const packageJson = require('./package.json')

const currentYear = new Date().getFullYear()

const bannerText = `/*!
 *
 * OverpoweredJS OS v${packageJson.version}
 *
 * https://github.com/Joe12387/overpoweredjs
 *
 * Copyright (c) 2022 - ${currentYear} Joe Rutkowski <Joe@dreggle.com>
 *
 * Released under the OverpoweredJS OS License
 *
 * This software is subject to very specific licensing terms.
 * You should read them before using this software in any capacity.
 *
 * DO NOT:
 * - Remove this banner.
 * - Use this software for any commercial purposes.
 * - Use this software to track users without their consent.
 *
 * Please see the LICENSE.md file for more information.
 * If you don't have a LICENSE.md file, see the above URL.
 *
 * Removing this banner is considered a violation of the OverpoweredJS OS License.
 *
 **/`

class PreserveBannerPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap('PreserveBannerPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'PreserveBannerPlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        (assets) => {
          for (const assetName in assets) {
            if (assetName.endsWith('.js')) {
              const source = assets[assetName].source()
              assets[assetName] = {
                source: () => bannerText + '\n' + source,
                size: () => bannerText.length + source.length
              }
            }
          }
        }
      )
    })
  }
}

const commonConfig = (isEsm) => ({
  entry: './src/opjs.ts',
  mode: 'production',
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: isEsm
              ? {
                  module: 'es2015'
                }
              : undefined
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: []
})

const umdConfig = {
  ...commonConfig(false),
  output: {
    path: path.resolve(__dirname, 'dist/es5'),
    filename: 'opjs.min.js',
    library: {
      name: 'opjs',
      type: 'umd'
    },
    globalObject: 'this',
    libraryExport: 'default'
  },
  target: ['web', 'es5'],
  plugins: [
    ...commonConfig(false).plugins,
    new PreserveBannerPlugin()
  ]
}

const esmConfig = {
  ...commonConfig(true),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'opjs.esm.js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    ...commonConfig(true).plugins,
    new PreserveBannerPlugin()
  ]
}

module.exports = [umdConfig, esmConfig]
