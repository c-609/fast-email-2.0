<template>
  <div class="joinedGroup">
    <div class="header">
         <van-nav-bar title="查看群组"  left-arrow @click-left="onClickLeft" fixed></van-nav-bar>
     </div>
     <div class="search">
         <van-search placeholder="请输入搜索关键词" v-model="value" />
     </div>
     <div class="groups">
       <van-cell-group>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
            <van-cell title="查寝群" value="2019-08-08 16:15:33" label="张三" @click="view_joinedGroup()"/>
        </van-cell-group>
     </div>
  </div>
</template>

<script>
export default {
  methods:{
    onClickLeft(){
      this.$router.push("/mine")
    },
    view_joinedGroup(){
      this.$router.push("/view_joined_group")
    }
  }
}
</script>

<style scoped>
.joinedGroup {
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
}
.van-nav-bar {
    background-color: #f6f6f6;
}
.header {
    border-bottom: 1px solid #d2d2d2;
}
.van-nav-bar .van-icon {
    color: #191f25;
}
.van-nav-bar__arrow {
    font-size: 18px;
}
.search {
    height: 54px;
    width: 100%;
    z-index: 999;
    position: fixed;
    margin-top: 44px;
    border-bottom: 1px solid #efefef;
    box-shadow: 0px 1px 1px rgba(50, 50, 50, 0.1)
}
.groups {
  margin-top: 106px;
}
</style>