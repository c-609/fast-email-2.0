<template>
  <div>
      login
      <button @click="login()">登录</button>
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

<style>

</style>