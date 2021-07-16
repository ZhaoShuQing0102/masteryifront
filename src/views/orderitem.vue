<template>
  <div class="orderitem">
<!--    修改于2017-07-12-->
    <div class="main">
      <div class="orderitemnav">
        <el-row :gutter="20">
          <el-col :span="6" :offset="2"><div class="order-id">{{ordercreateTime}}</div></el-col>
          <el-col :span="8"><div class="order-id">{{"订单号" + ' ' + order_id}}</div></el-col>
          <el-col :span="6" :offset="2">
            <div class="order-item-detail">
              <el-button size="mini" round @click="toOrderdetail(order_id)">详情</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="orderitembody">
        <ul class="order-item-list">
          <li class="order-item" v-for="(item,index) in list" :key="index">
            <el-row>
              <el-col :span="6">
                <div class="item-name">
                  <div class="item-image">
                    <img src="../assets/image/amani.jpg" alt="这里是图片">
                  </div>
                  <div class="item-info">
                    {{item.goodsName + ',' + item.goodsInformation}}
                  </div>
                </div>
              </el-col>
              <el-col :span="2" :offset="1">
                <div class="item-info-desc">
                  {{orderdesc(item)}}
                </div>
              </el-col>
              <el-col :span="1" :offset="1">
                <div class="itemprice">{{'￥'+item.singlePrice}}</div>
              </el-col>
              <el-col :span="1" :offset="1">
                <div class="item-num">{{item.goodsNum}}</div>
              </el-col>
              <el-col :span="2">
                <div class="item-service"><a href="#">申请售后</a></div>
              </el-col>
              <el-col :span="2" :offset="1" ><i class="el-icon-s-custom"></i> 名字</el-col>
              <el-col :span="4" :offset="1"><i class="el-icon-location"></i> {{orderaddr}}</el-col>
            </el-row>
          </li>
          <div class="item-footer">
            <el-row >
              <el-col :span="4" :offset="2"><div class="item-total">总价格:{{totalPrice}}元</div></el-col>
              <el-col :span="4" :offset="12">
                <div class="item-status" v-if="order_status === 1">
                  交易状态:未付款
                </div>
                <div class="item-false" v-else>
                  交易状态:已付款
                </div>
              </el-col>
            </el-row>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {post,get} from "@/utils/Network";
import QS from "qs"
import '../assets/css/orderitem.css'
import Moment from 'moment'

export default {
  name: "orderitem",
  props:{
    order_id:'',
    displaymode:''
  },
  data(){
    return{
      list:[],
      order_status:'',
      ordercreateTime:'',
      orderaddr:''
    }
  },
  computed:{
    totalPrice(){
      let totalPrice = 0
      for (let i = 0 ; i < this.list.length ; i ++){
        totalPrice += this.list[i].singlePrice * this.list[i].goodsNum
      }
      return totalPrice
    }
  },
  mounted() {
    this.getitem(this.order_id)
    // this.getorderstatus()
    this.getorderCreattime()
  },
  methods:{
    toOrderdetail(order_id){
      let isActive = false
      this.$emit('toorderdetail',order_id,isActive)
    },
    getitem(order_id){
      post('/orderItem/order-goods',QS.stringify({order_id:this.order_id}))
      .then(res => {
        // console.log(res.data.data[0][0].description)
        // let desctemp = res.data.data[0][0].description
        // let temp11 = Object.keys(desctemp)
        this.list = res.data.data[0]
        // let data = res.data.data
        // this.list = res.data.data
        // console.log(data)
      })
    },
    // getorderstatus(order_id){
    //   post('/order/getStatus',QS.stringify({order_id:this.order_id}))
    //   .then(res => {
    //     this.order_status = res.data.data
    //   })
    // },
    getorderCreattime(order_id){
      post('/order/getOrderByid',QS.stringify({order_id:this.order_id}))
          .then(res => {
            this.order_status = res.data.data.orderStatus
            console.log(this.order_status)
            this.ordercreateTime = res.data.data.createTime
            let datetemp = Moment(this.ordercreateTime).format("YYYY-MM-DD")
            // console.log(datetemp)
            this.ordercreateTime = datetemp
            this.orderaddr = res.data.data.orderAddr
          })
    },
    orderdesc(item){
      let desctemp = Object.values(item.description)
      let desc = ''
      for(let i in desctemp){
        if(i < desctemp.length-1 ){
          desc = desc + desctemp[i] +','
        }
        else desc = desc + desctemp[i]
      }
      return desc
    }
  }
}
</script>

<style scoped>

</style>