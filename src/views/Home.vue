<template>
  <div class="home">
    <div class="search">
      <div class="search_text" style="position: absolute; margin-top: 30px ;margin-left: 600px">
        <el-input  v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="search_img" style="position: absolute; margin-top: 30px ; margin-left: 1000px">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div>
      <div class="category">
        <el-row class="tac" style="position: absolute; margin-top: 120px;margin-left: 280px;">
          <el-col :span="12">
            <h5>商品分类</h5>
            <el-menu
                :uniqueOpened="true"
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff">
              <el-menu-item-group>
                <el-menu-item index="1-1" v-for="item in keys" :key="item" >
                  <router-link :to="'/categotyitem/'+allcart[item][0].categoryId">
                    {{item}}
                  </router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-col>
        </el-row>
        <!--      <categotyitem :id="id"></categotyitem>-->
      </div>
<!--      <router-view> </router-view>-->
      <div class="image" style="position: absolute; margin-top: 110px; margin-left: 550px;">
        <el-carousel :interval="4000" type="card" height="350px" >
          <el-carousel-item v-for="item in url" :key="item">
            <h3 class="medium">
              <img :src="item.src"/>
            </h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <activity> </activity>
    <recommadview> </recommadview>
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent, ref } from 'vue'
import axios from "axios";
import {getHomeAllData} from "../../network/home";
import Recommadview from "@/views/recommadview";
import Activity from "@/views/activity";
import Categotyitem from "@/views/categotyitem";

export default defineComponent({
  name: 'Home',
  components: {Categotyitem, Activity, Recommadview},
  data() {
    return {
      url: [
        {src: require('../assets/images/1.jpg')},
        {src: require('../assets/images/2.jpg')},
        {src: require('../assets/images/3.jpg')},
        {src: require('../assets/images/4.jpg')},
        {src: require('../assets/images/5.jpg')},
        {src: require('../assets/images/6.jpg')},
      ],
      allcart:[

      ],
      keys:[],
    }
  },
  setup() {
    return {
      input: ref('')
    }
  },
  mounted() {
    axios.post("http://localhost:8083/category/getallcategory")
        .then(res=>{
          this.allcart = res.data.data;
          this.keys=Object.keys(this.allcart)
          console.log(this.allcart[this.keys[0]][0].categoryId);
        })
  },
})
</script>
<style>
   .home{
     background: #FFFFFF;
   }
   .search_text {
     width: 400px;
   }
   .tac {
     width: 400px;
   }
   .image {
     width: 850px;
   }
</style>








