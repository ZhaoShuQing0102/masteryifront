import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import {post} from "@/utils/Network";
import cart from "@/views/cart";
import favorite from "@/views/favorite";
import Orderdetail from "@/views/Orderdetail";
import shouye from "@/views/shouye";
import secondskill from "@/views/secondskill";
import categories from "@/views/categories";
import confirmorder from "@/views/confirmorder";
import TradeSuccess from "@/views/TradeSuccess";
import SearchPage from "@/views/SearchPage";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: shouye,
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
    component: () => import('../views/order')
  },
  {
    path:'/Orderdetail/',
    name: 'Orderdetail',
    component: Orderdetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: cart
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: favorite
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
    path: '/secondskill',
    component: secondskill
  },
  {
    path: '/categoryitem/:id',
    name: 'categoryitem',
    component: () => import(/* webpackChunkName: "about" */ '../views/categoryitem.vue'),
  },
  {
    path: '/categories',
    component: categories
  },
  {
    path: '/payfororder',
    component: confirmorder
  },
  {
    path:'/tradesuccess',
    component: TradeSuccess
  },
  {
    path: '/search',
    component: SearchPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{

  if(to.path==='/order'||to.path==='/favorite'||to.path==='/cart'||to.path==='/about'
      ||to.path==='/payfororder'||to.path==='/tradesuccess'||to.path==='/secondskill'){
    if(window.localStorage.getItem("token")===null||window.localStorage.getItem("token")===undefined){
      next({
        path:'/login'
      })
    }
    else{
      post("/login/token").then(res=>{
        console.log(res.data);
        if(res.data===true) next()
        else next({
          path:'/login',
          component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
        })
      })
    }
  }
  else next()
})
router.afterEach((to,from,next)=>{
  window.scroll(0,0)
})

export default router
