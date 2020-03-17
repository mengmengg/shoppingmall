<!--会员-->
<template>
  <div class="member">
    <div class="member_top">
      <div class="mui-card-header mui-card-media" v-if="name">
        <img src="../../assets/zhib.jpg"/>
        <div class="mui-media-body">
          <h4>欢迎您:{{name}}会员大人</h4>
        </div>
      </div>
    </div>

    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
           class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div>
          <a class="mui-control-item mui-active" @click="memberclick(0)">
            全部
          </a>
          <a class="mui-control-item" @click="memberclick(1)">
            待付款
          </a> <a class="mui-control-item " @click="memberclick(2)">
          待发货
        </a>
          <a class="mui-control-item" @click="memberclick(3)">
            待收货
          </a>
          <a class="mui-control-item" @click="memberclick(4)">
            已收货
          </a>
        </div>
      </div>
    </div>
    <hr>
    <div class="member_con" v-for="item in orderList" :key="item.id">
      <div class="mui-card-header mui-card-media" @click="goDetail(item.sid)">
        <img :src="item.thumb_path" />
        <div class="mui-media-body">
          {{item.title}}
          <p class="red">总价:{{item.sell_price}}</p>
          <button @click="goDetail(item.sid)">再次购买</button>

        </div>
      </div>
    </div>

    <h4 style="text-align: center">{{mag}}</h4>
  </div>
</template>

<script>
    import mui from '../../mui/js/mui.min'
    import {Toast} from "mint-ui";

    export default {
        data() {
            return {name: "",orderList:[],mag:""}
        },
        created() {
            this.getName(),
                this.$http.get("/api/order/orderList").then(result => {
                    if (result.status === 200) {
                        // 成功了
                        this.orderList = result.data.data;
                        if (this.orderList.length === 0) {
                            this.mag = "暂无信息"
                        }

                    } else {
                        Toast("获取失败。。。");
                    }
                })
        }, methods: {
            getName() {
                this.name = localStorage.getItem("name");
                console.log(this.name)
                if (this.name == null) {
                    this.$router.push("/member/login")
                }

            },memberclick(id){
                if (id===0){
                    this.$http.get("/api/order/orderList").then(result => {
                        if (result.status === 200) {
                            // 成功了
                            this.orderList = result.data.data;
                            if (this.orderList.length === 0) {
                                this.mag = "暂无信息"
                            }else {
                                this.mag = ""
                            }

                        } else {
                            Toast("获取失败。。。");
                        }
                    })

                }else {
                    this.$http.get("/api/order/orderList/" + id).then(result => {
                        if (result.status === 200) {
                            // 成功了
                            this.orderList = result.data.data;
                            if (this.orderList.length === 0) {
                                this.mag = "暂无信息"
                            }else {
                                this.mag = ""
                            }s
                        } else {
                            Toast("获取失败。。。");
                        }
                    })
                }

            },
            goDetail(id) {
                this.$router.push({ name: "goodsinfo", params: { id } });
            }
        }
    }
</script>

<style scoped>
  .member {
    touch-action: pan-y;
  }
  .member_top .mui-card-header img {
    border-radius: 20%;
    width: 100px;
    height: 100px;
  }

  .member .mui-card-header {
    height: 120px;
  }

  .member .mui-media-body {
    position: relative;
    top: 20px;
    left: 20px;
  }

  .mui-segmented-control.mui-scroll-wrapper .mui-scroll {
    width: inherit;
    height: 40px;
    white-space: nowrap;
  }
  .member_con img{
    width: 80px;
    height: 80px;
  }
.red{
  color: red;
  padding: 5px;
}
</style>
