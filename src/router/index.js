import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
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
import repeatPageParams from '../views/repeatPageParams/repeatPageParams.vue'
import homepage from '../views/homepage/homepage.vue'
import querypage from '../views/querypage/querypage.vue'
import dataConfiguration from '../views/dataConfiguration/dataConfiguration.vue'

const tablesRule = {
  path: 'tables',
  name: 'tables',
  component: tables,
  // mate:["view"]
}
const formsRule = {
  path: 'forms',
  name: 'forms',
  component: forms
}
const btnLoadingRule = {
  path: 'btnLoading',
  name: 'btnLoading',
  component: btnLoading
}
const allLoadingRule = {
  path: 'allLoading',
  name: 'allLoading',
  component: allLoading
}
const repeatPageRule = {
  path: 'repeatPage',
  name: 'repeatPage',
  component: repeatPage
}
const jurisdictionRule = {
  path: 'jurisdiction',
  name: 'jurisdiction',
  component: jurisdiction
}
const funAuthorityRule = {
  path: 'funAuthority',
  name: 'funAuthority',
  component: funAuthority,
}
const repeatPageParamsRule = {
  path: 'repeatPageParams',
  name: 'repeatPageParams',
  component: repeatPageParams,
}
const homepageRule = {
  path: 'homepage',
  name: 'homepage',
  component: homepage,
}
const querypageRule = {
  path: 'querypage',
  name: 'querypage',
  component: querypage,
}
const dataConfigurationRule = {
  path: 'dataConfiguration',
  name: 'dataConfiguration',
  component: dataConfiguration,
}


const ruleMapping = {
  "tables": tablesRule,
  "forms": formsRule,
  "btnLoading": btnLoadingRule,
  "allLoading": allLoadingRule,
  "repeatPage": repeatPageRule,
  "jurisdiction": jurisdictionRule,
  "funAuthority": funAuthorityRule,
  "querypage": querypageRule,
  "dataConfiguration": dataConfigurationRule
}

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


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
    redirect: '/home/homepage',
    children: [
      homepageRule,
      repeatPageParamsRule, //重复页
      dataConfigurationRule
    ]
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
    if (item.url) {
      let temp = ruleMapping[item.url];
      temp.meta = item.authorityList;
      currentRoutes[2].children.push(temp);
    }
    if (item.menuChild) {
      item.menuChild.forEach((val) => {
        let tempChild = ruleMapping[val.url];
        tempChild.meta = val.authorityList;
        currentRoutes[2].children.push(tempChild)
      })
    }
  })
  //console.log(currentRoutes[2].children)
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