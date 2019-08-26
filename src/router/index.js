import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login/Login'
import Home from '@/components/Home/Home'
import Message from '@/components/Message/Message'
import Send from '@/components/Send/Send'
import Mine from '@/components/Mine/Mine'
import NewMsg from '@/components/Home/NewMsg/NewMsg'
Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/login',
      name:'Login',
      component: Login,
      meta:{
        showTabbar:false
      }
    },
    {
      path: '/',
      redirect: function(to) {
        if(localStorage.getItem("login")) {
          return "/home"
        }else{
          return "/login"
        }
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        showTabbar:true
      },
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta:{
        showTabbar:true
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta:{
        showTabbar:true
      }
    },
    {
      path: '/send',
      name: 'Send',
      component: Send,
      meta:{
        showTabbar:true
      }
    },
    {
      path:'/newMsg',
      name:NewMsg,
      component:NewMsg,
      meta:{
        showTabbar:false
      }
    }
  ]
})

