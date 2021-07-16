<template>
<div style="width: 100%">
  <div style="margin-top: 10px">
  <el-input v-model="searchContent" placeholder="请输入搜索内容" style="width: 500px;">
    <template #suffix>
      <el-link class="el-input__icon" href="javascript:void(0)" icon="el-icon-search" @click="search" style="font-size: 25px;margin-right: 6px" type="primary"></el-link>
    </template>
  </el-input>
  </div>
  <div style="width: 88%;margin-left: 6%;min-height: 500px;margin-top: 20px">


    <div v-if="hasData" style="width: 100%">
      <div style="width: 100%;text-align: left;margin-bottom: 10px">为您找到以下{{searchList.length}}个商品</div>
    <ul  style="width: 100%;overflow: auto">
      <li v-for="(item,index) in searchList" :key="index" style="width: 18%;height: 350px;margin-bottom: 10px;float: left;
                                                          margin-right: 1%;background-color: white" @click="goShop(item.goodsId)">
        <div style="width: 80%;height: 150px;margin: 30px auto 30px;cursor:pointer;">
          <img v-if="item.goodsCoverUrl==='null'||item.goodsCoverUrl===null" src="../assets/image/iphone.jpg" alt="" style="width: 100%;height: 100%">
          <img v-else :src="item.goodsCoverUrl" alt="" style="width: 100%;height: 100%">
        </div>
        <div style="height: 65px;width: 90%;margin-left: 5%;text-align: center;
                            font-weight: 400;line-height: 30px;cursor:pointer;">
          <h5 style="font-weight: 400;font-size: 18px">{{item.goodsName}}</h5>
          <h5 style="font-weight: 400;font-size: 16px">{{item.goodsInformation}}</h5>
        </div>
        <div style="height: 40px;width: 66%;margin-left: 17%;
                      text-align: left;line-height: 40px;color: #c81623;font-weight: 700;font-size: 1.2em">
          {{'￥' + item.lowPrice}}
        </div>
      </li>
    </ul>
    </div>
    <div v-else style="padding-top: 100px">没有找到相关的内容</div>
  </div>
</div>
</template>

<script>
import {post} from "@/utils/Network";
import QS from "qs";
import SearchAllGoods from "@/components/SearchAllGoods";

export default {
  name: "SearchPage",
  data(){
    return{
      searchList:[],
      hasData:true,
      searchContent:''
    }
  },
  methods:{
    goShop(id){
      this.$router.push({
        path:'/shopdetail/'+id,
        params:{
          id:id
        }
      })
    },
    search(){
      if(this.searchContent===''){
        this.$message({
          type: 'warning',
          message: '请输入内容'
        });
      }
      else {
        post("/goods/searchallgoods",QS.stringify({searchName:this.searchContent})).then(res=>{
          console.log(res.data.data);
          this.searchList=res.data.data;
          this.hasData = this.searchList !== null;
        })
      }
    },
  },
  components: {SearchAllGoods},
  mounted() {
    this.searchList=[]
    if(this.searchList.length===0){
      post("/goods/searchallgoods",QS.stringify({searchName:this.$route.query.content})).then(res=>{
        console.log(res.data.data);
        this.searchList=res.data.data;
        this.hasData = this.searchList !== null;

      })
    }

  }
}
</script>

<style scoped>

</style>