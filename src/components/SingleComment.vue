<template>
<div style="width: 100%;margin-top: 15px;border-bottom: 2px solid #E4E7ED" >
  <div style="position: relative;text-align: left">
  <el-avatar :size="70" :src="circleUrl"></el-avatar>
  <span style="margin-left: 25px;position:absolute;top:0;font-size: 24px;color: #606266">{{com.userName}}</span>
  <span style="margin-left: 25px;color: #909399;font-size: 16px">
    {{com.ftime}}<span style="margin-left: 80px">购买了 {{getSpec(com.description)}}</span>
  </span>
    <span style="position:absolute;right: 10px">
      <svg class="icon" aria-hidden="true" v-for="item in 5" style="margin-right: 5px">
        <use :xlink:href="getStar(item)"></use>
      </svg>
    </span>
  </div>
  <div style="width: 75%;margin-left: 9%;min-height: 160px;margin-top: 15px;font-size: 16px;color: #303133">
    {{com.content}}
  </div>
  <div id="comfoot" style="width: 100%;text-align: right;margin-bottom: 15px">
    <el-link href="javascript:void(0)" :underline="false" v-if="showReply" @click="showReply=false"><el-tag type="info"><i class="el-icon-caret-top"></i>收起回复</el-tag></el-link>

    <el-link href="javascript:void(0)" :underline="false" v-else @click="showAllReply"><el-tag type="info"><i class="el-icon-chat-dot-square" ></i>查看回复</el-tag></el-link>

  </div>
  <div id="reply" v-if="showReply" style="width: 74%;margin-left: 13%">
    <SingleReply v-for="item in replys" :reply="item"></SingleReply>
  </div>
  <div style="margin-bottom: 15px;margin-left: 9%">
  <el-input style="width: 250px;margin-right: 20px" placeholder="立即回复" v-model="newComm"></el-input>
  <el-button type="primary" @click="newComment" round>回复</el-button>
  </div>
</div>
</template>

<script>
// import {post} from "@/utils/Network";
import QS from "qs";
import SingleReply from "@/components/SingleReply";
import axios from "axios";
export default {
  name: "SingleComment",
  components: {SingleReply},
  data(){
    return{
      circleUrl:"https://img2.baidu.com/it/u=3549669134,2443043260&fm=26&fmt=auto&gp=0.jpg",
      com:[],
      showReply:false,
      replys:[],
      newComm:''
    }
  },
  methods:{
    getSpec(val){
      if(val!==undefined) {
        let res = ''
        for (let i in Object.keys(val)) {
          if (i !== Object.keys(val).length - 1 + '')
            res = res + val[Object.keys(val)[i]] + "，"
          else res = res + val[Object.keys(val)[i]]
        }
        return res
      }
    },
    getStar(item){
      if(item<=this.com.stars) return "#icon-stars"
      else return "#icon-stars1"
    },
    showAllReply(){
      console.log(this.com);
      this.showReply=true
      axios.post("http://localhost:8083/comment/replysbycomid",QS.stringify({comId:this.com.commentId})).then(res=>{
        this.replys=res.data.data
      })
    },
    newComment(){
      if(this.newComm===''){
        console.log(this.com);
        this.$message({
          type: 'warning',
          message: '请输入内容'
        });
      }
      else {
        axios.post('http://localhost:8083/comment/addreply',QS.stringify({goodId:this.com.toGoodId,userId:1,content:this.newComm,toComId:this.com.commentId})).then(res=>{
          if(res.data.code===200){
              axios.post("http://localhost:8083/comment/replysbycomid",QS.stringify({comId:this.com.commentId})).then(res=>{
              this.replys=res.data.data
              this.$message({
                type: 'success',
                message: '评论成功'
              });
              this.newComm='';
              this.showReply=true
            })

          }
        })
      }
    }
  },
  props:{
    comment:{
      type:Object
    }
  },
  mounted() {
    this.com=this.comment
  }
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 25px;
}
</style>