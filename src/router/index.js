import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue'),
    children: [{
        path: '/home/form',
        name: 'form',
        component: () => import('../views/form/form.vue'),
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
        path: '/home/partLoading',
        name: 'partLoading',
        component: () => import('../views/partLoading/partLoading.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router