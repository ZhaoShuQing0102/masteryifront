<template>
  <div class="home">
    <div v-if="isActive" class="order-detail-interface">


        <div class="waiter" >
          <img src="../assets/image/waiter.png" alt="" @click="clickservice">
        </div>

        <div class="main-body">
          <div class="main-nav">
            <div class="nav-title">
              <h3 style="text-align:left;line-height: 80px;color:#409EFF;font-weight: 700;font-size: 25px;text-indent: 1em;">我的订单</h3>
            </div>

          </div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width: 90%;margin-left: 5%;
          ;font-size: 20px;background-color: white;height: 5vh">
            <el-tab-pane label="全部订单" name="first"></el-tab-pane>
            <el-tab-pane label="未支付" name="second"></el-tab-pane>
            <el-tab-pane label="运输中" name="third"></el-tab-pane>
            <el-tab-pane label="待评价" name="fourth"></el-tab-pane>


          </el-tabs>

          <div class="order-itemlist" >
            <div v-if="isbyid">

            </div>

            <div v-else>
              <div v-if="displaymode === 1">
                <orderitem v-if="order_id_list.length" v-for="(ordertemp,index) in allData"
                           :key="new Date().getTime()" :order="orders[index]" :index="index"
                           :orderItem="ordertemp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <div v-else-if="displaymode === 2">
                <orderitem v-if="havnot_list.length" v-for="(ordertemp,index) in  unpayData "
                           :key="new Date().getTime()" :order="orders[order_id_list.indexOf(ordertemp[0].orderId)]" :index="index"
                           :orderItem="ordertemp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <div v-else-if="displaymode === 3">
                <orderitem v-if="hav_list.length" v-for="(ordertemp,index) in payData"
                           :key="new Date().getTime()" :order="orders[order_id_list.indexOf(ordertemp[0].orderId)]" :index="index"
                           :orderItem="ordertemp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <div v-else-if="displaymode === 4">
                <orderitem v-if="com_list.length" v-for="(ordertemp,index) in comData"
                           :key="new Date().getTime()" :order="orders[order_id_list.indexOf(ordertemp[0].orderId)]" :index="index"
                           :orderItem="ordertemp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <div v-else-if="displaymode === 4">
                <orderitem v-if="succ_list.length" v-for="(ordertemp,index) in succData"
                           :key="new Date().getTime()" :order="orders[order_id_list.indexOf(ordertemp[0].orderId)]" :index="index"
                           :orderItem="ordertemp" @toorderdetail="toorderdetail">
                </orderitem>
              </div>
              <h2 v-else>购物车空空如也</h2>
            </div>


          </div>


        </div>
    </div>
    <div v-else class="order-detail-interface">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
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
        isbyid:false,
        allData:[],
        orders:[],
        unpayData:[],
        payData:[],
        activeName:'first',
        comData:[],
        com_list:[],
        succ_list:[],
        succData:[]
      };
    },
    mounted() {
      this.getinfo(this.u_id)
    },
    methods:{
      handleClick(tab, event) {
        if(tab.props.name==='first') this.showall()
        if(tab.props.name==='second') this.showhavnot()
        if(tab.props.name==='third') this.showhav()
        if(tab.props.name==='fourth') this.showCom()
        if(tab.props.name==='fifth') this.showSucc()
      },
      toorderdetail(order_id,isActive){
        this.isActive = isActive
        this.$router.push({path:'/Orderdetail',query:{order_id:order_id}})
      },
      getinfo(u_id){
        post('/order/getOrderByuid',QS.stringify({u_id:this.u_id}))
        .then(res => {
          let tempdata = []
          this.orders=res.data.data
          for(let i in res.data.data){
            tempdata.push(res.data.data[i].orderId)
          }
          this.order_id_list = tempdata
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
            if (res.data.data[i].orderStatus === 2){
              tempdata3.push(res.data.data[i].orderId)
            }
          }
          let tempdata4=[]
          for(let i in res.data.data){
            if (res.data.data[i].orderStatus === 3){
              tempdata4.push(res.data.data[i].orderId)
            }
          }
          let tempdate5=[]
          for(let i in res.data.data){
            if (res.data.data[i].orderStatus === 7){
              tempdata4.push(res.data.data[i].orderId)
            }
          }
          this.succ_list=tempdate5
          this.com_list=tempdata4
          this.hav_list = tempdata3
          if(this.order_id_list.length>0){
              post("/orderItem/order-goods",QS.stringify({order_id:this.order_id_list},{indices:false})).then(res=>{
                this.allData=res.data.data
                post("/orderItem/order-goods",QS.stringify({order_id:this.havnot_list},{indices:false})).then(res=>{
                  this.unpayData=res.data.data
                  post("/orderItem/order-goods",QS.stringify({order_id:this.hav_list},{indices:false})).then(res=>{
                    this.payData=res.data.data
                    post("/orderItem/order-goods",QS.stringify({order_id:this.com_list},{indices:false})).then(res=>{
                      this.comData=res.data.data
                    })
                    console.log("---------------")
                    console.log(this.orders.filter(data=>data.orderId===1))

                  })
                })
              })
          }
          // 未完成

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
      showCom(){
        this.displaymode= 4
      },
      showSucc(){
        if(this.succ_list.length>0){
          post("/orderItem/order-goods",QS.stringify({order_id:this.succ_list},{indices:false})).then(res=>{
            this.succData=res.data.data
            this.displaymode= 5
          })
        }

      }
    }
  }
</script>
<style >
.main-nav {
  height:80px;
  width: 90%;
  margin-left: 5%;
  padding-bottom: 2%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.nav-title {
  float: left;
  text-align: left;
}

.waiter {
  width:60px;
  height: 130px;
  position: fixed;
  right: 0;
  bottom:150px;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
a {
  text-decoration: none;
}
ul,ol {
  list-style:none
}
/*class main-body css*/
.main-body .order-nav .el-col{
  border-radius: 4px;
}
.main-body .grid-content {
  border-radius: 4px;
  /*background-color: pink;*/
  height: 60px;
  font-size: 18px;
  color: #555555;

  font-weight: 400;
  line-height: 60px;
  text-indent: 1em;
}
.main-body .el-row {
  margin: 10px 30px;

}
.order-nav {
  width: 90%;
  margin:0 5%;
  border-bottom: 1px solid rgb(51, 51, 51);
}


.el-tabs__item{
  font-size: 18px!important;
}
.el-tabs__item{
  height: 45px;
}
</style>