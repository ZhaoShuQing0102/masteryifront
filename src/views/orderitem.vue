<template>
  <div class="orderitem">
<!--    修改于2017-07-12-->
    <div class="main" style="background-color: white">
<!--      <div class="orderitemnav">-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="6" :offset="2"><div class="order-id">{{order.formate_time}}</div></el-col>-->
<!--          <el-col :span="8"><div class="order-id">{{"订单号" + ' ' + order.orderNo}}</div></el-col>-->
<!--          <el-col :span="6" :offset="2">-->
<!--            <div class="order-item-detail">-->
<!--              <el-button size="mini" round @click="toOrderdetail(order_id)">详情</el-button>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
      <div style="width: 100%;text-align: left;margin-top: 20px">
        <el-tag type="success" style="margin-left: 15px">创建时间</el-tag>
        <span style="margin-left: 15px">{{order.formate_time}}</span>
        <el-tag type="success" style="margin-left: 50px">订单编号</el-tag>
        <span style="margin-left: 15px">{{order.orderNo}}</span>
        <el-tag type="success" style="margin-left: 50px">收货地址</el-tag>
        <span style="margin-left: 15px">{{order.orderAddr}}</span>


        <div class="order-item-detail" style="float: right">
           <el-button size="mini" round @click="toOrderdetail(order.orderId)">查看详情</el-button>
         </div>
      </div>
      <div style="width: 100%;text-align: left">

      </div>

      <div class="orderitembody" >
        <el-table
            :data="orderItem" :show-header="showHeader"
            style="width: 100% ;font-size: 16px;margin-top: 10px;padding-left: 20px" >
          <el-table-column
              label="商品"
              prop="goodsName"
              width="300">
            <template #default="scope">
              <img v-if="scope.row.goodsCoverUrl==='null'||scope.row.goodsCoverUrl===null" alt="" src="../assets/image/amani.jpg" style="width: 70px;float: left">
              <img v-else :src="scope.row.goodsCoverUrl" alt="" style="width: 70px;float: left">
              <div style="float: left;line-height: 60px;font-size: 18px;margin-left: 15px">{{scope.row.goodsName}}</div>
            </template>
          </el-table-column>

          <el-table-column
              label="规格"
              prop="userName"
              width="250">
            <template #default="scope">
              <span style="height: 50px" >{{ orderdesc(scope.row.description) }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="单价"
              prop="singlePrice"
              width="220" >
            <template #default="scope">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-newbimoney"></use>
              </svg>
              <span>{{scope.row.singlePrice}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="数量"
              prop="goodsNum"
              width="150">
          </el-table-column>
          <el-table-column
              label="小计"
              prop="goodsNum"
              width="150">
            <template #default="scope">

                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-newbimoney"></use>
                </svg>
                <span>{{scope.row.singlePrice*scope.row.goodsNum}}</span>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div class="item-service"><a href="#">申请售后</a></div>
            </template>
          </el-table-column>
          <el-table-column
              align="right"
          >

          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align: left;margin-top: 10px;padding-left: 20px;margin-bottom: 40px;">
          <div class="item-status" v-if="order.orderStatus === 1" style="">
            <el-tag type="danger" style="font-size: 18px">交易状态:未付款</el-tag>
          </div>
          <div class="item-false" v-else>
            <el-tag style="font-size: 18px">交易状态:已付款</el-tag>
          </div>
          <div style="float: right;margin-right: 25px;font-size: 24px;padding-bottom:40px">
            共计:<svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-newbimoney"></use>
          </svg>{{order.orderTotalPrice}}
          </div>
        </div>

<!--        <ul class="order-item-list">-->
<!--          <li class="order-item" v-for="(item,index) in orderItem" :key="new Date().getTime()">-->
<!--            <el-row>-->
<!--              <el-col :span="6">-->
<!--                <div class="item-name">-->
<!--                  <div >-->
<!--                    <img src="../assets/image/amani.jpg" alt="这里是图片" class="item-image">-->
<!--                  </div>-->
<!--                  <div class="item-info">-->
<!--                    {{item.goodsName + ',' + item.goodsInformation}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </el-col>-->
<!--              <el-col :span="2" :offset="1">-->
<!--                <div class="item-info-desc">-->
<!--                  {{desctemp(item)}}-->
<!--                </div>-->
<!--              </el-col>-->
<!--              <el-col :span="1" :offset="1">-->
<!--                <div class="itemprice">{{'￥'+item.singlePrice}}</div>-->
<!--              </el-col>-->
<!--              <el-col :span="1" :offset="1">-->
<!--                <div class="item-num">{{item.goodsNum}}</div>-->
<!--              </el-col>-->
<!--              <el-col :span="2">-->
<!--                <div class="item-service"><a href="#">申请售后</a></div>-->
<!--              </el-col>-->
<!--              <el-col :span="2" :offset="1" ><i class="el-icon-s-custom"></i> 名字</el-col>-->
<!--              <el-col :span="4" :offset="1"><i class="el-icon-location"></i> {{orderaddr}}</el-col>-->
<!--            </el-row>-->
<!--          </li>-->
<!--          <div class="item-footer">-->
<!--            <el-row >-->
<!--              <el-col :span="4" :offset="2"><div class="item-total">总价格:{{totalPrice}}元</div></el-col>-->
<!--              <el-col :span="4" :offset="12">-->
<!--                <div class="item-status" v-if="order_status === 1">-->
<!--                  交易状态:未付款-->
<!--                </div>-->
<!--                <div class="item-false" v-else>-->
<!--                  交易状态:已付款-->
<!--                </div>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
import {post,get} from "@/utils/Network";
import QS from "qs"
import Moment from 'moment'

export default {
  name: "orderitem",
  props:{
    orderItem:{
      type:Object
    },
    displaymode:'',
    order:{
      type:Object
    },
    index:{
      type:Number
    }
  },
  data(){
    return{
      list:[],
      order_status:'',
      ordercreateTime:'',
      orderaddr:'',
      showHeader:false
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
    // this.getitem(this.order_id)
    // // this.getorderstatus()
    // this.getorderCreattime()
    if(this.index===0) this.showHeader=true
    console.log(this.order.orderStatus)
  },
  methods:{
    toOrderdetail(order_id){
      let isActive = false
      this.$emit('toorderdetail',order_id,isActive)
    },
    getitem(order_id){
      // post('/orderItem/order-goods',QS.stringify({order_id:this.order_id}))
      // .then(res => {
      //   // console.log(res.data.data[0][0].description)
      //   // let desctemp = res.data.data[0][0].description
      //   // let temp11 = Object.keys(desctemp)
      //   this.list = res.data.data[0]
      //   console.log("========")
      //   console.log(this.list)
      //   // let data = res.data.data
      //   // this.list = res.data.data
      //   // console.log(data)
      // })
    },
    // getorderstatus(order_id){
    //   post('/order/getStatus',QS.stringify({order_id:this.order_id}))
    //   .then(res => {
    //     this.order_status = res.data.data
    //   })
    // },

    orderdesc(val){
      let res=''
      for(let i in Object.keys(val)){
        if(i!==Object.keys(val).length-1+'')
          res= res+val[Object.keys(val)[i]]+"，"
        else res= res+val[Object.keys(val)[i]]
      }
      return res
    }
  }
}
</script>

<style scoped>
.order-item {
  width: 90%;
  margin: 0 auto;
}
.main {
  width: 90%;
  border: 1px solid #ececec;
  border-top: 1px solid white;
  margin: 0 auto 10px auto;
}
.orderitemnav {
  width: 80%;
  margin-left: 10%;
}
.order-id {
  height: 40px;
  line-height: 40px;
  /*background-color: #ececec;*/
}

.order-item-detail .el-button {
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 25px;
}
.order-item >.el-row {
  width: 90%;
  margin: 0 auto;
  height: 100px;
  line-height: 100px;
  font-size: 14px;
  /*background-color: pink;*/
  border-spacing: 0;
  border-collapse: collapse;
  border: 1px solid #ececec;
}
.order-item .item-footer {
  width: 90%;
  height: 30px;
  line-height: 30px;
  /*background-color: purple;*/
  margin:1px auto 20px auto;
  /*border: 1px solid #ececec;*/
}
.orderitembody {
  width: 100%;
}
.item-service a{
  text-decoration: none;
  color: #666;
}
.item-service a:hover {
  color: red!important;
}
.item-name .item-image,.item-name .item-info{
  float: left;
}
.item-name {
  height: 100px;
  width: 309px;
}
.item-name .item-image,.item-name .item-image image {
  margin-top: 5px;
  width: 90px;
  height: 90%;
}
ul,ol {
  list-style:none
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>