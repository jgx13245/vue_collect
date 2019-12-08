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
  publicPath:'/',
  outputDir: 'dist',//打包后的目录名称
  assetsDir: 'static',//静态资源目录名称
  devServer: {
    host: '0.0.0.0',
    port: 3009,
    proxy: {
      '/umapis': {
        // target: 'http://10.1.1.197:8081/umbrella/', 
        // target: 'http://server.iumed.com.cn/umbrella/', // umbrella 线上地址
        // target:'http://192.168.10.204:8080/', // umbrella 外包线上地址
        target:'https://cubemedlink.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/umapis/': ''
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