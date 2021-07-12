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
    path: '/shopdetail/:id',
    name: 'shopdetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/shopdetail.vue'),
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "about" */ '../views/activity.vue')
  },
  {
    path: '/categotyitem/:id',
    name: 'categotyitem',
    component: () => import(/* webpackChunkName: "about" */ '../views/categotyitem.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
