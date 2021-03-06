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
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
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
        app.get("/api/getnewslnfo/:id", (req, res, next) => {
          var id = req.params.id;
          var newslist = appData.news;

          for (let i = 0; i < newslist.length; i++) {
            if (id == newslist[i].nid) {
              res.json({

                data: newslist[i]

              });
              break
            }

          }

        })
        ,
        app.get("/api/getcomments/:id/:pageindex", (req, res) => {
          var comment = appData.comment;
          res.json({

            data: appData.comment

          });
        }) ,
        app.get("/api/livebro", (req, res) => {
          var livero = appData.livero;
          res.json({

            data: appData.livero

          });
        })
        ,
        app.get("/api/commodityList", (req, res) => {
          res.json({

            data: appData.commodity

          });
        })
        ,
        /*classification 类别*/
        app.get("/api/classification", (req, res) => {
          res.json({

            data: appData.classification

          });
        }),
      /*classification 根据类别查询商品*/
      app.get("/api/commodityListById/:id", (req, res, next) => {

        var app=new Array();
       var id=  req.params.id;
        for (let i = 0; i <appData.commodity.length ; i++) {
          if (parseInt(appData.commodity[i].fid)===parseInt(id)){
            app.push(appData.commodity[i])
          }
        }

        res.json({

          data: app

        });
      }),
      /*getthumimages  */
        app.get("/api/getthumimages/:id", (req, res, next) => {

          var app=new Array();
          var id=  req.params.id;
          for (let i = 0; i <appData.getthumimages.length ; i++) {
            if (parseInt(appData.getthumimages[i].sid)===parseInt(id)){
              app.push(appData.getthumimages[i])
            }
          }
          res.json({

            data: app

          });
        })
    ,
      /*商品信息*/
      app.get("/api/goods/getinfo/:id", (req, res, next) => {
        var app=new Array();
        var id=  req.params.id;
        for (let i = 0; i <appData.commodity.length ; i++) {
          if (parseInt(appData.commodity[i].id)===parseInt(id)){
            app.push(appData.commodity[i])
          return   res.json({

              data: app

            });

          }
        }

      }),
        /*/api/goods/getshopcarlist/ 购物车*/
        app.get("/api/goods/getshopcarlist/:id", (req, res, next) => {

          var app=new Array();
          var id=  req.params.id;
          for (let i = 0; i <appData.shopcarlist.length ; i++) {
            if (parseInt(appData.shopcarlist[i].uid)===parseInt(id)){
              app.push(appData.shopcarlist[i])
            }
          }
          res.json({

            data: app

          });
        }),
        /*订单信息 orderList*/
        app.get("/api/order/orderList/:id", (req, res, next) => {

          var app=new Array();
          var id=  req.params.id;
          for (let i = 0; i <appData.orderList.length ; i++) {
            if (parseInt(appData.orderList[i].id)===parseInt(id)){
              app.push(appData.orderList[i])
            }
          }
          res.json({

            data: app

          });
        }),
        /*订单信息 orderList*/
        app.get("/api/order/orderList", (req, res, next) => {

          res.json({

            data: appData.orderList

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
