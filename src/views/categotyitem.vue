<template>
  <div class="categotyitem">
    <el-space wrap>
      <el-card class="box-card" style="width: 340px" v-for="(item,index) in cartlist" :key="item.goodsId">
        <div class="card-header">
                <span>
                  <img :src="url[index].src"/>
                </span>
          <br/>
          <el-button class="button" type="text">
                      {{item.goodsName}}
          </el-button>
        </div>
      </el-card>
    </el-space>

  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  name: "categotyitem",
  data() {
    return {
      cartlist: [],
      keys: [],
      url: [
        {src: require('../assets/images/1.jpg')},
        {src: require('../assets/images/2.jpg')},
        {src: require('../assets/images/3.jpg')},
        {src: require('../assets/images/4.jpg')},
        {src: require('../assets/images/5.jpg')},
        {src: require('../assets/images/6.jpg')},
      ],
    }
  },
        mounted(){
      // console.log(this.$route.params.id);
      axios.post("http://localhost:8080/goods/categoryGoods", Qs.stringify({category_id: this.$route.params.id}))
          .then(res => {
            this.cartlist = res.data.data;
            console.log(this.cartlist)
          })
    },
}

</script>

<style scoped>
 .categotyitem {
   position: absolute;
   top: 90%;
   left: 50%;
   transform: translate(-50%, -50%);
 }
</style>