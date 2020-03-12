<template>
  <div class="container">
    <div class="player">
      <div v-if="videoList" class="mui-card" v-for="i  in videoList" :key="i.id">
        <!--内容区-->
        <div class="mui-card-content"> <livebro :videoSrc="i.livbor" :poster="i.livboeimg"
        >
        </livebro></div>
        <!--页脚，放置补充信息或支持的操作-->
        <div class="mui-card-footer">
          <h3>{{i.name}}</h3>
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart" style="color: red" >
				</span>
          {{i.sid}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import livebro from '@/components/subcomponents/video.vue'
    export default {
        data () {
            return {
                videoList:[]

            }},
        beforeMount(){
            // 获取轮播图数据的方法
            this.$http.get("/api/livebro").then(result => {
                if (result.status === 200) {
                    // 成功了
                    this.videoList = result.data.data;
                } else {
                    Toast("加载轮播图失败。。。");
                }
            });
        },
        components: {
            livebro
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
</style>
<!--   getLive() {
                // 获取轮播图数据的方法
                this.$http.get("/api/livebro").then(result => {
                    if (result.status === 200) {
                        // 成功了
                        this.livebro = result.data.data;
                    } else {
                        Toast("加载轮播图失败。。。");
                    }
                });
            }-->
