import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import forms from '../views/forms/forms.vue'
import tables from '../views/tables/tables.vue'
import btnLoading from '../views/btnLoading/btnLoading.vue'
import allLoading from '../views/allLoading/allLoading.vue'
import repeatPage from '../views/repeatPage/repeatPage.vue'
import jurisdiction from '../views/jurisdiction/jurisdiction.vue'
import notFound from '../views/notFound/notFound.vue'
import funAuthority from '../views/funAuthority/funAuthority.vue'
import store from '../store'

const tablesRule = {
  path: '/home/tables',
  name: 'tables',
  component: tables
}
const formsRule = {
  path: '/home/forms',
  name: 'forms',
  component: forms
}
const btnLoadingRule = {
  path: '/home/btnLoading',
  name: 'btnLoading',
  component: btnLoading
}
const allLoadingRule = {
  path: '/home/allLoading',
  name: 'allLoading',
  component: allLoading
}
const repeatPageRule = {
  path: '/home/repeatPage',
  name: 'repeatPage',
  component: repeatPage
}
const jurisdictionRule = {
  path: '/home/jurisdiction',
  name: 'jurisdiction',
  component: jurisdiction
}
const funAuthorityRule = {
  path: '/home/funAuthority',
  name: 'funAuthority',
  component: funAuthority,
}


const ruleMapping = {
  "tables": tablesRule,
  "forms": formsRule,
  "btnLoading": btnLoadingRule,
  "allLoading": allLoadingRule,
  "repeatPage": repeatPageRule,
  "jurisdiction": jurisdictionRule,
  "funAuthority": funAuthorityRule
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login', //重定向
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: '/home/forms',
    children: [{
      path: '/home/forms',
      name: 'forms',
      component: forms
    }]
  },
  {
    path: '*',
    component: notFound
  }
]


export function initDynamicRoutes() {
  //   //根据二级权限，对路由规则动态的添加
  const currentRoutes = router.options.routes //routes路由数组
  const menuList = store.state.menuList
  menuList.forEach((item) => {
    if (item.titlePath) {
      let temp = ruleMapping[item.titlePath];
      temp.meta = item.authorityList;
      currentRoutes[2].children.push(temp);
    }
    if (item.menuChild) {
      item.menuChild.forEach((val) => {
        let tempChild = ruleMapping[val.titlePath];
        tempChild.meta = val.authorityList;
        currentRoutes[2].children.push(tempChild)
      })
    }
  })
  router.addRoutes(currentRoutes);
}

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to, from, next) => {
  //next() 是否放行  to去哪里 from哪里来
  if (to.path == "/login") {
    next()
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})


export default router