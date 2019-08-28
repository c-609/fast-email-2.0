<template>
  <div>
      <div class="header">
          <img src="./../../assets/logo.png">
          <h4>消息快递</h4>
      </div>
      <div class="login-form">
        <div class="login-group">
            <van-field left-icon="user-o" placeholder="请输入用户名" />
            <van-field left-icon="user-o" type="password" placeholder="请输入密码" />
        </div>
        <van-button type="danger" class="loginBtn" >登录</van-button>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        login(){
            localStorage.setItem("login",true);
            console.log(localStorage.getItem("login"));
            this.$router.push("/home")
        }
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.header {
    height: 50px;
    padding-left:40px;
    padding-top:130px;
}
.header img {
    width: 50px;
    float: left;
}
.header h4 {
    line-height: 50px;
    font-size: 22px;
    display: inline-block;
    font-weight: 500;
    margin-left: 5px;
}
.login-form {
    width: 240px;
    margin: 30px auto;
}
.van-cell:not(:last-child)::after {
    border-bottom: 0;
}
.van-cell {
    line-height: 44px;
    border-bottom: 1px solid #ebedf0;
    font-size: 16px;
}
.loginBtn {
    width:100%;
    margin-top: 30px;
}

</style>>
