<template>
    <div id="app">
        <el-container>
            <el-head>
                <div id="nav">
                    <el-affix>
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">
                                <router-link to="/">欢迎来到易大师</router-link>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <template #title>
                                    <router-link to="/order">我的订单</router-link>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <router-link to="/cart">
                                    购物车<i class="el-icon-shopping-cart-1"/></router-link>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <router-link to="/favorite">收藏夹</router-link>
                            </el-menu-item>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item/>
                            <el-menu-item class="mylogin" index="5">
                                <router-link to="/Login">登录</router-link>
                            </el-menu-item>
                            <el-menu-item index="6">
                                <router-link to="/about">
                                    <!--          <i class="el-icon-user-solid"/>-->
                                    关于我们
                                </router-link>
                            </el-menu-item>
                        </el-menu>
                    </el-affix>
                </div>
            </el-head>
            <el-main>
                <div id="root-view">
                    <router-view/>
                </div>
            </el-main>
           <el-footer>
               <div id="footer">
                   <el-affix>
                       <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                           <el-menu-item index="1">
                               联系客服
                           </el-menu-item>
                           <el-menu-item index="2">
                               电话：0000000000
                           </el-menu-item>
                           <el-menu-item index="3">
                               其他
                           </el-menu-item>
                           <el-menu-item index="4">
                               <router-link to="/about">关于我们</router-link>
                           </el-menu-item>
                       </el-menu>
                   </el-affix>
               </div>
           </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
@import "assets/css/base.css";

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
    overflow: scroll;
}
</style>
