import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './utils/permission.js'
import commonMixin from './mixins/commonMixin'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.mixin(commonMixin)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')