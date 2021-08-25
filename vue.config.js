// // 是否为生产环境
// const isProduction = process.env.NODE_ENV !== 'development';
 
// // gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

// // 代码压缩
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  

  // configureWebpack: config => {
  //   // 生产环境相关配置
    // if (isProduction) {
  //     //gzip压缩
  //     const productionGzipExtensions = ['html', 'js', 'css']
  //     config.plugins.push(
  //         new CompressionWebpackPlugin({
  //             filename: '[path].gz[query]',
  //             algorithm: 'gzip',
  //             test: new RegExp(
  //                 '\\.(' + productionGzipExtensions.join('|') + ')$'
  //             ),
  //             threshold: 10240, // 只有大小大于该值的资源会被处理 10240
  //             minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
  //             deleteOriginalAssets: false // 删除原文件
  //         })
  //     )
      
  //     // 代码压缩
    //   config.plugins.push(
    //     new UglifyJsPlugin({
    //         uglifyOptions: {
    //             //生产环境自动删除console
    //             compress: {
    //                 drop_debugger: true,
    //                 drop_console: true,
    //                 pure_funcs: ['console.log']
    //             }
    //         },
    //         sourceMap: false,
    //         parallel: true, // 并行
   //         cache: true   // 缓存
    //     })
    //   )    
    // }
    
  //   // 公共代码抽离
  //   config.optimization = {
  //     splitChunks: {
  //         cacheGroups: {
  //             vendor: {
  //                 chunks: 'all',
  //                 test: /node_modules/,
  //                 name: 'vendor',
  //                 minChunks: 1,
  //                 maxInitialRequests: 5,
  //                 minSize: 0,
  //                 priority: 100
  //             },
  //             common: {
  //                 chunks: 'all',
  //                 test: /[\\/]src[\\/]js[\\/]/,
  //                 name: 'common',
  //                 minChunks: 2,
  //                 maxInitialRequests: 5,
  //                 minSize: 0,
  //                 priority: 60
  //             },
  //             styles: {
  //                 name: 'styles',
  //                 test: /\.(sa|sc|c)ss$/,
  //                 chunks: 'all',
  //                 enforce: true
  //             },
  //             runtimeChunk: {
  //                 name: 'manifest'
  //             }
  //         }
  //     }
  //   }

  // }

}
