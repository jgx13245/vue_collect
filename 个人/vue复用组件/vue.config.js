const VConsole = require('vconsole-webpack-plugin')
const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')
const SentryCliPlugin = require('@sentry/webpack-plugin')
const version = require('./package.json').version

// 雪碧图生成模板
const templateFunction = (data) => {
  const shared = '.icon { display: inline-block; background-image: url(I); background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image)
    .replace('W', data.spritesheet.width)
    .replace('H', data.spritesheet.height)

  const perSprite = data.sprites.map(sprite => {
    return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx;}'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y)
  }).join('\n')

  return shared + '\n' + perSprite
}

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://m.24igo.com/igo/', // app-active 线上地址
        // target:'http://10.1.1.112:8081/',  // igo-crm可视化本地联调
        // target: 'http://10.1.1.195:8081/igo/', // app-active本地化联调
        // target:'http://59.110.29.79/igo/', // app-active 测试服务器联调
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  },
  configureWebpack: config => {
    /* eslint-disable */
    const devPlugins = [
      new VConsole({
        filter: [],
        enable: true
      })
    ]

    const proPlugins = [
      new SentryCliPlugin({
        release: version,
        include: './dist',
        ignore: ['node_modules', 'vue.config.js'],
        filenameTransform: filename => '~/' + filename
      })
    ]

    config.resolve.modules = ['node_modules', 'assets/images']

    const plugins = [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, './src/assets/icon'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprite.png'), // 生成雪碧图目标路径与名称
          // 设置生成CSS背景及其定位的文件或方式
          css: [
            [path.resolve(__dirname, './src/assets/css/sprite.scss'), {
              format: 'function_based_template'
            }]
          ]
        },
        customTemplates: {
          'function_based_template': templateFunction,
        },
        apiOptions: {
          cssImageRef: "~sprite.png", // css文件中引用雪碧图的相对位置路径配置
        },
        spritesmithOptions: {
          padding: 10,
        }
      })
    ]

    if (process.env.NODE_ENV === 'development') {
      config.plugins = [...config.plugins, ...plugins, ...devPlugins]
    } else {
      config.plugins = [...config.plugins, ...plugins, ...proPlugins]
    }
  }
}