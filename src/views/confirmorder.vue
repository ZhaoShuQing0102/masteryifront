<template>
  <div class="confirmorder" style="background-color: white">

    <div class="confirm-nav" style="position:relative;">
      <div class="nav-head" style="text-align: left;width: 50%">
        <h5 style="font-size: 30px">请确认订单</h5>
      </div>
      <div class="nav-head-id" style="text-align: left;width: 50%">

          <h5 style="font-size: 16px;margin-top: 20px;margin-left: 10px">订单号 {{order.orderNo}}</h5>

      </div>
      <div style="position:absolute;top:20px;right:0;width: 40%;font-size: 20px;text-align: right;line-height:300%;margin-right: 50px">
        支付剩余时间：
        <countdown2 :endTime="endTime" style="float:right;height: 80px;font-size: 36px;font-style: normal"></countdown2>
      </div>
    </div>


<!--展示订单商品-->
    <el-table
        :data="list"
        style="width: 100% ;font-size: 16px;margin-top: 10px;padding-left: 20px" >
      <el-table-column
          label="商品"
          prop="goodsName"
          width="350">
        <template #default="scope">
          <img v-if="scope.row.goodsCoverUrl==='null'||scope.row.goodsCoverUrl===null" alt="" src="../assets/image/amani.jpg" style="width: 70px;float: left">
          <img v-else :src="scope.row.goodsCoverUrl" alt="" style="width: 70px;float: left">
          <div style="float: left;line-height: 60px;font-size: 18px;margin-left: 15px">{{scope.row.goodsName}}</div>
        </template>
      </el-table-column>

      <el-table-column
          label="规格"
          prop="userName"
          width="220">
        <template #default="scope">
          <span style="height: 50px" >{{ orderdesc(scope.row.description) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="单价"
          prop="singlePrice"
          width="200" >
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
          width="170">
      </el-table-column>
      <el-table-column
          label="小计"
          prop="goodsNum"
          width="200">
        <template #default="scope">

          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-newbimoney"></use>
          </svg>
          <span>{{scope.row.singlePrice*scope.row.goodsNum}}</span>
        </template>
      </el-table-column>

      <el-table-column
          align="right"
      >

      </el-table-column>
    </el-table>
<!--    展示结束-->
    <div class="goods-sumary" style="height: 40px;margin-top: 1px;">
      <div class="xiaoji" style="float: left;width: 10%;line-height: 40px;margin-left: 5%;font-size: 16px">小计</div>
      <div class="total-price" style="float: left;width: 10%;line-height: 40px;text-align: right;margin-left: 66%;font-size: 20px">{{'￥'+order.orderTotalPrice}}</div>
    </div>

    <div class="receipt" style="height: 150px;margin-top: 1px;border-top: 1px solid #DDDDDD;border-bottom: 1px solid #DDDDDD">
      <div class="receipt-info" style="float: left;width: 25%;height: 150px;">
        <h5 style="height: 30px;margin-top: 20px;padding-left: 8%;font-size: 16px">收货信息</h5>
        <div class="rece-name" style="height: 25px;padding-left: 8%">
          <div class="xingming" style="float: left;">姓名:</div>
          <div class="xingming" style="margin-left: 17%;float: left;">{{user_name}}</div>
        </div>
        <div class="rece-phonenum" style="height: 25px;margin-top: 5px;padding-left: 8%">
          <div class="lanxidianhua" style="float: left;">联系电话:</div>
          <div class="lanxidianhua" style="margin-left: 3%;float: left;">{{user_phone}}</div>
        </div>
        <div class="rece-addr" style="height: 25px;margin-top: 5px;padding-left: 8%">
          <div class="shouhuodizhi" style="float: left;">收货地址:</div>
          <div class="shouhuodizhi" style="margin-left: 3%;float: left;">{{order_addr}}</div>
        </div>
      </div>
      <div class="info-change" style="float: left;width: 20%;height: 150px;">
        <div class="xiugai" style="height: 60px;line-height: 60px;font-size: 14px;padding-left: 9%;padding-top: 10px;">
          修改信息
<!--          -->
        </div>
        <div class="xiugai-button" style="margin-left: 9%; ">
          <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"></el-button>
        </div>
      </div>
      <div class="yunfei" style="float: left;width: 10%;height: 110px;margin-left: 65%;">
      </div>
    </div>

    <div style="width: 100%;min-height: 80px;margin-top: 25px;position: relative">
      <div style="margin-right: 20px;margin-left: 200px;position: absolute;right: 20px;font-size: 24px">
        应付金额<span style="margin-left: 20px;color: #F59A23;font-size: 32px"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-newbimoney"></use>
                  </svg>{{randomfreight+order.orderTotalPrice}}</span>
      </div>
      <div style="position: absolute;right: 300px;margin-right: 50px;font-size: 24px">
        运费<span style="margin-left: 20px;color: #F59A23;font-size: 32px"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-newbimoney"></use>
                  </svg>{{randomfreight}}</span>
      </div>
    </div>
    <div style="width: 100%;text-align: right;padding-bottom: 35px">
      <el-button round :disabled="len===0" type="warning" style="width: 150px;height: 50px;font-size: 26px;margin-right: 40px" @click="topay">立即支付</el-button>
    </div>
    <div class="aaa"></div>

    <el-dialog title="收货信息" v-model="dialogFormVisible">
      <el-form>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="user_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-input v-model="order_addr" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>




  </div>
</template>

<script>
import {get,post} from "@/utils/Network";
import QS from "qs"
import Moment from 'moment'
import countdown2 from "@/components/countdown2";

import * as math from "mathjs";
import $ from 'jquery';

export default {
  name: "confirmorder",
  components:{countdown2},
  data(){
    return{
      user_id:1,
      order_id:'',
      list:[],
      dialogFormVisible:false,
      formLabelWidth: '120px',
      user_name: '',
      user_phone: '',
      order:'',
      order_addr:'',
      endTime:''
    }
  },
  computed:{
    totalPrice(){
      let totalPrice = 0
      for (let i = 0 ; i < this.list.length ; i ++){
        totalPrice += this.list[i].singlePrice * this.list[i].goodsNum
      }
      return totalPrice
    },
    randomfreight(){
      let rannum = math.round(math.random()*(9-0.5)+0.5)
      // console.log(rannum)
      return rannum
    }
  },
  mounted() {
    this.endTime=Moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss")

    this.order_id=this.$route.query.order_id
    this.getitem(this.order_id)
    this.getorderAddr()
  },
  methods:{
    confirmmodifi(){
      this.$alert('修改成功','修改信息',{
        confirmButtonText: '确定',
        callback:action => {
          this.$message({
            type:'info',
            message:'修改成功，请关闭修改信息窗口'
          });
        }
      });
    },
    topay(){
      post('/trade/pay',QS.stringify({order_id:this.order_id}))
          .then(res => {
            let infotemp = res.data
            $('.aaa').html(infotemp)
          })
    },
    getitem(order_id){
      post('/orderItem/order-goods',QS.stringify({order_id:order_id}))
          .then(res => {
            this.list = res.data.data[0]
            post("/user/getuser").then(res=>{
              this.user_name=res.data.data.userName
              this.user_phone=res.data.data.phoneNum
            })
          })
    },
    payNow(){

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
    getorderAddr(order_id){
      post('/order/getOrderByid',QS.stringify({order_id:this.order_id}))
          .then(res => {
            this.order = res.data.data
            this.order_addr=res.data.data.orderAddr
          })
    }
  }
}
</script>

<style scoped>
ul,ol {
  list-style:none
}
.confirmorder {
  width: 84%;
  margin-left: 8%;
}
.confirm-nav {
  width: 100%;
  height: 110px;
  margin: auto;
  border-bottom: 1px solid #DDDDDD;
  /*background-color: pink;*/
}
.confirm-nav .nav-head {
  height: 60px;
  /*background-color: purple;*/
}
.confirm-nav .nav-head h5 {
  font-weight: 400;
  /*margin-top: 10px;*/
  /*line-height: 60px;*/
  font-size: 26px;
  padding-top: 15px;
  padding-left: 10px;
}
.confirm-nav .nav-head-id {
  height: 50px;
}
.nav-head-id div {
  padding-top: 25px;
  padding-left: 12px;
  float: left;
  /*background-color: skyblue;*/
}
.nav-head-id div h5 {
  font-weight: 400;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>