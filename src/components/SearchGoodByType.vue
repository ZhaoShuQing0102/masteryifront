<template>
  <div>
    <el-input v-model="searchContent" placeholder="请输入搜索内容" style="width: 500px;">
      <template #suffix>
        <el-link class="el-input__icon" href="javascript:void(0)" icon="el-icon-search" @click="search" style="font-size: 25px;margin-right: 6px" type="primary"></el-link>
        <!--      <i class="el-icon-search el-input__icon" @click="search" style="font-size: 20px;margin-right: 6px"> </i>-->
      </template>
    </el-input>
  </div>
</template>

<script>
import {post} from "@/utils/Network";
import QS from "qs";

export default {
  name: "SearchGoodByType",
  data(){
    return{
      searchContent:''
    }
  },
  props:{
    categoryId:{
      type:Number
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
        post("/goods/searchgoodspartly",QS.stringify({searchName:this.searchContent,categoryId:this.categoryId})).then(res=>{
          console.log(res.data.data);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>