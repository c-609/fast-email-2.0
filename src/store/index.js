import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab: 0, //首页的三个tab
    SendingNum:'',
  },
  mutations: {
    getTab(state, tab) {
      state.tab = tab;
    },
    setSendingNum(state,Sendingnum) {
      state.SendingNum = Sendingnum;
      console.log(Sendingnum)
    }
  }
})
