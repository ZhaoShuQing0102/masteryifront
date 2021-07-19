<template>
  <div class="collect" >

    <div class="collect-nav" style="height:100px;border-bottom: 1px solid #FFFFFF;">
      <div class="yifont" style="float: left;margin-left: 6%;margin-top: 1%">
        <img src="../assets/images/back.png" style="height: 100px; width: 140px;">
      </div>
      <div class="nav-serach" style="margin-top:2%;margin-left: 15%;float: left;">
            <SearchAllGoods></SearchAllGoods>
      </div>
    </div>
    <div class="collect-body" style="float: left;margin-left: 6%;width: 88%;background-color: white;min-height: 500px">
      <div class="mycollect" style="width:100%;height:45px;background-color:#F59A23">
          <h3 style="float: left;margin-left: 2%;margin-top: 1%">我的收藏</h3>
      </div>
      <ul style="margin-left: 60px;margin-top: 30px;overflow: auto;">
        <li v-for="(item,index) in collect_list" :key="index"
            style="width: 150px;height: 220px;
            margin-right: 55px;margin-bottom: 14px;float: left;position: relative;cursor: pointer">
          <div class="delete-icon" style="position: relative;margin-left: 145px;
                                              width: 10px;height: 10px;">
            <el-button  type="danger" size="mini" icon="el-icon-delete" circle @click="deleteit(item)"></el-button>
          </div>
          <div class="goods-info" style="width: 150px;height: 170px;" @click="$router.push({path:'/shopdetail/'+item.goodsId})">
            <div class="goods-img" >
              <img v-if="item.goodsCoverUrl==='null'||item.goodsCoverUrl===null" :src="defaultUrl" alt="" style="height: 150px;width: 150px">
              <img v-else :src="item.goodsCoverUrl" alt="" style="height: 150px;width: 150px">
            </div>
            <div class="goods-name" style="height: 25px;width: 150px;
                                    margin-top: 5px;line-height: 25px;text-align: center">
                <h5 style="color:RGB(64,158,255);font-size:20px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden">{{ item.goodsName }}</h5>

            </div>
            <div class="goods-price" style="width: 150px;height: 22px;text-align: center;line-height: 22px;font-size: 20px;margin-top: 10px">
              {{'￥' + item.price}}
            </div>
          </div>

        </li>
      </ul>
    </div>



    <div class="collect-footer" style="float:left;width: 100%;">
        <div class="collect-footer-heads" style="margin-top: 2%;margin-left: 6%;margin-right: 6%;">
          <el-divider style="font-size: 20px">猜你喜欢</el-divider>
        </div>
      <div style="margin-left:6%; width:88%">
        <div class="recommadview">
          <div v-for="(item,index) in recommend" :key="item.goodsId" style="float: left;margin-left: 4%;">
            <router-link :to="'/shopdetail/'+item.goodsId">
              <el-image v-if="item.goodsCoverUrl==='null'||item.goodsCoverUrl===null"
                  style="width: 200px; height: 200px"
                  :src="defaultUrl"
                  :fit="fit"></el-image>
              <el-image v-else
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
import {get, post} from '@/utils/Network'
import QS from "qs"
import * as math from "mathjs";
import SearchAllGoods from "@/components/SearchAllGoods";

export default {
  name: "favorite",
  components: {SearchAllGoods},
  data(){
    return{
      userId:'',
      showdel:false,
      collect_list:[],
      recommend:[],
      recommend_list:[

      ],
      defaultUrl:'http://qw7r9ly4i.hb-bkt.clouddn.com/huawei.jpg'
    }
  },
  mounted() {
      this.initdata()
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
    deleteit(item){
        post('/collect/deletefromcollect',QS.stringify({collectId:item.collectId}))
      .then(res => {
        this.$message({
          type:"success",
          message:'删除成功'
        })
        this.initdata()
      })
    },
    initdata(){
      post('/collect/showmycollect',QS.stringify({}))
          .then(res1 => {
            // console.log(res.data.data)
            this.collect_list = res1.data.data;
            get('/goods/allGoods')
                .then( res => {
                  this.recommend = res.data.data;
                })
            console.log(this.collect_list)
            console.log(this.recommend_list)
          });
    }
  }
}
</script>

<style >
ol ul {
  list-style: none;
}
a:hover {
  color: #f40!important;
}
ul,ol {
  list-style:none
}
.el-divider__text{
  font-size: 18px!important;
}
</style>