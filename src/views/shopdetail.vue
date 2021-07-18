<template>
    <el-container style="width:70%; height: 100%; margin-left: 15%;background-color: white">
        <el-aside width="55%">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 5%; font-size: 24px;margin-left: 2%">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/categories',
                 query:{cname:parentName}}">{{
                  parentName
                }}
              </el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/categories',
                 query:{cname:parentName}}">{{
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
                    <router-link :to="{ path: '/categories',query:{cname:parentName}}">
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
                    <p>{{goods.goodsInformation}}</p>
                </div>
              <el-form label-width="80px" style="margin-top: 10%;text-align: left!important;">
                <el-form-item v-for="(speckey,index) in speckeys " :key="index" :label="speckey" style="margin-right: 80px">

                  <el-radio-group v-model="choosespec[index]" @change = "changespec">

                    <el-radio-button v-for="(specvalue,index2) in Object.values(specmap)[index]" :key="index2" :label="Object.values(specmap)[index][index2].id">{{Object.values(specmap)[index][index2].valueName}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="数量">
                  <el-input-number v-model="num" :min="1" :max="stock" label="请选择商品数量"  ></el-input-number>
                  <div style="font-size: 12px;  margin-top: 5px; margin-left: 20px">库存：{{stock}}</div>
                </el-form-item>
              </el-form>
<!--                <div v-for="(speckey,index) in speckeys " :key="index" style="margin-top:5%">-->
<!--                  <span style="margin-right: 10px">{{speckey}}</span>-->
<!--                    <el-radio-group v-model="choosespec[index]" @change = "changespec">-->
<!--                        <el-radio-button v-for="(specvalue,index2) in Object.values(specmap)[index]" :key="index2" :label="Object.values(specmap)[index][index2].id">{{Object.values(specmap)[index][index2].valueName}}</el-radio-button>-->
<!--                    </el-radio-group>-->
<!--                </div>-->
<!--                <div>-->
<!--                  <span>数量</span>-->
<!--                    <el-input-number v-model="num" :min="1" :max="stock" label="请选择商品数量"  style="float: left; margin-top: 5%"></el-input-number>-->
<!--                    <div style="font-size: 12px; float:left; margin-top: 45px; margin-left: 20px">库存：{{stock}}</div>-->
<!--                </div>-->
            </div>
            <p style="font-size: 24px; margin-top: 10%">单价：￥{{singelprice}}</p>
            <div style="margin-top: 30px">
                <el-button :disabled="disabled" type="primary" icon="el-icon-circle-plus" @click="addcart" style="background-color:RGB(245,154,35); border-color: RGB(245,154,35)" >加入购物车</el-button>
                <el-button :disabled="disabled" type="primary" icon="el-icon-goods" @click="FormVisible = true" style="background-color:RGB(245,154,35);border-color: RGB(245,154,35)">现在购买</el-button>
            </div>
            <div v-if="FormVisible" style="margin-top: 5%;">
                <div style="width: 200px; float:left"><el-input v-model="address" placeholder="请输入收货地址"></el-input></div>
                <el-button @click="FormVisible = false" style="float:left">取消</el-button>

                    <el-button type="primary" @click="buy" style="float:left;background-color:RGB(245,154,35);border-color: RGB(245,154,35)" >确定购买</el-button>

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

    <el-container style="width:70%; min-height: 500px ;margin-left: 15%;background-color: white">
        <el-tabs type="border-card" style="width:100%">
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
import {post} from "@/utils/Network";

export default {
    name: "goodsdetailview",
    components:{
        Comment
    },
    data() {
        return {
            userId: '',
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
            collectId: null,
            parentName:'',
            islogged:false
        }
    },
    methods: {

        changespec() {
            post("/goods/stockPrice", Qs.stringify({good_id: this.goodsId,specs:this.choosespec},{indices:false}))
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
                        post("/collect/iscollect", Qs.stringify({specId: this.spec_id}))
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
            if(this.islogged){
              post("/order/creatOrder", Qs.stringify({goods: this.spec_id,num:this.num,singlePrice:this.singelprice,status:0,price:this.singelprice*this.num,address:this.address})).then(res=>{
                let orderId=res.data.data.order_id
                this.$router.push({
                  path:'/payfororder',
                  query:{
                    order_id:orderId
                  }
                })
              })
            }
            else this.$router.push({path:'/login'})
        },
        addcart() {
          if(this.islogged){
              if(this.spec_id != null) {
                post("/cartitem/addcartitem",Qs.stringify({goodsId:this.spec_id,goodsNum:this.num}))
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
            }
            else this.$router.push({path:'/login'})
        },
        collect() {
            if(this.islogged){
              if(this.isCollect) {
                post("/collect/deletefromcollect", Qs.stringify({collectId:this.collectId}))
                this.isCollect = false;
                this.collectId = null;
              } else {
                post("/collect/addtocollect", Qs.stringify({goodsId: this.spec_id}))
                    .then(res => {
                      post("/collect/iscollect", Qs.stringify({
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
            else this.$router.push({path:'/login'})
        }
    },
    mounted() {
      this.goodsId = this.$route.params.id;
      if(this.goodsId>0){
        post("/goods/goodById", Qs.stringify({good_id: this.goodsId}))
            .then(res => {
              this.goods = res.data.data;
              this.url = res.data.data.goodsCoverUrl;
              post("/category/getbothname", Qs.stringify({cid: this.goods.goodsCategoryId}))
                  .then(res => {
                    this.categoryName = res.data.data.categoryName;
                    this.parentName=res.data.data.parentName
                    post("/goods/goodTest", Qs.stringify({good_id: this.goodsId}))
                        .then(res => {
                          this.specmap = res.data.data;
                          this.speckeys = Object.keys(this.specmap);
                          for(let index in this.specmap)
                            this.choosespec.push(this.specmap[index][0].id)
                          this.changespec()
                          if(window.localStorage.getItem("token")===null||window.localStorage.getItem("token")===undefined){
                            this.$store.state.notLogin=true
                            this.islogged=false
                          }
                          else{
                            post("/login/token").then(res=>{
                              if(res.data===true) {
                                this.$store.state.notLogin = false
                                this.islogged= true;
                              }
                              else {
                                this.$store.state.notLogin = true
                                this.islogged= false;
                              }
                            })
                          }
                        })
                  })
            })

      }



    },
}
</script>

<style >
.info{
    background-color:#f5f5f5;
}
.el-button--primary .is-disabled{
    background-color:RGB(243,209,158) !important;
    border-color:RGB(243,209,158) !important;
}
.el-form-item__label{
  text-align: left!important;
}
</style>