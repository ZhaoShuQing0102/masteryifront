<template>
    <div class="home">
        <el-container>
            <el-header>
                <div class="collect-nav" style="height:100px;border-bottom: 1px solid #FFFFFF;">
                    <div class="yifont" style="float: left;margin-left: 25%;margin-top: 1%">
                        <img src="../assets/images/back.png" style="height: 70px; width: 140px;">
                    </div>
                    <div class="nav-serach" style="margin-top:2%;margin-left: 5%;float: left;">
                        <SearchAllGoods></SearchAllGoods>
                    </div>
                </div>
            </el-header>
            <div style="width: 100%">
                <div class="category" style="float: left;width:10%;margin-top: 5%;margin-left: 20%">
                    <h3>商品分类</h3>
                    <el-menu
                        :uniqueOpened="true"
                        default-active="2"
                        class="el-menu-vertical-demo"
                        background-color="#fff"
                        text-color="#303133">
                        <el-menu-item-group>
                            <router-link v-for="item in keys" :to="'/categoryitem/'+allcart[item][0].parentCategoryId">
                                <el-menu-item index="1-1" :key="item">
                                    {{ item }}
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-menu>
                </div>
                <div class="image" style="margin-top: 3%;width:70%;float:left">
                    <el-carousel :interval="4000" height="400px" style="width:70%">
                        <el-carousel-item v-for="item in url" :key="item" style="width: 100%">
                            <h3 class="medium" style="width:100%">
                                <el-image :src="item.src" fit="fill" style="width: 100%">
                                </el-image>
                            </h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </el-container>
        <el-container>
            <activity></activity>
        </el-container>
        <el-container style="margin-top: 3%">
            <el-header style="margin-left: 10%">
                <div class="rname">
                    <h2>猜你喜欢</h2>
                </div>
            </el-header>
            <el-main style="margin-left:20%; width:60%">
                <div class="recommadview">
                    <div v-for="(item,index) in goods" :key="item.goodsId" style="float: left;margin-left: 2%;">
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
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
// @ is an alias to /src
import {defineComponent, ref} from 'vue'
import axios from "axios";
import {getHomeAllData} from "../../network/home";
import Activity from "@/views/activity";
import Categoryitem from "@/views/categoryitem";
import SearchAllGoods from "@/components/SearchAllGoods";

export default defineComponent({
    name: 'Home',
    components: {SearchAllGoods, Categoryitem, Activity},
    data() {
        return {
            url: [
                {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
            ],
            allcart: [],
            keys: [],
            goods: [],
        }
    },
    setup() {
        return {
            input: ref('')
        }
    },
    mounted() {
        axios.post("http://localhost:8083/category/getallcategory")
            .then(res => {
                this.allcart = res.data.data;
                this.keys = Object.keys(this.allcart)
                console.log(this.allcart[this.keys[0]][0].categoryId);
            })
        axios.get("http://localhost:8083/goods/allGoods")
            .then(res => {
                this.goods = res.data.data;
                console.log(res.data);
            })
    },
})
</script>
<style>
.home {
    background: #FFFFFF;
}
</style>








