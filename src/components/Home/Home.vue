<template>
  <div class="home">
      Home
      <hr>
      <button @click="goPath('/received_msg')">查看接收到的通知</button>
      <hr>
      <button @click="goPath('/sent_msg')">查看已发出的通知</button>
      <hr>
      <button @click="goPath('/invite_msg')">查看接收到的邀请</button>
  </div>
</template>

<script>
export default {
    methods:{
        goPath(url){
            this.$router.push(url)
        }
    }
}
</script>

<style scoped>

</style>>

