<!--购物-->
<template>
  <div class="shopCar">
    <div class="photoList">
      <!--导航-->
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl"
             class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a :class="['mui-control-item', item.id == 0? 'mui-active' : '']" v-for="item in classification" :key="item.id"
               @click="getcomListById(item.id)">
              {{ item.title }}
            </a>
          </div>
        </div>
      </div>
      <div class="goods-list">
        <div class="goods-item" v-for="item in commodityList" :key="item.id" @click="goDetail(item.id)">
          <img :src="item.img_url" alt="">
          <h1 class="title">{{ item.title }}</h1>
          <div class="info">
            <p class="price">
              <span class="now">￥{{ item.sell_price }}</span>
              <span class="old">￥{{ item.market_price }}</span>
            </p>
            <p class="sell">
              <span>热卖中</span>
              <span>剩{{ item.stock_quantity }}件</span>
            </p>
          </div>
        </div>


        <mt-button type="danger" size="large" @click="getMore" >{{mag}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
    import {Toast} from "mint-ui";
    // 1. 导入 mui 的js文件
    import mui from "../../mui/js/mui";
    /**/
    export default {
        data() {
            return {
                classification:[],//所有分类数组
                commodityList: [],//抢购商品列表
                mag:"加载更多"
            }
        },
        created(){
            this.getAll(),
                this.getComments()
        },
        mounted(){
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            //获取商品类别，因为没连接数据库，直接就在里面写了，如果需要直接在里面增加请求方法就可以
            getAll(){
                this.$http.get("/api/classification").then(result=>{
                    if (result.status===200){
                        return   this.classification = result.data.data;
                    }else {
                        Toast("获取失败。。。");
                    }
                })

            }
            ,
            getComments(){
                this.$http.get("/api/commodityList").then(result => {
                    if (result.status === 200) {
                        // 成功了
                      return   this.commodityList = result.data.data;
                    } else {
                        Toast("获取失败。。。");
                    }
                });
                },
            getcomListById(id) {
                if (id!==0){
                    this.$http.get("/api/commodityListById/"+id).then(result => {
                        if (result.status === 200) {
                            // 成功了
                           this.commodityList = result.data.data;
                           if (this.commodityList.length===0){
                               this.mag="暂无信息"
                           }

                        } else {
                            Toast("获取失败。。。");
                        }
                    });
                }else {

                    this.getComments()
                }




            },
            goDetail(id) {
                this.$router.push({ name: "goodsinfo", params: { id } });
            },
            getMore(){
                Toast("暂无更多");
            }
        }
    }
</script>
<style  scoped>
  .shopCar {
    touch-action: pan-y;
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
  }

    .goods-item {
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;
    }
      img {
        width: 100%;
      }
      .title {
        font-size: 14px;
      }

      .info {
        background-color: #eee;
      }
        p {
          margin: 0;
          padding: 5px;
        }
          .now {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }

        .sell {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
</style>
