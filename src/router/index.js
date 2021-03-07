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
import notFound from '../views/404/404.vue'
import store from '../store'

const tablesRule={path: '/home/tables',name: 'tables', component: tables}
const formsRule={path: '/home/forms',name: 'forms', component: forms}
const btnLoadingRule={path: '/home/btnLoading',name: 'btnLoading', component: btnLoading}
const allLoadingRule={path: '/home/allLoading',name: 'allLoading', component: allLoading}
const repeatPageRule={path: '/home/repeatPage',name: 'repeatPage', component: repeatPage}
const jurisdictionRule={path: '/home/jurisdiction',name: 'jurisdiction', component: jurisdiction}

const ruleMapping={
  "tables":tablesRule,
  "forms":formsRule,
  "btnLoading":btnLoadingRule,
  "allLoading":allLoadingRule,
  "repeatPage":repeatPageRule,
  "jurisdiction":jurisdictionRule,
}

Vue.use(VueRouter)

const routes = [
  {
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
    children: [
    ]
  },
  {
    path: '*',
    component: notFound
  }
]

export function initDynamicRoutes() {
  //根据二级权限，对路由规则动态的添加
  const currentRouter=router.options.routes  //routes路由数组
   const menuList=store.state.menuList
   menuList.forEach((item)=>{
      if(item.titlePath){
       currentRouter[2].children.push(ruleMapping[item.titlePath]);
      }
    if(item.menuChild){
      item.menuChild.forEach((val)=>{
        currentRouter[2].children.push(ruleMapping[val.titlePath])
      })
    }
   })
    console.log(currentRouter[2].children)
  router.addRoutes(currentRouter);
}

const router = new VueRouter({
  routes
})

export default router