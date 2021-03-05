import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false, //控制加载动画
    editableTabsValue: '1', //tabs默认选中
    editableTabs: [ //tabs标签数组
      {
        title: '表单页面',
        index: '1',
        path: '/home/forms',
        closable: false
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {}
})