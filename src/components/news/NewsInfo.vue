<template>
  <div class="newlnfo-con">
    <div class="feed-hd"><!--
      <div class="newlnfo-author">作者:{{newslnfo.zuozhe}}  </div>-->
      <div class="newlnfo-title"><span>{{newslnfo.titele}}</span></div>
      <div class="newlnfo-click">
        <em>点击量:{{newslnfo.click}}</em>
        <br>
        时间:{{newslnfo.add_time}}

        </div>
    </div>
    <hr>
    <div class="blog-content" v-html="newslnfo.content">

    </div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
    import {Toast} from "mint-ui";
    // 1. 导入 评论子组件
    import comment from "../subcomponents/comment.vue";
    export default {
        data() {
            return {
                id:this.$route.params.id,
                newslnfo: {}
            };},
        created() {
            this.getNewslist();
        },
        methods: {
            getNewslist() {
                // 获取测评资讯
                this.$http.get("/api/getnewslnfo/" + this.id).then(result => {
                    if (result.status === 200) {
                        // 成功了
                        this.newslnfo = result.data.data;
                    } else {
                        Toast("资讯详情加载失败。。。");
                    }
                });
            }
        }
        ,components:{
           "comment-box": comment
    }
    };

</script>
<style>
  .newlnfo-con{
    background: white;
    padding: 0 4px;
  }
.newlnfo-title{
  text-align: center;
  font-size: 24px;
  line-height: 49px;
  font-weight: 700;

}

  .newlnfo-author{
    color: red;
  }
  .newlnfo-click{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .blog-content img{
    width: 100%;
  }

</style>
