<template>
  <div id="message">
      Message
      <hr>
      <hr>
      <button @click="goPath('/received_msg')">查看接收到的通知</button>
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

<style>


</style>