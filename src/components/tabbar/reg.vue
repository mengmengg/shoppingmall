<template>
  <div class="mui-content">
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>账号</label>
        <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
      </div>
      <div class="mui-input-row">
        <label>密码</label>
        <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
      </div>
      <div class="mui-input-row">
        <label>确认</label>
        <input id='password_confirm' type="password" class="mui-input-clear mui-input" placeholder="请确认密码">
      </div>
      <div class="mui-input-row">
        <label>邮箱</label>
        <input id='email' type="email" class="mui-input-clear mui-input" placeholder="请输入邮箱">
      </div>
    </form>
    <div class="mui-content-padded">
      <button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="reg()">注册</button>
    </div>
    <div class="mui-content-padded">
      <p>注册真实可用，注册成功后的用户可用于登录，但是示例程序并未和服务端交互，用户相关数据仅存储于本地。</p>
    </div>
  </div>
</template>

    <script>
    import  mui from  '../../mui/js/mui.min'
    import {Toast} from "mint-ui";
    export default {
        name: "reg",
        data(){
            return{name:"",pwd:""}
        },
        created() {
            mui('.mui-switch')['switch']()
        },methods:{
            reg(){
                    Toast("注册成功，请您登录。。。");
                this.$router.push("/member/login")

            }
        }
    }
</script>

<style scoped>
  .area {
    margin: 20px auto 0px auto;
  }
  .mui-input-group:first-child {
    margin-top: 20px;
  }
  .mui-input-group label {
    width: 22%;
  }
  .mui-input-row label~input,
  .mui-input-row label~select,
  .mui-input-row label~textarea {
    width: 78%;
  }
  .mui-checkbox input[type=checkbox],
  .mui-radio input[type=radio] {
    top: 6px;
  }
  .mui-content-padded {
    margin-top: 25px;
  }
  .mui-btn {
    padding: 10px;
  }
</style>
