import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    //name: 'login',
    redirect: '/login', //重定向
    //component: () => import('../views/login/login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/home',
    // name: 'home',
    redirect: '/home/forms',
    component: () => import('../views/home/home.vue'),
    children: [{
        path: '/home/forms',
        name: 'forms',
        component: () => import('../views/forms/forms.vue'),
      },
      {
        path: '/home/tables',
        name: 'tables',
        component: () => import('../views/tables/tables.vue'),
      },
      {
        path: '/home/btnLoading',
        name: 'btnLoading',
        component: () => import('../views/btnLoading/btnLoading.vue'),
      },
      {
        path: '/home/allLoading',
        name: 'allLoading',
        component: () => import('../views/allLoading/allLoading.vue'),
      },
      {
        path: '/home/repeatPage',
        name: 'repeatPage',
        component: () => import('../views/repeatPage/repeatPage.vue'),
      },
      {
        path: '/home/jurisdiction',
        name: 'jurisdiction',
        component: () => import('../views/jurisdiction/jurisdiction.vue'),
      }
    ]
  },
  {
    path: '*',
    component: () => import('../views/404/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router