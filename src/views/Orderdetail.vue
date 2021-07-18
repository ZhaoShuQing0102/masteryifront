<template>
  <div class="order-detail">
          <div class="mainbody">

            <div class="mainnav">
              <div class="mainnavtop" style="text-align: center;font-size: 24px;margin-top: 10px">
                <h4 style="margin: 0 10px 10px 0">订单详情</h4>
              </div>
              <div class="mainnavinfo">
                <el-row >
                  <el-col :span="10" :offset="0"><div class="mainnavorder" style="text-align: left">订单号: {{orderNo}}</div></el-col>
                  <el-col :span="2" :offset="8"><div class="mainnavservice">
                    <el-button type="primary" size="small" round>联系客服</el-button>
                  </div></el-col>
                  <el-col :span="2" ><div class="mainnavservice">
                    <el-button v-if="orderstatus===1||orderstatus===2" type="danger" size="small" round>取消订单</el-button>
                    <el-button v-else type="danger" size="small" round>申请退款</el-button>
                  </div></el-col>
                  <el-col :span="2" ><div class="mainnavservice">
                    <el-button v-if="orderstatus===1" type="success" size="small" round @click="topay">立即付款</el-button>
                  </div></el-col>
                </el-row>
              </div>
            </div>

            <div class="flowchart" style="background-color: white">
              <ol>
                <li class="stepfirst">
                  <div class="flowfirst">
                    <div class="stepname">
                      拍下商品
                    </div>
                    <div class="stepicon">
                      <i class="el-icon-circle-check" ></i>
                    </div>
                    <div class="stepdate">
                      2021-01-01
                    </div>
                  </div>
                </li>
                <li>
                  <div class="jindutiao" v-if="orderstatus !== 1">
                    <el-progress :percentage="100" :color="'#67c23a'" :show-text="false"></el-progress>
                  </div>
                  <div class="jindutiao" v-else>
                    <el-progress :percentage="100" :color="'#f56c6c'" :show-text="false"></el-progress>
                  </div>
                </li>
                <li>
                  <div class="flowsecond">
                    <div class="stepname">
                      付款
                    </div>
                    <div class="stepicon" v-if="orderstatus !== 1">
                      <i class="el-icon-circle-check"></i>
                    </div>
                    <div class="stepicon" v-else>
                      <i class="el-icon-circle-close"></i>
                    </div>
                    <div class="stepdate" v-if="orderstatus">
                      2021-01-02
                    </div>
                  </div>
                </li>
                <li v-if="orderstatus === 2 || orderstatus === 3">
                  <div class="jindutiao">
                    <el-progress :percentage="100" :color="'#67c23a'" :show-text="false"></el-progress>
                  </div>
                </li>
                <li v-if="orderstatus === 2 || orderstatus === 3">
                  <div class="flowthird">
                    <div class="stepname">
                      商家发货
                    </div>
                    <div class="stepicon">
                      <i class="el-icon-circle-check"></i>
                    </div>
                    <div class="stepdate">
                      2021-01-03
                    </div>
                  </div>
                </li>
                <li v-if="orderstatus === 2 || orderstatus === 3">
                  <div class="jindutiao" v-if="orderstatus === 3">
                    <el-progress :percentage="100" :color="'#67c23a'" :show-text="false"></el-progress>
                  </div>
                  <div class="jindutiao" v-else>
                    <el-progress :percentage="100" :color="'#f56c6c'" :show-text="false"></el-progress>
                  </div>
                </li>
                <li v-if="orderstatus === 2 || orderstatus === 3">
                  <div class="divflowforth">
                    <div class="stepname">
                      买家收货
                    </div>
                    <div class="stepicon" v-if="orderstatus === 3">
                      <i class="el-icon-circle-check"></i>
                    </div>
                    <div class="stepicon" v-else>
                      <i class="el-icon-circle-close"></i>
                    </div>
                    <div class="stepdate">
                      2021-01-04
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <el-table
                :data="orderItem" :show-header="showHeader"
                style="width: 100% ;font-size: 16px;margin-top: 10px;padding-left: 20px" >
              <el-table-column
                  label="商品"
                  prop="goodsName"
                  width="200">
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
                <template v-if="orderstatus===3" #default="scope">
                  <div class="item-service"><a href="javascript:void(0)" @click="goCom(scope.row.goodsId,scope.row.id)">立即评价</a></div>
                </template>
                <template v-else #default="scope">
                  <div class="item-service"><a href="javascript:void(0)" @click="goShop(scope.row.goodsId)">查看商品</a></div>
                </template>
              </el-table-column>
              <el-table-column
                  align="right"
              >

              </el-table-column>
            </el-table>

            <div class="order-info" style="border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;margin-top: 10px">
              <div class="order-info-body" style="background-color: RGB(251,251,251)">
                <table>
                  <tbody>
                    <tr>
                      <td class="first-td">
                      <div class="order-info-detail">
                        <div class="info-detail-head">
                          <h4 style="padding-left: 20px;background-color: RGB(251,251,251)">订单信息</h4>
                        </div>
                        <ul>
                          <li class="fist-li">
                            <div class="addrhead">
                              收货地址
                            </div>
                            <div class="addr">
                              {{orderAddr}}
                            </div>
                          </li>
                          <li>
                            <div class="order-id-head">
                              订单编号
                            </div>
                            <div class="order-id">
                              {{order_id}}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </td>
                      <td class="second-td" style="margin-left: 200px">
                      <div class="order-status-info">
                        <dl>
                          <dt></dt>
                          <dd>
                              <div class="orderstatus-icon" v-if="orderstatus!==1">
                                <i class="el-icon-success"></i>
                              </div>
                              <div class="orderstatus-icon" v-else>
                                <i class="el-icon-error"></i>
                              </div>
                              <div class="orderstatus" v-if="orderstatus!==1">交易成功</div>
                              <div class="orderstatus" v-else>未交易成功</div>
                          </dd>
                          <dd>
                            <h5 style="margin-left: 48px;margin-top: 25px;width: 150px;height: 120px;font-weight: 400;font-size: 14px">物流：京东物流</h5>
                            <div style="margin-top: 25px;margin-left: 48px;font-size:14px">
                              <span style="margin-right: 20px">你可以申请</span>
                              <a href="#" style="color: #2652A5" @click="kaifapiao">申请开发票</a>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="orderdetail-footer">
              <table>
                <tbody>
                <tr>
                  <td>
                    <div class="fanhuijifen" style="font-size: 20px;padding-top: 50px">
                      返回20积分
                    </div>
                  </td>
                  <td style="width: 900px;font-size: 18px">
                    <div class="summary">
                      <el-row :gutter="20">
                        <el-col :span="6" :offset="12"><div class="">商品总价</div></el-col>
                        <el-col :span="6" ><div class=""><svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-newbimoney"></use>
                        </svg> {{totalPrice}}</div></el-col>
                      </el-row>
                      <el-row :gutter="20" style="margin-top: 10px">
                        <el-col :span="6" :offset="12"><div class="">运费</div></el-col>
                        <el-col :span="6" ><div class=""><svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-newbimoney"></use>
                        </svg> {{randomdiscounts}}</div></el-col>
                      </el-row>
                      <el-row :gutter="20" style="margin-top: 10px">
                        <el-col :span="6" :offset="12" style="color: RGB(245,154,35)">
                          <div v-if="orderstatus">实际付款</div>
                          <div v-else>应付款</div>
                        </el-col>
                        <el-col :span="6" ><div class="" style="color: RGB(245,154,35)"><svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-newbimoney"></use>
                        </svg> {{totalPrice + randomdiscounts}}</div></el-col>
                      </el-row>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="aaa"></div>
          </div>
  </div>
