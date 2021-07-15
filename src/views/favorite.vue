<template>
  <div class="collect">

    <div class="collect-nav" style="height:100px;border-bottom: 1px solid #FFFFFF;">
      <div class="yifont" style="float: left;margin-left: 25%;margin-top: 1%">
        <img src="../assets/images/back.png" style="height: 70px; width: 140px;">
      </div>
      <div class="nav-serach" style="margin-top:2%;margin-left: 5%;float: left;">
            <SearchAllGoods></SearchAllGoods>
      </div>
    </div>
    <div class="collect-body" style="float: left;margin-left: 15%;width: 70%;">
      <div class="mycollect" style="width:100%;height:45px;background-color:#F59A23">
          <h3 style="float: left;margin-left: 2%;margin-top: 1%">我的收藏</h3>
      </div>
      <ul style="margin-left: 60px;margin-top: 30px;overflow: auto">
        <li v-for="(item,index) in collect_list" :key="index"
            style="width: 150px;height: 220px;
            margin-right: 25px;margin-bottom: 14px;float: left;position: relative">
          <div class="delete-icon" style="position: relative;margin-left: 145px;
                                              width: 10px;height: 10px;">
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteit(item)"></el-button>
          </div>
          <div class="goods-info" style="width: 150px;height: 170px;">
            <div class="goods-img" style="height: 150px;width: 150px">
              <img src="../assets/images/1.jpg" alt="" width="150px" height="150px">
            </div>
            <div class="goods-name" style="height: 15px;width: 150px;
                                    margin-top: 5px;line-height: 15px;text-align: center">
              {<el-button class="button" type="text">
              {{ item.goodsName }}
            </el-button>
            </div>
          </div>
          <div class="goods-price" style="width: 150px;height: 22px;text-align: center;line-height: 22px">
              {{'￥' + item.price}}
          </div>
        </li>
      </ul>
    </div>



    <div class="collect-footer" style="float:left;margin-left: 15%;width: 70%;">
        <div class="collect-footer-heads" style="margin-top: 10%;margin-left: 15%;margin-right: 15%">
          <el-divider>猜你喜欢</el-divider>
        </div>
      <div style="margin-left:10%; width:80%">
        <div class="recommadview">
          <div v-for="(item,index) in recommend" :key="item.goodsId" style="float: left;margin-left: 2%;">
            <router-link :to="'/shopdetail/'+item.goodsId">
              <el-image
                  style="width: 200px; height: 200px"
                  :src="item.goodsCoverUrl"
                  :fit="fit"></el-image>
              <br/>

            </router-link><el-button class="button" type="text">
            {{ item.goodsName }}
          </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {post} from '../utils/Network'
import QS from "qs"
import * as math from "mathjs";
import SearchAllGoods from "@/components/SearchAllGoods";
import axios from "axios";
import {ref} from "vue";
export default {
  name: "favorite",
  components: {SearchAllGoods},
  data(){
    return{
      userId:1,
      collect_list:[],
      recommend:[],
      recommend_list:[
        {
          id:1,
          imgsrc:"../assets/images/1.jpg"
        },
        {
          id:2,
          imgsrc:"../assets/images/2.jpg"
        },
        {
          id:3,
          imgsrc:"../assets/images/3.jpg"
        },
        {
          id:4,
          imgsrc:"../assets/images/4.jpg"
        },
        {
          id:5,
          imgsrc:"../assets/images/5.jpg"
        },
        {
          id:6,
          imgsrc:"../assets/images/6.jpg"
        },
        {
          id:7,
          imgsrc:"../assets/images/1.jpg"
        },
        {
          id:8,
          imgsrc:"../assets/images/2.jpg"
        },
        {
          id:9,
          imgsrc:"../assets/images/3.jpg"
        },
        {
          id:10,
          imgsrc:"../assets/images/4.jpg"
        },
      ]
    }
  },
  mounted() {
    this.getcollect(this.userId)
    axios.get('http://localhost:8083/goods/allGoods')
        .then( res => {
          this.recommend = res.data.data;
        })
  },
  computed:{
    randomvolume(){
      let rannum = math.round(math.random()*(500-100)+100)
      // console.log(rannum)
      return rannum
    },
    randomprice(){
      let rannum = math.round(math.random()*(500-100)+100)
      // console.log(rannum)
      return rannum
    }
  },
  methods:{
    getcollect(userId){
      post('/collect/showmycollect',QS.stringify({userId:userId}))
      .then(res => {
        // console.log(res.data.data)
        let list_temp = res.data.data
        this.collect_list = list_temp
        console.log(this.collect_list)
        console.log(this.recommend_list)
      })
    },
    deleteit(item){
        post('/collect/deletefromcollect',QS.stringify({collectId:item.collectId}))
      .then(res => {
        console.log(this.collect_list)
        // router.go(0)
      })
    }
  }
}
</script>

<style scoped>
ol ul {
  list-style: none;
}
a:hover {
  color: #f40!important;
}
</style>