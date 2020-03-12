<template>
  <div class="con">
    <div id="search">

      <input type="text" class="mText_Search" placeholder="科颜氏白膜"/>
      <button type="button" class="mui-btn mui-btn-warning mui-btn-outlined but_search">搜索</button>
    </div>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="i in newslist" :key="i.nid">
      <router-link :to="'/search/newslnfo/'+i.nid" >
        <img class="mui-media-object mui-pull-left" :src=i.img_url>
        <div class="mui-media-body">
          {{i.title}}
          <p class="mui-ellipsis">{{i.zhaiyao}}</p>
          <p align="right">

            <span style="color:red">点击量:{{i.click}}</span>
            <span style="color: goldenrod">时间:{{i.add_time}}</span>&nbsp;
          </p>
        </div>

      </router-link>
    </li>


  </ul>


  </div>

</template>
<script>
    import {Toast} from "mint-ui";
    export default {
        data() {
            return {

                newslist: []// 保存轮播图的数组
            };},
        created() {
            this.getNewslist();
        },
        methods: {
            getNewslist() {
                // 获取测评资讯
                this.$http.get("/api/getnewslist").then(result => {
                    if (result.status === 200) {
                        // 成功了
                        this.newslist = result.data.data;
                    } else {
                        Toast("资讯列表加载失败。。。");
                    }
                });
            }
        }
    };
</script>
<style scoped>
  .mui-table-view{
    margin-top: -10px;
  }
  #search{
    text-align: center;
    margin-top: 20px;
  }
  .mText_Search{
    width: 80%;
  }
  .but_search{
    height: 40px;
  }
  .mui-ellipsis{
    font-size: 18px;
  }
</style>
