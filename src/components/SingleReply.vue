<template>
<div style="width:100%">
  <div style="position: relative;text-align: left">
    <el-avatar v-if="singleReply.userImg===null||singleReply.userImg==='null'" :size="55" :src="circleUrl"></el-avatar>
    <el-avatar v-else :size="55" :src="singleReply.userImg"></el-avatar>
    <span style="margin-left: 25px;position:absolute;top:0;font-size: 20px;color: #606266">{{singleReply.userName}}</span>
    <span style="margin-left: 25px;color: #909399;font-size: 14px">
    {{singleReply.ftime}}
  </span>
  </div>
  <div style="width: 80%;margin-left: 10%;margin-top: 15px;margin-bottom: 30px;text-align: left">
    {{singleReply.content}}
  </div>
</div>
</template>

<script>
export default {
  name: "SingleReply",
  data(){
    return{
      singleReply:[],
      circleUrl:'https://img1.baidu.com/it/u=3158256235,531399396&fm=26&fmt=auto&gp=0.jpg'
    }
  },
  props:{
    reply:{
      type:Object
    }
  },
  mounted() {
    this.singleReply=this.reply
  }
}
</script>

<style scoped>

</style>