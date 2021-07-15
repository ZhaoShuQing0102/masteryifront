<template>
    <el-container style="width:70%; height: 100%; margin-left: 15%">
        <el-aside width="55%">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 5%; font-size: 24px">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/categoryitem/'+ goods.goodsCategoryId}">{{
                        categoryName
                    }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ goods.goodsName }}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-image
                style="width: 70%; height: 65%; margin-top: 10%;"
                :src="url">
            </el-image>
            <div>
                <div style="float:left; margin-left: 30%">
                    <router-link :to="{ path: '/category/'+ goods.goodsCategoryId}">
                        <el-button type="text" style="color:RGB(70,70,70)">浏览其他商品</el-button>
                    </router-link>
                </div>
                <div style="float:left; margin-left: 10%">
                    <div v-if="isCollect" style="color:RGB(230,162,60)">
                        取消收藏
                        <el-button :disabled="disabled" type="warning" icon="el-icon-star-on"  @click="collect" circle></el-button>
                    </div>
                    <div v-if="!isCollect" style="color:RGB(230,162,60)">
                        收藏商品
                        <el-button :disabled="disabled" type="warning" icon="el-icon-star-off"  @click="collect" circle></el-button>
                    </div>
                </div>
            </div>
        </el-aside >

        <el-main style="height: 80%; margin-top: 5%; text-align: left;">
            <div class="title" style="font-size: 48px; font-weight: bolder;">
                <p >{{goods.goodsName}}</p>
            </div>
            <!--            <div class="info" style="font-size: 16px; margin-top: 20px">-->
            <!--                <p>{{goods.goodsInformation}}</p>-->
            <!--            </div>-->
            <div>
                <div style="font-size: 24px; margin-top: 10%">
                    <p>选择商品规格及数量：</p>
                </div>
                <div v-for="(speckey,index) in speckeys " :key="index" style="margin-top:5%">
                    <el-radio-group v-model="choosespec[index]" @change = "changespec">
                        <el-radio-button v-for="(specvalue,index2) in Object.values(specmap)[index]" :key="index2" :label="Object.values(specmap)[index][index2].id">{{Object.values(specmap)[index][index2].valueName}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div>
                    <el-input-number v-model="num" :min="1" :max="10" label="请选择商品数量"  style="float: left; margin-top: 5%"></el-input-number>
                    <div style="font-size: 12px; float:left; margin-top: 45px; margin-left: 20px">库存：{{stock}}</div>
                </div>
            </div>
            <p style="font-size: 24px; margin-top: 20%">单价：￥{{singelprice}}</p>
            <div style="margin-top: 30px">
                <el-button :disabled="disabled" type="primary" icon="el-icon-circle-plus" @click="addcart" style="background-color:RGB(245,154,35); border-color: RGB(245,154,35)" >加入购物车</el-button>
                <el-button :disabled="disabled" type="primary" icon="el-icon-goods" @click="FormVisible = true" style="background-color:RGB(245,154,35);border-color: RGB(245,154,35)">现在购买</el-button>
            </div>
            <div v-if="FormVisible" style="margin-top: 5%;">
                <div style="width: 200px; float:left"><el-input v-model="address" placeholder="请输入收货地址"></el-input></div>
                <el-button @click="FormVisible = false" style="float:left">取消</el-button>
                <router-link :to="{ path: '/payfororder'}">
                    <el-button type="primary" @click="buy" style="float:left;background-color:RGB(245,154,35);border-color: RGB(245,154,35)" >确定购买</el-button>
                </router-link>
            </div>
        </el-main>

    </el-container>
<!--    <div class="info">-->
<!--        <el-container style="width:70%; height: 90%; margin-left: 15%">-->
<!--            <el-image-->
<!--                style="width: 80%; height: 100%; margin-top: 10%; margin-left: 8%; border: 1px solid darkblue"-->
<!--                :src="url">-->
<!--            </el-image>-->
<!--        </el-container>-->
<!--    </div>-->

    <el-container style="width:60%; height: 100%; margin-left: 20%">
        <el-tabs type="border-card" style="width:90%">
            <el-tab-pane label="详情">
                <el-image
                    style="width:100%"
                    :src="url">
                </el-image>
            </el-tab-pane>
            <el-tab-pane label="评价">
                <Comment :goodId=$route.params.id></Comment>>
            </el-tab-pane>
        </el-tabs>
    </el-container>

</template>

<script>

import axios from "axios";
import Qs from "qs";
import Comment from "@/components/Comment";

export default {
    name: "goodsdetailview",
    components:{
        Comment
    },
    data() {
        return {
            userId:2,
            goods: '',
            categoryName: '',
            url: '',
            specmap:'',
            specvalues:'',
            speckeys:'',
            choosespec:[],
            num:1,
            singelprice:0,
            spec_id:0,
            goodsId:0,
            stock:0,
            address:'',
            FormVisible: false,
            disabled:false,
            isCollect:false,
            collectId: null
        }
    },
    methods: {
        changespec() {
            axios.post("http://localhost:8083/goods/stockPrice", Qs.stringify({good_id: this.goodsId,specs:this.choosespec},{indices:false}))
                .then(res => {
                    if(res.data.data == null) {
                        this.singelprice = '---';
                        this.stock = '该商品没有此种规格';
                        this.spec_id = null;
                        this.disabled = true;
                        this.isCollect = false;
                    }
                    else{
                        this.singelprice = res.data.data['price'];
                        this.stock = res.data.data['stock'];
                        this.spec_id = res.data.data['id'];
                        this.disabled= false;
                        axios.post("http://localhost:8083/collect/iscollect", Qs.stringify({userId: this.userId, specId: this.spec_id}))
                            .then(res => {
                                if(res.data.data === null) {
                                    this.isCollect = false;
                                    this.collectId = null;
                                } else {
                                    this.isCollect = true;
                                    this.collectId = res.data.data;
                                }
                            })
                    }
                })
        },
        buy() {
            axios.post("http://localhost:8083/order/creatOrder", Qs.stringify({goods: this.spec_id,num:this.num,singlePrice:this.singelprice,u_id:this.userId,status:0,price:this.singelprice*this.num,address:this.address}))
        },
        addcart() {
            if(this.spec_id != null) {
                axios.post("http://localhost:8083/cartitem/addcartitem",Qs.stringify({userId:this.userId,goodsId:this.spec_id,goodsNum:this.num}))
                    .then(res => {
                        if(res.data.code === 200) {
                            this.$message({
                                type:"success",
                                message:"成功加入购物车",
                                offset: 150
                            })
                        }
                    })
            }
        },
        collect() {
            if(this.isCollect) {
                axios.post("http://localhost:8083/collect/deletefromcollect", Qs.stringify({collectId:this.collectId}))
                this.isCollect = false;
                this.collectId = null;
            } else {
                axios.post("http://localhost:8083/collect/addtocollect", Qs.stringify({userId:this.userId,goodsId: this.spec_id}))
                    .then(res => {
                        axios.post("http://localhost:8083/collect/iscollect", Qs.stringify({
                            userId: this.userId,
                            specId: this.spec_id
                        }))
                            .then(res => {
                                if (res.data.data === null) {
                                    this.isCollect = false;
                                    this.collectId = null;
                                } else {
                                    this.isCollect = true;
                                    this.collectId = res.data.data;
                                }
                            })
                    })
            }
        }
    },
    mounted() {
        this.goodsId = this.$route.params.id;
        axios.post("http://localhost:8083/goods/goodById", Qs.stringify({good_id: this.goodsId}))
            .then(res => {
                this.goods = res.data.data;
                this.url = res.data.data.goodsCoverUrl;
                axios.post("http://localhost:8083/category/getcategorynamebyid", Qs.stringify({cid: this.goods.goodsCategoryId}))
                    .then(res => {
                        this.categoryName = res.data.data;
                    })
            })
        axios.post("http://localhost:8083/goods/goodTest", Qs.stringify({good_id: this.goodsId}))
            .then(res => {
                this.specmap = res.data.data;
                this.speckeys = Object.keys(this.specmap);
                for(let index in this.specmap)
                    this.choosespec.push(this.specmap[index][0].id)
                this.changespec()
            })
    },
}
</script>

<style scoped>
.info{
    background-color:#f5f5f5;
}
.is-disabled{
    background-color:RGB(243,209,158) !important;
    border-color:RGB(243,209,158) !important;
}
</style>