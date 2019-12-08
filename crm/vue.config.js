const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')

// 雪碧图生成模板
// 高清图适配
const ratio = 6
const templateFunction = (data) => {
  const shared = '.icon { display: inline-block; background-image: url(I); background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image)
    .replace('W', data.spritesheet.width / ratio)
    .replace('H', data.spritesheet.height / ratio)

  const perSprite = data.sprites.map(sprite => '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx;}'
    .replace('N', sprite.name)
    .replace('W', sprite.width / ratio)
    .replace('H', sprite.height / ratio)
    .replace('X', sprite.offset_x / ratio)
    .replace('Y', sprite.offset_y / ratio)).join('\n')

  return `${shared}\n${perSprite}`
}

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        // target: 'http://10.1.1.123:8090/igo_admin/', // crm 开发环境数据
        target: 'http://n.24igo.com/igo_admin/', // crm 生产环境数据
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  configureWebpack: (config) => {
    const plugins = [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, './src/assets/icon'),
          glob: '*.png',
        },
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprite.png'), // 生成雪碧图目标路径与名称
          // 设置生成CSS背景及其定位的文件或方式
          css: [
            [path.resolve(__dirname, './src/assets/scss/_sprite.scss'), {
              format: 'function_based_template',
            }],
          ],
        },
        customTemplates: {
          function_based_template: templateFunction,
        },
        apiOptions: {
          cssImageRef: './assets/images/sprite.png', // css文件中引用雪碧图的相对位置路径配置
        },
        spritesmithOptions: {
          padding: 10,
        },
      }),
    ]

    // eslint-disable-next-line no-param-reassign
    config.plugins = [...config.plugins, ...plugins]
  },
}
