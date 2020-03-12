<!--留言反馈-->
<template>
  <div class="messageinfo">
  <div class="mui-input-group">
    <div class="mui-input-row">
      <label>姓名：</label>
      <input type="text" class="mui-input-clear" placeholder="请输入姓名" v-model="name">
    </div>
    <div class="mui-input-row">
      <label>邮箱：</label>
      <input type="text" class="mui-input-clear " placeholder="请输入邮箱" v-model="mailbox">
    </div>
    <div class="mui-input-row" style="height: 200px">
      <label>建议：</label>
      <textarea type="text" class=""  rows="3" cols="20" placeholder="请输入建议"  v-model="proposal"/>
    </div>
    <div id="but">

      <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="submit()">提交</button>

      <button type="button" class="mui-btn mui-btn-outlined mui-btn-outlined">取消</button>
    </div>

  </div>


  </div>

</template>

<script>

    import {Toast} from "mint-ui";
    export default {
        name: "MessageInfo",
        data(){
            return {name:"",mailbox:"",proposal:"",flg:true}
        },
        methods:{
            submit(){

                if (this.name==""){

                    Toast("姓名不能为空！");
                    this.flg=false;
                    return false;

                }else if (this.mailbox==""){
                    Toast("邮箱不能为空！");

                    this. flg=false;
                    return false;

                }else if (this.proposal==""){
                    Toast("建议不能为空！");

                    this. flg=false;
                    return false;

                }
                //调用提交接口，现在因没有后台接口暂时就不调用了直接算提交成功
                if (this.flg){

                    Toast("提交成功，谢谢您的反馈，我们会抓紧时间与您联系！");
                }


            }
        }


    }
</script>

<style scoped>
  #but{
    text-align: center;
    margin-top: 30px;
    padding-bottom: 30px;
  }


</style>