</template>

<script>

import orderfooter from "@/components/orderfooter";
import orderitem from "@/views/orderitem";
import Orderdetailitem from "@/views/Orderdetailitem";
import {get,post} from "@/utils/Network";
import QS from "qs";
import * as math from 'mathjs';
import $ from "jquery"

export default {
  name: "Orderdetail",
  data() {
    return {
      order_id:'',
      orderAddr:'',
      orderstatus:'',
      list:[],
      orderNo:'',
      orderItem:[],
      totalPrice:''
    }
  },
  computed:{
    randomdiscounts(){
      let rannum = math.round(math.random()*(5-0.5)+0.5)
      // console.log(rannum)
      return rannum
    }
  },
  components:{
    orderfooter,
    orderitem,
    Orderdetailitem
  },
  mounted() {
    this.getorder_id()
    this.getorder(this.order_id)
    this.getitem(this.order_id)
  },
  methods:{
    goShop(id){
      this.$router.push({
        path:'/shopdetail/'+id,
        params:{
          id:id
        }
      })
    },
    goCom(goodId,id){
      this.$router.push({
        path:'/comment',
        query:{
          goodId:goodId,
          id:id,
          orderId:this.order_id
        }
      })
    },
    topay(){
      post('/trade/pay',QS.stringify({order_id:this.order_id}))
          .then(res => {
            let infotemp = res.data
            console.log(infotemp)
            $('.aaa').html(infotemp)
          })
    },
    orderdesc(val){
      let res=''
      for(let i in Object.keys(val)){
        if(i!==Object.keys(val).length-1+'')
          res= res+val[Object.keys(val)[i]]+"，"
        else res= res+val[Object.keys(val)[i]]
      }
      return res
    },
    getorder_id(){
      this.order_id = this.$route.query.order_id
    },
    getorder(order_id){
      console.log(this.order_id)
      post('/order/getOrderByid',QS.stringify({order_id:this.order_id}))
          .then(res => {
            this.totalPrice=res.data.data.orderTotalPrice
            this.orderNo=res.data.data.orderNo
            this.orderAddr = res.data.data.orderAddr
            // console.log(res.data.data.orderAddr)
            this.orderstatus = res.data.data.orderStatus
          })
    },
    getitem(order_id){
      post('/orderItem/order-goods',QS.stringify({order_id:this.order_id}))
          .then(res => {

            this.orderItem=res.data.data[0]
            console.log("--------------------")
            console.log(res.data.data[0])
            console.log("--------------------")
          })
    },
    kaifapiao(){
      alert("亲，现在开不了发票哦")
    }
  }
}
</script>

