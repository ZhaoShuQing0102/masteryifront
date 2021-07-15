<template>
<div style="width: 100%;height: 500px">
  <div id="commentContain" style="height: 400px;width: 90%;margin-left: 5%">
    <SingleComment v-for="item in allComs" :comment="item"></SingleComment>
    <br>
  </div>
</div>
</template>

<script>
// import {post} from "@/utils/Network";
import QS from "qs"
import SingleComment from "@/components/SingleComment";
import axios from "axios";
import {post} from "@/utils/Network";
export default {
  name: "Comment",
  components: {SingleComment},
  props:{
    goodId:{
      type:Number
    }
  },
  data(){
    return{
      allComs:[]
    }
  },
  mounted() {
    post("/comment/comsbygoodid",QS.stringify({goodId:this.goodId})).then(res=>{
      this.allComs=res.data.data
    })

  }
}
</script>

<style scoped>

</style>