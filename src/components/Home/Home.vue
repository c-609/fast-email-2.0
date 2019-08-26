<template>
  <div>
      Home
      <hr>
      <button @click="goPath()">确定</button>
  </div>
</template>

<script>
export default {
    methods:{
        goPath(){
            this.$router.push("/newMsg")
        }
    }
}
</script>

<style>

</style>