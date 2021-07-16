<template>
    <div id="app">
        <el-container>
            <el-head>
                <div id="nav">
                    <el-affix>
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true"
                                 active-text-color="#42b983">

                          <el-menu-item index="/" >
                                欢迎来到易大师
                            </el-menu-item>


                            <el-menu-item index="/order" >
                                <template #title>
                                    我的订单<i class="el-icon-tickets"/>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/cart">
                                    购物车<i class="el-icon-shopping-cart-1"/>
                            </el-menu-item>
                            <el-menu-item index="/favorite">
                                收藏夹<i class="el-icon-star-on"/>
                            </el-menu-item>
                            <el-menu-item v-if="this.$store.state.notLogin" class="mylogin" index="/Login" style="float:right">
                                <span >登录</span>
                            </el-menu-item>
                            <el-menu-item v-else class="mylogin" index="/Logoff" style="float:right">
                                <span>退出登录</span>
                            </el-menu-item>
                            <el-menu-item index="/about" style="float:right">
                                    个人中心<i class="el-icon-user"/>
                            </el-menu-item>
                        </el-menu>
                    </el-affix>
                </div>
            </el-head>
                <div id="root-view">
                    <router-view/>
                </div>
           <el-footer>
             <orderfooter></orderfooter>
           </el-footer>
        </el-container>
    </div>
</template>

<script>
import Orderfooter from "@/components/orderfooter";
import {post} from "@/utils/Network";

export default {
  name:'App',
  components: {Orderfooter},
  data(){
    return{
      activeIndex:''
    }
  },
    mounted() {
        if(window.localStorage.getItem("token")===null||window.localStorage.getItem("token")===undefined){
            this.$store.state.notLogin=true
        }
        else{
            post("/login/token").then(res=>{
                if(res.data===true) this.$store.state.notLogin=false
                else this.$store.state.notLogin=true
            })
        }
    },
  watch: {
    $route(to, from) {
      this.activeIndex=to.path
    }
  }
}
</script>
<style lang="scss">
@import "assets/css/base.css";
body{
    width: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    //padding: 10px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.el-footer{
  padding: 0!important;
}
//#footer {
//  width: 100%;
//  height: 50px;
////  display: flex;
////  bottom: 0;
//  float: bottom;
////  //div{
////  //  flex:1;
////  //  background-color: lightblue;
////  //  //margin: 1px;
////  //  text-align: center;
////  //  //line-height: 50px;
////  //}
//}
#root-view {
    background-color: #F5F5F5;
    //height: calc(180vh - 50px);
    overflow: auto;
}
</style>
