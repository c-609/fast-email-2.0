// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import  FastClick  from  'fastclick'
import 'lib-flexible/flexible' 
import eventBus from './util/eventBus'
import store from "./store/index";
import "./assets/css/iconfont.css"
FastClick.attach(document.body);
Vue.config.productionTip = false

Vue.use(Vant);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
