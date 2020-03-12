<template>
  <div class="photoList">
    <!--导航-->
    <div class="photoList_nav">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl"
             class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a class="mui-control-item mui-active" @tap="getPhotoListByCateId(0)">
              9.9疯抢
            </a>
            <a class="mui-control-item" @tap="getPhotoListByCateId(1)">
              19.9热销
            </a>
            <a class="mui-control-item" @tap="getPhotoListByCateId(2)">
              39封顶
            </a>
          </div>
        </div>

      </div>

      <div  class="mui-slider">
        <div
             class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a :class="['mui-control-item', item.id == 0? 'mui-active' : '']" v-for="item in cates" :key="item.id"
               @tap="getPhotoListByCatesId(item.id)">
              {{ item.title }}
            </a>
          </div>
        </div>

      </div>
    </div>
    <div class="photoList_good">
      <div class="mui-content">
        <div class="mui-row">
          <div class="mui-col-sm-6 mui-col-xs-6">
            <div class="mui-card">
              <!--页眉，放置标题-->
              <div class="mui-card-header"><img
                src="https://img.alicdn.com/imgextra/i1/822490098/O1CN01cex71t1CavOZfhSrt_!!0-saturn_solar.jpg_220x220.jpg_.webp">
              </div>
              <!--内容区-->
              <div class="mui-card-content">网红衣服</div>
              <!--页脚，放置补充信息或支持的操作-->
              <div class="mui-card-footer">
                    <span class="pier">
                      9.9
                    </span>
                <span>即将售完</span>
              </div>
            </div>
          </div>
          <div class="mui-col-sm-6 mui-col-xs-6">
            <div class="mui-card">
              <!--页眉，放置标题-->
              <div class="mui-card-header"><img
                src="https://img.alicdn.com/imgextra/i1/822490098/O1CN01cex71t1CavOZfhSrt_!!0-saturn_solar.jpg_220x220.jpg_.webp">
              </div>
              <!--内容区-->
              <div class="mui-card-content">网红衣服</div>
              <!--页脚，放置补充信息或支持的操作-->
              <div class="mui-card-footer">
                    <span class="pier">
                      9.9
                    </span>
                <span>即将售完</span>
              </div>
            </div>
          </div>

          <div class="mui-col-sm-6 mui-col-xs-6">
            <div class="mui-card">
              <!--页眉，放置标题-->
              <div class="mui-card-header"><img
                src="https://img.alicdn.com/imgextra/i1/822490098/O1CN01cex71t1CavOZfhSrt_!!0-saturn_solar.jpg_220x220.jpg_.webp">
              </div>
              <!--内容区-->
              <div class="mui-card-content">网红衣服</div>
              <!--页脚，放置补充信息或支持的操作-->
              <div class="mui-card-footer">
                    <span class="pier">
                      9.9
                    </span>
                <span>即将售完</span>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>
  </div>

</template>

<script>

    // 1. 导入 mui 的js文件
    import mui from "../../mui/js/mui";
    /**/
    export default {
        data() {
            return {
                cates: [{
                    id: 1,
                    title: "日用百货"
                },
                    {
                        id: 2,
                        title: "家居家装"
                    },
                    {
                        id: 3,
                        title: "美容个护"
                    },
                    {
                        id: 4,
                        title: "平价美食"
                    },
                    {
                        id: 5,
                        title: "母婴儿童"
                    },
                    {
                        id: 6,
                        title: "数码家电"
                    },
                    {
                        id: 7,
                        title: "服装内衣"
                    },
                    {
                        id: 8,
                        title: "日用百货"
                    },
                    {
                        id: 9,
                        title: "鞋包配饰"
                    },
                    {
                        id: 10,
                        title: "运动户外"
                    }
                ],//所有分类数组
                photoList: []//抢购商品列表
            }
        },
        created(){
            this.getAll()
        },
        mounted(){
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            //获取商品类别，因为没连接数据库，直接就在里面写了，如果需要直接在里面增加请求方法就可以
            getAll(){
                var cate={id:0,title:"全部类目"}
                this.cates.splice(0,cate)

            }
            ,
            getPhotoListByCateId(id) {


            },
            getPhotoListByCatesId(id) {
            }
        }
    }
</script>

<style>
  .photoList {
    touch-action: pan-y;
  }
  .photoList_nav {
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
    border-bottom: 0;
    background-color: #f7f7f7;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    padding: 5px;
  }

  .photoList {
    position: relative;
  }

  .photoList #slider {
    background: white;
    border-bottom: 1px solid #8a8181;
  }

  .photoList .mui-tab-item {
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    text-overflow: ellipsis;
    color: #543d3d;
    line-height: 40px;
  }

  .photoList_good {
    position: relative;
    top: 80px;
  }

  .photoList_good .mui-card-header img {
    width: 100%;
    height: 100%;
  }

  .photoList_good .mui-card-content {
    padding-left: 5px;
  }

  .photoList_good .pier {
    border-radius: 25px;
    background: #cc7a44;
    width: 40px;
    height: 20px;
    text-align: center;
    color: black;
  }
</style>
