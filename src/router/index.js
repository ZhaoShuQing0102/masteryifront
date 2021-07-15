import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import {post} from "@/utils/Network";


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
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
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
    path: '/categoryitem/:id',
    name: 'categoryitem',
    component: () => import(/* webpackChunkName: "about" */ '../views/categoryitem.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{

  if(to.path==='/order'||to.path==='/favorite'||to.path==='/Cart'||to.path==='/about'){
    if(window.localStorage.getItem("token")===null||window.localStorage.getItem("token")===undefined){
      next({
        path:'/Login'
      })
    }
    else{
      post("/login/token").then(res=>{
        if(res.data===true) next()
        else next({
          path:'/Login'
        })
      })
    }
  }

  next()
})

export default router
