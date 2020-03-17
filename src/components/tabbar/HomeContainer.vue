<template>
  <div>
    <!--轮播图-->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../assets/menu1.png" alt="">
          <div class="mui-media-body">测评资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../assets/menu2.png" alt="">
          <div class="mui-media-body">天天特卖</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/goods/goodslist">
          <img src="../../assets/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/messageInfo">
        <img src="../../assets/menu4.png" alt="">
        <div class="mui-media-body">留言反馈</div>
      </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/livebro">
        <img src="../../assets/menu5.png" alt="">
        <div class="mui-media-body">直播专区</div>
      </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/contactus">
        <img src="../../assets/menu6.png" alt="">
        <div class="mui-media-body">联系我们</div>
      </router-link></li>
    </ul>
    <div class="shopCar">
      <div class="photoList">
        <!--导航-->
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
  </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import swiper from '@/components/subcomponents/swiper.vue'

    export default {
        data() {
            return {
                classification:[],//所有分类数组
                commodityList: [],//抢购商品列表
                lunbotuList: [],// 保存轮播图的数组
                mag:"加载更多"
            };
        },
        created() {
            this.getLunbotu(),
            this.getAll(), this.getComments()
        },
        methods: {
            getLunbotu() {
                // 获取轮播图数据的方法
                this.$http.get("/api/getlunbo").then(result => {
                    if (result.status === 200) {
                        // 成功了
                        this.lunbotuList = result.data.data;
                    } else {
                        Toast("加载轮播图失败。。。");
                    }
                });
            },getAll(){
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
        },
        components: {
            swiper
        }
    };
</script>

<style scoped>
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
  }

  .mui-table-view img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }


  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
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
