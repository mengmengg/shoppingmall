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
  </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import swiper from '@/components/subcomponents/swiper.vue'

    export default {
        data() {
            return {

                lunbotuList: []// 保存轮播图的数组
            };
        },
        created() {
            this.getLunbotu();
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

  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }


  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }

</style>
