
<template >
  <div class="mui-content">

  <form id='login-form' class="mui-input-group">
    <div class="mui-input-row">
      <label>账号</label>
      <input id='account' type="text" class="mui-input-clear mui-input"  v-model="name">
    </div>
    <div class="mui-input-row">
      <label>密码</label>
      <input id='password' type="password" class="mui-input-clear mui-input"  v-model="pwd">
    </div>
  </form>
  <form class="mui-input-group">
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell">
        自动登录
        <div id="autoLogin" class="mui-switch">
          <div class="mui-switch-handle"></div>
        </div>
      </li>
    </ul>
  </form>
  <div class="mui-content-padded">
    <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="login()">登录</button>
    <div class="link-area"><router-link to="/member/reg" id='reg'>注册账号</router-link> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
    </div>
  </div>
  <div class="mui-content-padded oauth-area">

  </div>
  </div>
</template>
<script>
  import  mui from  '../../mui/js/mui.min'
  import {Toast} from "mint-ui";
    export default {
        name: "login",
        data(){
            return{name:"",pwd:""}
        },
        created() {
            mui('.mui-switch')['switch']()
        },methods:{
            login(){
                if (this.name!==""&&this.pwd!==""){
                    localStorage.setItem("name",this.name);
                    localStorage.setItem("name",this.pwd);
                    Toast("登录成功。。。");
                    this.$router.push("/member")
                }else {
                    Toast("没有此账号请您注册。。。");
                }

            }
        }
    }
</script>

<style scoped>
  .area {
    margin: 20px auto 0px auto;
  }

  .mui-input-group {
    margin-top: 10px;
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

  .link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
  }

  .spliter {
    color: #bbb;
    padding: 0px 8px;
  }

  .oauth-area {
    position: absolute;
    bottom: 20px;
    left: 0px;
    text-align: center;
    width: 100%;
    padding: 0px;
    margin: 0px;
  }

  .oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
  }

  .oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
  }

  .oauth-area .oauth-btn.disabled {
    background-color: #ddd;
  }
</style>
