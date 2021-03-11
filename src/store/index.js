import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isreload: true,
    loading: false, //控制加载动画
    menuList: JSON.parse(sessionStorage.getItem('menu') || "[]"), //导航菜单
    username: sessionStorage.getItem('username'), //用户名
    includePageNames: ['homepage'], // 保持缓存的页面列表  
    tagList: [{
      title: '首页',
      url: 'homepage',
      param: '',
    }], //打开的标签页 
    tagSelected: '0', // 当前tag标签
  },
  mutations: {
    setMenuList(state, data) {
      state.menuList = data;
      sessionStorage.setItem('menu', JSON.stringify(data));
    },
    setUsername(state, data) {
      state.username = data;
      sessionStorage.setItem('username', data);
    },
    setLoading(state, data) {
      state.loading = data;
      // console.log(data);
    }
  },
  actions: {},
  modules: {}
})