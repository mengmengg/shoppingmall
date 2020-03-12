<!--联系我们-->
<template>
  <div class="contactus">
    <img src="../../assets/lianxi.jpg" id="contactus-img">
  <div class="mui-card-header mui-card-media" >
    <img src="../../assets/weixin.png" />
    <div class="mui-media-body" @click="weixin()">
      微信官方
      <p>请扫描二维码，关注微信官方</p>
    </div>
  </div>
    <div class="mui-card-header mui-card-media">
      <img src="../../assets/dianhua.png" />
      <div class="mui-media-body">
        服务热线
        <p>010-0980883</p>
      </div>
    </div>
    <div class="mui-card-header mui-card-media">
      <img src="../../assets/location.png" />
      <div class="mui-media-body">
        售后服务网点
        <p>优先获取离您最近的地址请点击查看</p>
      </div>
    </div>
    <!--分享弹出窗 begin-->

    <mt-popup class="sharePopup" v-model="popupVisible" position="right">

        <img src="../../assets/weixin2.jpg" width="100%" />
      <div class="shareFooter">

        <div class="shareCancel mui-btn mui-btn-outlined mui-btn-outlined" @click="hiddenShare()">取消</div>
      </div>
    </mt-popup>
    <!--分享弹出窗 end-->

  </div>
</template>

<script>

    import {Toast} from "mint-ui";
    export default {
        name: "ContactusContainer",
        data(){
            return {
                popupVisible:false}
        },
        methods:{
            hiddenShare(){
                this.popupVisible=false
            },weixin(){

                this.popupVisible=true
            }
        }


    }
</script>

<style scoped>
.contactus .mui-card-media img{
  width: 40px;
  height: 40px;
}
  .contactus  #contactus-img{
    width: 100%;
  }
  .contactus .mui-card-header{
    display: block;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 18px;
    margin: 10px;
  }
  .contactus .shareFooter{
    text-align: center;
  }
</style>
