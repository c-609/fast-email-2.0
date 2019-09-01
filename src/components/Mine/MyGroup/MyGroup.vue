<template>
  <div class="myGroup">
     <div class="header">
         <van-nav-bar title="我的群组"  left-arrow @click-left="onClickLeft" fixed>
            <van-icon name="plus" slot="right" color="#191f25" size="18" @click="createGroup()"/>
        </van-nav-bar>
     </div>
     <div class="search">
         <van-search placeholder="请输入搜索关键词" v-model="value" />
     </div>
     <div class="group">
        <van-cell-group>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
            <van-cell title="查寝群" value="12/15" label="2019-08-08 16:15:33" @click="view_myGroup()"/>
        </van-cell-group>
     </div>
  </div>
</template>

<script>
export default {
    methods:{
        goPath(url){
            this.$router.push(url)
        },
        onClickLeft(){
            this.$router.push("/mine")
        },
        view_myGroup(){
            this.$router.push("/view_my_group")
        },
        createGroup(){
            this.$router.push("/create_group")
        }
    }
}
</script>

<style scoped>
.myGroup {
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
.search {
    height: 54px;
    width: 100%;
    z-index: 999;
    position: fixed;
    margin-top: 44px;
    border-bottom: 1px solid #efefef;
    box-shadow: 0px 1px 1px rgba(50, 50, 50, 0.1)
}
.van-nav-bar .van-icon {
    color: #191f25;
}
.van-nav-bar__arrow {
    font-size: 18px;
}
.group {
    margin-top: 106px; 
}
</style>>

