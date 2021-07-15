<template>
  <div>
    <li v-for="item in links" :key="item.goodsId">
      {{item.goodsName}}
    </li>
  </div>
</template>

<script>
import axios from "axios";
import {get} from "@/utils/Network";

export default {
  name: "myorder",
  data() {
    return {
      links:[],
    }
  },
  mounted() {
    get("/goods/allGoods")
        .then(res=>{
          this.links = res.data.data;
          console.log(res.data);
        })
  },
}
</script>

<style scoped>

</style>