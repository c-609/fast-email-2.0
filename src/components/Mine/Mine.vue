<template>
  <div>
      Mine
      <hr>
      <button @click="goPath('/view_organization')">查看学校的机构</button>     
      <hr>
      <button @click="goPath('/recycle_bin')">查看回收站</button>   
      <hr>
      <button @click="goPath('/my_group')">查看我创建的群组</button>     
      <hr>
      <button @click="goPath('/joined_group')">查看我加入的群组</button>           
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