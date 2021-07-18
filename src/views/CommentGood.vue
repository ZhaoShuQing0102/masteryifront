<template>
<div style="width: 70%;margin-left: 15%;height: 100%;text-align: left;padding-top: 20px;background-color: white;margin-bottom: 30px;padding-bottom: 30px">
  <div style="position: relative;padding-bottom: 15px;border-bottom: 2px solid #E4E7ED;padding-left: 20px">
    <img src="../assets/huawei.jpg" alt="" style="width: 80px;height: 80px">
    <b style="position: absolute;top: 0;margin-left: 50px;font-size: 26px;color: RGB(245,158,44)">{{good.goodsName}}</b>
    <span style="margin-left: 50px;font-size: 16px">{{specs}}</span>
  </div>
  <div style="margin-top: 20px;padding-left: 20px">
    <span style="float: left;font-size: 21px;margin-top: 8px;margin-right: 15px">宝贝描述是否相符</span>
    <el-rate v-model="stars" style="float:left;font-size: 21px"></el-rate>
  </div>
  <div style="margin-top: 20px;height: 50px"></div>
  <div style="margin-top: 15px;font-size: 20px!important;">
    <el-input
        type="textarea"
        placeholder="添加评价"
        v-model="textarea"
        maxlength="80"
        show-word-limit
        :rows="10"
        resize="none"
    >
    </el-input>
  </div>
  <div style="width: 100%;text-align: center;margin-top: 100px" @click="publish"><el-button type="primary">发表评论</el-button></div>
</div>
</template>

<script>
import {post} from "@/utils/Network";
import QS from "qs"
export default {
  name: "CommentGood",
  // props:{
  //   specId:{
  //     type:Number
  //   },
  //   goodId:{
  //     type:Number
  //   },
  //   orderId:{
  //     type:Number
  //   }
  // },
  data(){
    return{
      specs:[],
      good:[],
      stars:'',
      textarea:'',
      goodId:'',
      specId:'',
      orderId:''
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
    publish(){
      if(this.textarea===''){
        this.$message({
          type: 'warning',
          message: '请输入内容'
        });
      }
      else if(this.stars===''){
        this.$message({
          type: 'warning',
          message: '请评价'
        });
      }
      else {
        post("/comment/addcomment",QS.stringify({goodId:this.goodId,content:this.textarea,stars:this.stars,orderId:this.orderId})).then(res=>{
          this.$message({
            type: 'success',
            message: '评价成功!'
          });
          setTimeout(()=>{
            this.$router.push({
              path:'/shopdetail/'+this.goodId,
              params:{
                id:this.goodId
              }
            })
          },800)
          //跳转
        })
      }
    }
  },
  mounted() {
    this.goodId=this.$route.query.goodId
    this.specId=this.$route.query.id
    this.orderId=this.$route.query.orderId
    if(this.goodId!==undefined){
      post("/goods/goodById",QS.stringify({good_id:this.goodId})).then(res=>{
        this.good=res.data.data
        post("/goods/detailMsg",QS.stringify({id:this.specId})).then(r=>{
          this.specs=this.getSpec(r.data.data)
        })
      })
    }
  }
}
</script>

<style>


.el-rate__icon{
  font-size: 40px!important;
}

.el-textarea__inner{
  border: none!important;
}
.el-textarea{
  font-size: 18px!important;
}
</style>