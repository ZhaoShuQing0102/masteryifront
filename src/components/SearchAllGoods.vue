<template>
<div >
  <el-input v-model="searchContent" placeholder="请输入搜索内容" style="width: 500px;">
    <template #suffix>
      <el-link class="el-input__icon" href="javascript:void(0)" icon="el-icon-search" @click="search" style="font-size: 25px;margin-right: 6px" type="primary"></el-link>
    </template>
  </el-input>
<!--  <el-button icon="el-icon-search" type="primary" @click="search">搜索</el-button>-->
</div>
</template>

<script>
import {post} from "@/utils/Network";
import QS from "qs"
export default {
  name: "SearchAllGoods",
  data(){
    return{
      searchContent:''
    }
  },
  methods:{
    search(){
      if(this.searchContent===''){
        this.$message({
          type: 'warning',
          message: '请输入内容'
        });
      }
      else {

        this.$router.push({path:'/search',query:{
          content:this.searchContent
          }})

      }
    },

  }
}
</script>

<style >
.el-input__inner{
  border-radius: 16px!important;
}
</style>