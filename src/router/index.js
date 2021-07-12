import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "about" */ '../views/order.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/cart.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import(/* webpackChunkName: "about" */ '../views/favorite.vue')
  },
  {
    path: '/recommadview',
    name: 'recommadview',
    component: () => import(/* webpackChunkName: "about" */ '../views/recommadview.vue'),
    children:[
      {
        path:'shopdetail/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/shopdetail.vue')
      }
    ]
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "about" */ '../views/activity.vue')
  },
  {
    path: '/footer',
    name: 'footer',
    component: () => import(/* webpackChunkName: "about" */ '../views/footer.vue')
},
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  },
  {
    path: '/categotyitem/:id',
    name: 'categotyitem',
    component: () => import(/* webpackChunkName: "about" */ '../views/categotyitem.vue'),
  },
  {
    path: '/goodsdetail/:id',
    name: 'goodsdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/goodsdetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
