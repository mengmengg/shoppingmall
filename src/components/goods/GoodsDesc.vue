<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {} // 图文数据
            };
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                this.$http
                    .get("/api/goods/getinfo/" + this.$route.params.id)
                    .then(result => {
                        if (result.status === 200) {
                            this.info = result.data.data[0];
                        }
                    });
            }
        }
    };
</script>

<style  scoped>
  .goodsdesc-container {
    padding: 4px;
  }
    h3 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
  img{
        width: 100%;
      }
</style>
