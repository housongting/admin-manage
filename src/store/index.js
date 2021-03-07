import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false, //控制加载动画
    menuList:JSON.parse(sessionStorage.getItem('menu')),
    username:sessionStorage.getItem('username'),
  },
  mutations: {
    setMenuList(state,data){
      state.menuList=data;
      sessionStorage.setItem('menu',JSON.stringify(state.menuList));
    },
    setUsername(state,data){
      state.username=data;
      sessionStorage.setItem('username',JSON.stringify(state.username));
    }
  },
  actions: {},
  modules: {}
})