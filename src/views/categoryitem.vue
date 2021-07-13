<template>
    <el-container style="width:60%;margin-left:20%">
        <el-main style="height: 100%;">
            <div v-for="(item,index) in cartlist" :key="item.goodsId" style="float: left;margin-left: 2%;">
                <router-link :to="'/shopdetail/'+item.goodsId">
                    <el-image
                        style="width: 200px; height: 200px"
                        :src="item.goodsCoverUrl"
                        :fit="fit"></el-image>
                    <br/>
                    <el-button class="button" type="text">
                        {{ item.goodsName }}
                    </el-button>
                </router-link>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
    name: "categoryitem",
    data() {
        return {
            cartlist: [],
            keys: [],
        }
    },
    mounted() {
        // console.log(this.$route.params.id);
        axios.post("http://localhost:8083/goods/categoryGoods", Qs.stringify({category_id: this.$route.params.id}))
            .then(res => {
                this.cartlist = res.data.data;
                console.log(this.cartlist)
            })
    },
}

</script>

<style scoped>

</style>