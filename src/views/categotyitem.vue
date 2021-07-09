<template>
  <div class="categotyitem">
<!--    <el-space wrap>-->
<!--      <el-card class="box-card" style="width: 340px" v-for="item in goods" :key="item.goodsId">-->
<!--        <div class="card-header">-->
<!--                <span>-->
<!--                  <img src="../assets/images/1.jpg"/>-->
<!--                </span>-->
<!--          <br/>-->
<!--          <el-button class="button" type="text">-->
<!--            <router-link :to="'/recommadview/shopdetail/'+item.goodsId">-->
<!--              {{item.goodsName}}-->
<!--            </router-link>-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </el-space>-->
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  name: "categotyitem",
  data() {
    return {
     cartlist:[

     ],
    }
  },
  mounted() {
    // console.log(this.$route.params.id);
    axios.post( "http://localhost:8080/goods/categoryGoods",Qs.stringify({category_id:this.$route.params.id}))
        .then(res=>{
          this.cartlist = res.data;
          console.log(res.data)
        })
  },
}

</script>

<style scoped>
 .categotyitem {
   position: absolute;
   margin-top: 50px;
 }
</style>