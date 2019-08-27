<template>
  <div>
      查看我创建的群组
      <hr>
      <button @click="goPath('/create_group')">创建一个新的群组</button>
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