import Vuex from 'vuex';
import Vue from 'vue';
import {
  stat
} from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab: 0, //首页的三个tab

    roles: [], //请求到的发件身份
    role: "", //选择的发件身份
    result: [], //已选择人员
    tree: [], //机构发请求得到的数据
    groups: [], // 群组向本地取到的用户群组
    selectedGroups: [], //已选择群组

  },
  mutations: {
    getTab(state, tab) {
      state.tab = tab;
    },

    setRoles(state, roles) {
      state.roles = roles;
    },

    setRole(state, role) {
      state.role = role;
    },

    setResult(state, result) {
      state.result = result;
    },

    setTree(state, tree) {
      state.tree = tree;
    },

    setGroups(state, groups) {
      state.groups = groups;
    },

    setSelectedGroups(state, selectedGroups) {
      state.selectedGroups = selectedGroups;
    },

  }
})
