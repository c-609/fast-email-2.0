<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>
    <van-tabbar v-model="active" v-show="this.$route.meta.showTabbar" v-if="hidshow" :border="false" active-color="#f25643">
      <van-tabbar-item to="/home"> 
        <van-icon class="iconfont" class-prefix='my-icon' slot="icon" slot-scope="props" :name='props.active ? icon.home_active:icon.home_normal'></van-icon>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/message">
        <van-icon class="iconfont" class-prefix='my-icon' slot="icon" slot-scope="props" :name='props.active ? icon.message_active:icon.message_normal'></van-icon>
        <span>收到</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/send">
        <van-icon class="iconfont" class-prefix='my-icon' slot="icon" slot-scope="props" :name='props.active ? icon.send_active:icon.send_normal'></van-icon>
        <span>发出</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">
        <van-icon class="iconfont" class-prefix='my-icon' slot="icon" slot-scope="props" :name='props.active ? icon.mine_active:icon.mine_normal'></van-icon>
        <span>我</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true,
      icon:{
        home_normal:'home',
        home_active:'home',
        message_normal:'message',
        message_active:'message',
        send_normal:'send',
        send_active:'send',
        mine_normal:'my',
        mine_active:'my',
      },
      transitionName: "slide-right",
      home: {
        normal: "//./assets/4.png",
        active: "//./assets/4.png"
      },
      active: 0
    };
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
      return(()=>{
          this.showHeight = document.documentElement.clientHeight;
      })()
    }
  },
  watch: {
    showHeight() {
      if(this.docmHeight != this.showHeight){
          this.hidshow=false 
      }else{
        this.hidshow = true
      }
    },
    $route(to, from) {
      // console.log(to.meta.index,from.meta.index)
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style >
#app {
    -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
}
.child-view {

  position: absolute;
  width: 100%;
  transition: all 0.2s;
  height: 100%;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50%, 0);
  transform: translate(50%, 0);
}
.slide-right-enter,
.slide-left-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.van-tabbar {
  border-top: 1px solid #d2d2d2;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
}
</style>
