<template>
  <div class="recommadview">
    <div class="rbody">
    <el-space wrap>
      <el-card class="box-card" style="width: 340px" v-for="item in goods" :key="item.goodsId">
          <div class="card-header">
                <span>
                  <img src="../assets/images/1.jpg"/>
                </span>
            <br/>
            <el-button class="button" type="text">
              <router-link :to="'/recommadview/shopdetail/'+item.goodsId">
                            {{item.goodsName}}
              </router-link>
            </el-button>
          </div>
      </el-card>
    </el-space>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "recommadview",
  data() {
    return {
      goods: [],
    }
  },
    mounted() {
      axios.get("http://localhost:8080/goods/allGoods")
          .then(res => {
            this.goods = res.data.data;
            console.log(res.data);
          })
  },
}
</script>

<style scoped>
     .recommadview {
       display: flex;
       position: absolute;
       margin-top: 750px;
       margin-left: 330px;
     }
     .rbody {
       flex: 1;
     }
     img {
       width:200px;
       height: 160px;
     }
</style>