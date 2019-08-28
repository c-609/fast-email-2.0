<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
    <van-tabbar v-model="active" v-show="this.$route.meta.showTabbar">
      <van-tabbar-item icon="search"  to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/message">收到</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/send">发出</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName: 'slide-right',
      home: {
        normal: '//./assets/4.png',
        active: '//./assets/4.png'
      }
    }
  },

watch: {
    $route(to, from) {
        // console.log(to.meta.index,from.meta.index)
        if (to.meta.index > from.meta.index) {
            this.transitionName = "slide-left";
        } else {
            this.transitionName = "slide-right";
        }
    }
},

}

</script>

<style >

.child-view {
    position: absolute;
    width: 100%;
    transition: all 0.2s ;
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50%, 0);
    transform: translate(50%, 0);
}
.slide-right-enter,.slide-left-leave-active{
    opacity: 0; 
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
}

</style>
