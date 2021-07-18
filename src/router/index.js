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
import CommentGood from "@/views/CommentGood";
import profiles from "@/views/profiles";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: shouye,
    meta:{
      title:'易大师购物'
    }
  },
  {
    path: '/profiles',
    name: 'profiles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: profiles,
    meta:{
      title:'个人中心'
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta:{
      title:'登录'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta:{
      title:'我的订单'
    },
    component: () => import('../views/order')
  },
  {
    path:'/Orderdetail/',
    name: 'Orderdetail',
    meta:{
      title:'订单详情'
    },
    component: Orderdetail
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      title:'我的购物车'
    },
    component: cart
  },
  {
    path: '/favorite',
    name: 'favorite',
    meta:{
      title:'收藏夹'
    },
    component: favorite
  },
  {
    path: '/shopdetail/:id',
    name: 'shopdetail',
    meta:{
      title:'商品详情'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/shopdetail.vue'),
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "about" */ '../views/activity.vue')
  },
  {
    path: '/secondskill',
    meta:{
      title:'秒杀活动'
    },
    component: secondskill
  },
  {
    path: '/categoryitem/:id',
    name: 'categoryitem',

    component: () => import(/* webpackChunkName: "about" */ '../views/categoryitem.vue'),
  },
  {
    path: '/categories',
    meta:{
      title:'商品分类'
    },
    component: categories
  },
  {
    path: '/payfororder',
    meta:{
      title:'订单支付'
    },
    component: confirmorder
  },
  {
    path:'/tradesuccess',
    meta:{
      title:'交易成功'
    },
    component: TradeSuccess
  },
  {
    path: '/search',
    meta:{
      title:'搜索'
    },
    component: SearchPage
  },
  {
    path:'/comment',
    meta:{
      title:'评价'
    },
    component: CommentGood
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  if(to.path==='/order'||to.path==='/favorite'||to.path==='/cart'||to.path==='/profiles'
      ||to.path==='/payfororder'||to.path==='/tradesuccess'||to.path==='/secondskill'){
    if(window.localStorage.getItem("token")===null||window.localStorage.getItem("token")===undefined){
      document.title="登录"
      next({
        path:'/login'
      })
    }
    else{
      post("/login/token").then(res=>{
        console.log(res.data);
        if(res.data===true) next()
        else {
          document.title="登录"
          next({
            path: '/login',
            component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
          })
        }
      })
    }
  }
  else next()
})
router.afterEach((to,from,next)=>{
  window.scroll(0,0)
})

export default router
