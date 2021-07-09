<template>
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
      <el-menu-item index="3" >
        <router-link to="/cart">购物车</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/favorite">收藏夹</router-link>
      </el-menu-item>
      <el-menu-item class="mylogin" index="5">
        <router-link to="/Login">登录</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/about">关于我们</router-link>
      </el-menu-item>
    </el-menu>
      </el-affix>
    <footer></footer>
  </div>
  <router-view/>
</template>

<script>
import Footer from "@/views/footer";
export default {
  components: {Footer}
}

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
</style>
