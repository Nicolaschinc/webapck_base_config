const { merge } = require('webpack-merge');
const common = require('./webpack.base');
const webpack = require('webpack');
const SpritesmithPlugin = require('webpack-spritesmith');
const argv = require('yargs').argv;
const path = require('path');
const plugins = [];

var templateFunction = function (data) {
  const filename = path.basename(data.sprites[0].image);
  var shared = '.ico { background-image: url(I) }'
    .replace('I', '../img/' + filename);

  var perSprite = data.sprites.map(function (sprite) {
    return '.ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
};

if (argv.sprite) {
  plugins.push(new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, '../src/sprite/'),
      glob: '**/*.{jpg,png}'
    },
    target: {
      image: path.resolve(__dirname, '../src/img/img-sprite.png'),
      css: [
        [path.resolve(__dirname, '../src/scss/sprite.scss'), {
          format: 'handlebars_based_template'
        }]
      ]
    },
    customTemplates: {
      'handlebars_based_template': path.resolve(__dirname, '../src/scss/scss.template.handlebars')
    },
  }))
}

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    publicPath: '',
    contentBase: path.resolve(__dirname, 'dist'),
    compress: false,
    port: 3000,
    hot: true,
    inline: true,
    open: false
  },
  resolve: {
    modules: ['node_modules', 'src/sprites']
  },
  plugins: [...plugins, new webpack.ProgressPlugin()],
  devtool: 'eval-source-map'
});