<style scoped>
.order-detail {
  width: 80%;
  margin: auto;
}
.mainbody .mainnavinfo {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.mainnav {
  border-bottom: 1px solid #DDD;
}
.mainnavorder {
  font-weight: 400;
  color: #555555;
}
ul,ol {
  list-style:none
}
.mainbody .flowchart {
  margin-top: 1px;
  height:150px;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
  border-bottom: 1px solid #DDD;
}
.flowchart ol li {
  width: 150px;
  height: 120px;
  float: left;
  margin-top: 20px;
  text-align: center;
  /*margin-right: 100px;*/
  /*padding-left: 50px;*/
}
.flowchart ol li .el-progress{
  margin-top: 50px;
  width: 150px;
  stroke-width: 10px;
  show-text: false;
}
.flowchart ol .stepfirst {
  margin-left: 50px;
}
.flowchart ol .stepname ,.flowchart ol .stepicon ,.flowchart ol .stepdate{
  height: 40px;
  line-height: 40px;
}
.mainbody .orderslist{
  height: 25px;
}
.mainbody .orderslist  dd {
  text-align: center;
  display: inline;
  float: left;
  padding-right:12%;
}
.mainbody .orderslist .shangpin {
  margin-left: 5%;
  width: 30%;
  text-align: left;
}
.mainbody .order-itemlist {
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #DDD;
}
.order-info .order-info-body {
  min-height: 245px;
}
.order-info-body td {
  float: left;
}
.order-info-body .first-td {
  min-height: 245px;
  width: 37%;
  border-right: 1px solid #DDD;
  background-color: #FBFBFB;
}
.info-detail-head {
  height: 30px;
  line-height: 30px;
  /*margin-left: 20px;*/
  font-size: 14px;
  background-color: #F3F3F3;
}
.addrhead,.addr,.order-id, .order-id-head{
  width: 120px;
  float: left;
  /*margin-right: 30px;*/
  height: 100px;
  line-height: 140px;
}
.order-info-detail ul li {
  float: left;
}
.fist-li {
  border-bottom: 1px solid #DDD;
  min-width: 100%;
}
.order-status-info {
  font-size: 24px;
  line-height: 50px;
}
.order-status-info .orderstatus-icon,.order-status-info .orderstatus{
  float: left;
  margin-left: 50px;
  margin-top: 40px;
}
.order-status-info dd a:hover {
  color:red!important;
}
.orderdetail-footer {
  margin-top: 5px;
  min-height: 170px;
  border:1px solid #DDD;
  background-color: #FBFBFB;
}
.fanhuijifen {
  min-height: 170px;
  min-width: 258px;
  border-right: 1px solid #DDD;
  background-color: #FBFBFB;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}


</style>