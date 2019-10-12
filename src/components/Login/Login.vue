<template>
  <div>
    <div class="header">
      <img src="./../../assets/logo.png" />
      <h4>消息快递</h4>
    </div>
    <div class="login-form">
      <div class="login-group">
        <van-field left-icon="user-o" placeholder="请输入用户名" v-model="useraccount"/>
        <van-field left-icon="user-o" type="password" placeholder="请输入密码" v-model="password"/>
      </div>
      <van-button type="danger" class="loginBtn" :loading="isLogin" loading-text="登录中..." @click="login()">登录</van-button>
    </div>
  </div>
</template>

<script>
import {loginObj,getUserInformation} from '../../api/login'
import IDBMethods from '../../api/IndexedDbMethods'
export default {
  data(){
    return{
      user:'',
      isLogin:false,
      useraccount:'test1-update',
      password:'123456'
    }
  },
  methods: {
    login() {
      if(this.useraccount == ''){
        this.$notify({ type: 'warning', message: '请输入账号', duration: 1000 });
      }else if(this.password == ''){
        this.$notify({ type: 'warning', message: '请输入密码', duration: 1000 });
      }else{
        this.isLogin = true;
        loginObj(this.useraccount,this.password).then(res => {
          if(res.data.code == 0){
            let userId = res.data.data.id;
              getUserInformation(userId).then(res => {
                   
                console.log(res);
               
                  let data = res.data.data;
                  let dbName = userId;
                  IDBMethods.putUserInfo(dbName,"UserInfo",data);
                
              })
            localStorage.setItem('useraccount',this.useraccount);
            localStorage.setItem('password',this.password);
            localStorage.setItem('url',"/home");
            localStorage.setItem('userId',res.data.data.id);
            this.$notify({ type: 'success', message: '登录成功', duration: 600 });
            this.isLogin = false;
            this.$router.push("/home");
          }else{
            this.$notify({ type: 'danger', message: '账号或密码错误异常', duration: 600 });
            this.isLogin = false;
          }
        })
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 50px;
  padding-left: 40px;
  padding-top: 130px;
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
  width: 100%;
  margin-top: 30px;
}
</style>>
