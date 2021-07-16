<template>
  <div class="orderdetailitem">
    <div class="detail-item-list">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <table>
            <tbody>
            <tr>
              <td>
                <div class="order-item-info">
                  <div class="info-picture">
<!--                    <img src="item.goodsCoverUrl" alt="这里是图片" >-->
                    <img src="../assets/image/amani.jpg" alt="这里是图片" width="80px" height="80px" >
                  </div>
                  <div class="info-description">
                    <div>
                      <div style="width: 150px;height: 35px;font-size: 14px">{{item.goodsName + ' ' + item.goodsInformation}}</div>
                      <div style="width: 150px;height: 35px;font-size: 14px">{{orderdesc(item)}}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="info-price">
                  {{item.singlePrice}}
                </div>
              </td>
              <td class="info-num">{{item.goodsNum}}</td>
              <td>
                <div class="info-status">
                  <span v-if="order_status === 1" style="color: #C60">
                    交易成功
                  </span>
                  <span v-else>交易未成功</span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {get,post} from "@/utils/Network";
import QS from "qs"
import Moment from 'moment'

export default {
  name: "Orderdetailitem",
  // props:{
  //   order_id:''
  // },
  data(){
    return{
      order_id:'',
      list:[],
      order_status:'',
      ordercreateTime:'',
      orderaddr:''
    }
  },
  computed:{
    // order_status(){
    //   post('/order/getStatus',QS.stringify({order_id:this.order_id}))
    //       .then(res => {
    //         let order_status_temp = res.data.data
    //         console.log(order_status_temp)
    //         return order_status_temp
    //       })
    // }
  },
  mounted() {
    this.getorder_id()
    this.getitem(this.order_id)
    // this.getorderstatus(this.order_id)
    this.getorderCreattime(this.order_id)
  },
  methods:{
    getorder_id(){
      this.order_id = this.$route.query.order_id
    },
    getitem(order_id){
      console.log('子组件')
      console.log(order_id)
      post('/orderItem/order-goods',QS.stringify({order_id:order_id}))
          .then(res => {
            // console.log(res.data.data[0])
            this.list = res.data.data[0]
            // let data = res.data.data
            // this.list = res.data.data
            // console.log(data)
          })
    },
    // getorderstatus(order_id){
    //   post('/order/getStatus',QS.stringify({order_id:order_id}))
    //       .then(res => {
    //         this.order_status = res.data.data
    //         console.log(this.order_status)
    //       })
    // },
    getorderCreattime(order_id){
      post('/order/getOrderByid',QS.stringify({order_id:order_id}))
          .then(res => {
            this.order_status = res.data.data.orderStatus
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
.detail-item-list td {
  float: left;
}
.detail-item-list li {
  height: 100px;
  line-height: 50px;
}
.order-item-info {
  min-height: 80px;
  width: 520px;
}
.order-item-info .info-picture {
  float: left;
  height: 80px;
  width: 80px;
  /*background-color: pink;*/
}
.order-item-info .info-description {
  float: left;
  width: 200px;
  height: 80px;
  text-align: center;
}
.info-price {
  line-height: 80px;
  width: 180px;
}
.info-num {
  line-height: 80px;
  width :200px;
}
.info-status {
  line-height: 80px;
  width :180px;
}




</style>