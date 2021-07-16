<template>
  <div class="home">
    <div v-if="isActive" class="order-detail-interface">
        <div class="main-nav">
            <div class="nav-title">
              <h3>我的订单</h3>
            </div>
            <div class="nav-serach">
              <input type="text" placeholder="输入商品id" v-model="search_id" style="outline: none">
              <el-button type="primary" icon="el-icon-search" style="margin-left: 30px;" @click="searchbyid">搜索</el-button>
            </div>
        </div>

        <div class="waiter" >
          <img src="../assets/image/waiter.png" alt="" @click="clickservice">
        </div>

        <div class="main-body">
          <div class="order-nav">
            <el-row :gutter="20">
              <el-col :span="3"><div class="grid-content "><el-button type="primary" @click="showall">全部订单</el-button></div></el-col>
              <el-col :span="3"><div class="grid-content "><el-button type="primary" @click="showhavnot">待支付</el-button></div></el-col>
              <el-col :span="3"><div class="grid-content "><el-button type="primary" @click="showhav">已付款</el-button></div></el-col>
              <el-col :span="9"><div class="grid-content "></div></el-col>
              <el-col :span="3"><div class="grid-content "><el-tag>订单状态</el-tag></div></el-col>
              <el-col :span="3"><div class="grid-content "><el-tag>操作</el-tag></div></el-col>
            </el-row>
          </div>

          <div class="order-itemlist" >
            <div v-if="isbyid">

            </div>

            <div v-else>
              <div v-if="this.displaymode === 1">
                <orderitem v-if="order_id_list.length" v-for="(order_id_temp,index) in order_id_list"
                           :key="index"
                           :order_id="order_id_temp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <div v-else-if="this.displaymode === 2">
                <orderitem v-if="havnot_list.length" v-for="(order_id_temp,index) in havnot_list"
                           :key="index"
                           :order_id="order_id_temp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <div v-else-if="this.displaymode === 3">
                <orderitem v-if="hav_list.length" v-for="(order_id_temp,index) in hav_list"
                           :key="index"
                           :order_id="order_id_temp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>

            </div>

            <h2 v-else>购物车空空如也</h2>
          </div>


        </div>
    </div>
    <div v-else class="order-detail-interface">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import '../assets/css/home.css'
  import QS from "qs"
import {get,post} from "@/utils/Network";
  import orderfooter from "@/components/orderfooter";
  import orderitem from "@/views/orderitem";

  export default {
    name: 'Home',
    components: {
      orderitem,
      orderfooter
    },
    data() {
      return {
        displaymode:1,
        u_id:1,
        index:0,
        isActive:true,
        order_id:1,
        // 一个订单的list
        list:[],
        order_id_list:[],
        // 全部订单的list
        total_list:[],
        havnot_list:[],
        hav_list:[],
        search_id:'',
        isbyid:false
      };
    },
    mounted() {
      this.getinfo(this.u_id)
    },
    methods:{
      toorderdetail(order_id,isActive){
        this.isActive = isActive
        this.$router.push({path:'/Orderdetail',query:{order_id:order_id}})
      },
      getinfo(u_id){
        post('/order/getOrderByuid',QS.stringify({u_id:this.u_id}))
        .then(res => {
          let tempdata = []
          for(let i in res.data.data){
            tempdata.push(res.data.data[i].orderId)
          }
          this.order_id_list = tempdata
          // 未完成
          let tempdata2 = []
          for(let i in res.data.data){
            if (res.data.data[i].orderStatus === 1){
              tempdata2.push(res.data.data[i].orderId)
            }
          }
          this.havnot_list = tempdata2
          // 已完成
          let tempdata3 = []
          for(let i in res.data.data){
            if (res.data.data[i].orderStatus === 2 || res.data.data[i].orderStatus === 3){
              tempdata3.push(res.data.data[i].orderId)
            }
          }
          this.hav_list = tempdata3
        })
      },
      searchbyid(){
        this.isbyid = false
      },
      clickservice(){
        alert("亲，别点了，还没开发呢")
      },
      showall(){
        this.displaymode = 1
      },
      showhavnot(){
        this.displaymode = 2
      },
      showhav(){
        this.displaymode = 3
      },
    }
  }
</script>
<style>

</style>