<template>
     <div class="shopdetail">
<!--       <el-row>-->
<!--         <el-button icon="el-icon-arrow-left" circle></el-button>-->
<!--       </el-row>-->
     </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import {onMounted} from "vue";

export default {
  name: "shopdetail",
  shoplist:[

  ],
  id:'',
  mounted() {
    // console.log(this.$route.params.id);
    this.id=this.$route.params.id;
    axios.post("http://localhost:8080/goods/goodById", Qs.stringify({good_id: this.id}))
        .then(res => {
          this.shoplist = res.data.data;
          console.log(this.shoplist)
        })
  },
}
</script>

<style scoped>

</style>