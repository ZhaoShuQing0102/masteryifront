<template>
    <el-container style="width:60%;margin-left:20%">
        <el-header>
            <h1>{{category_title}}</h1>
        </el-header>
        <el-main style="height: 100%;">
            <div v-for="(item,index) in catelist" :key="item.goodsId" style="float: left;margin-left: 2%;">
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
import {post} from "@/utils/Network";

export default {
    name: "categoryitem",
    data() {
        return {
            catelist: [],
            keys: [],
            category_title: ''
        }
    },
    mounted() {
        post("/category/getcategorynamebyid", Qs.stringify({cid: this.$route.params.id}))
            .then(res => {
                this.category_title = res.data.data;
                post("/goods/categoryGoods", Qs.stringify({category_id: this.$route.params.id}))
                    .then(res => {
                        this.catelist = res.data.data;
                    })
            })

    },
}

</script>

<style scoped>

</style>