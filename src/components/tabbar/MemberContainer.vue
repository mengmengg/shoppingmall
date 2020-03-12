<!--会员-->
<template>
  <div class="member">
    <div class="mui-card-header mui-card-media" v-if="name">
      <img src="../../assets/zhib.jpg"/>
      <div class="mui-media-body">
        <h4>欢迎您:{{name}}会员大人</h4>
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
  </div>
</template>

<script>
    import mui from '../../mui/js/mui.min'
    import {Toast} from "mint-ui";

    export default {
        data() {
            return {name: ""}
        },
        created() {
            this.getName()
        }, methods: {
            getName() {
                this.name = localStorage.getItem("name");
                console.log(this.name)
                if (this.name == null) {
                    this.$router.push("/member/login")
                }

            },memberclick(id){

            }
        }
    }
</script>

<style scoped>
  .member {
    touch-action: pan-y;
  }
  .member .mui-card-header img {
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

</style>
