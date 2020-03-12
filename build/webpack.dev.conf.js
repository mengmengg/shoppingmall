'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
//模拟数据第一步
const express = require('express')
const app = express()//请求server
var appData = require('../mode/data.json')//加载本地数据文件
var getlunbo = appData.getlunbo//获取轮播图数据
/*var apiRoutes = express.Router()
app.use('/api', apiRoutes)//通过路由请求数据*/
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    //第二步找到devServer,在里面添加
    before(app) {
      app.get('/api/getlunbo', (req, res) => {
        res.json({
          data: getlunbo
        })
      }),
        app.get("/api/getnewslist", (req, res) => {
          res.json({
            data: appData.news
          })
        })
        ,
        app.get("/api/getnewslnfo/:id", (req, res,next) => {
          var id=req.params.id;
          var newslist=appData.news;

          for (let i = 0; i <newslist.length ; i++) {
            if (id==newslist[i].nid){
              res.json({

                data:newslist[i]

              });
              break
            }

          }

        })
      ,
      app.get("/api/getcomments/:id/:pageindex", (req, res) => {
        var comment=appData.comment;
/*
        var id=req.params.id;
        var pageindex=req.params.pageindex;
        var comment=appData.comment;
        var commentList=new Array();

        for (let i = 0; i <comment.length ; i++) {
          if (id==comment[i].artid&&comment[i].type==1){//资讯的评论id+是评论的资讯还是精选好物
            commentList.push(comment[i]);
          }

        }
        // 分页-1
        var newPage = pageindex - 1;


// 查询数据的总量 页数 和数据量相乘  (当前 页数乘以当前条数)=总数量
        var newNumber = newPage * 2;
        var count=commentList.length;


// 如果查询的数据量 大于总数据量
// 当查询的数据大于剩余的数据量的时候 
//数据的总数量 对查询的当前条数取余数  然后总数量减去这个余数当做当前的要查询的页数
        if (newNumber > count) {
          return count - parseInt(count % pageindex);
        }
        for (var j=newNumber;)*/

        res.json({

          data:appData.comment

        });
      })

    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
