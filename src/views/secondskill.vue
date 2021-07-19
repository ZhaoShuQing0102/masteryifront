<template>
  <div class="seconds-kill">

    <div class="nav" style="height:100px;border-bottom: 1px solid #DDDDDD;width: 84%;margin-left: 8%;">
      <div class="yifont" style="float: left;height: 100px;width: 20%;margin-left: 3%;">
        <img src="../assets/image/yifont.png" alt="" style="width: 100%;height: 100%">
      </div>
      <div class="nav-serach" style="height: 100px;width: 40%;margin-left: 15%;float: left;">
        <SearchAllGoods style="margin-top: 20px"></SearchAllGoods>
      </div>
    </div>

    <div class="secondskill-nav" style="width: 84%;height: 80px;background-color: #D9001B;margin:auto;">
      <div class="now-kill" style="height: 80px;width: 20%;float: left;margin-left: 6%;text-align: center;">
        <span style="width: 100%;height: 80px;font-size: 28px;color: rgb(255,255,255);font-family: '卿本佳人by落落 Bold';font-weight: 700;
                      text-align: center;line-height: 80px">
          正在秒杀
        </span>
      </div>
      <div class="count-down-font" style="width: 15%;height: 80px;float: left;margin-left: 30px;text-align: center">
        <span style="width:100%;height: 80px;font-size: 16px;line-height: 80px;color: #ffffff;font-style: normal">
          距结束
        </span>
      </div >
      <div style="width: 15%;height: 80px;float: left;margin-left: 4%;text-align: center">
        <countdown :endTime="endTime" ref="retime" style="width: 100%;height: 80px;font-size: 16px;line-height: 80px;color: #ffffff;font-style: normal"></countdown>
      </div>
    </div>

    <div class="secondskill-body" style="overflow: auto;width: 84%;margin-left: 8%;">
      <ul style="overflow: auto;margin-left: 5%;margin-top: 30px;min-height: 300px">
        <li v-for="(item,index) in secondskill_list" :key="index"
            style="width: 18%;height: 240px;
            margin-right: 2%;margin-bottom: 14px;float: left;position: relative">

          <div class="goods-info" style="width: 100%;height: 170px;">
            <div class="goods-img" style="height: 150px;width: 100%">
              <img src="../assets/image/huawei.jpg" alt="" style="width: 100%;height: 150px">
            </div>
            <div class="goods-name" style="height: 15px;width: 100%;
                                    margin-top: 5px;line-height: 15px;text-align: center">
              {{item.goodsName}}
            </div>
          </div>
          <div class="goods-price" style="width: 100%;height: 25px;margin-top: 5px;">
            <div class="now-price" style="width: 50%;height: 25px;text-align: center;line-height: 25px;
                                           background-color: #D9001B;color: rgb(255,255,255);font-style: normal;
                                            font-size: 18px;font-family: 'Arial Normal';float: left;margin-left: 20px;
                                            ;">
                {{item.newprice + '元'}}
            </div>
            <div class="old-price" style="height: 25px;width: 26%;text-align: left;line-height: 25px;
                                           color: #7F7F7F;font-size: 16px;padding: 2px;text-decoration:line-through;
                                            float: left;">
                {{item.oldprice}}
            </div>
          </div>
          <div class="inventory" style="height: 15px;width: 80%;line-height: 15px;text-align: center;font-size: 10px;
                                         font-style: normal;font-weight: 400;color: #D9001B">
            {{'库存剩余' + item.stock+ '件'}}
          </div>
          <div class="rush-purchase" v-if="clickstatus === 1" style="width: 75%;height: 35px;background-color: #D9001B;margin-top: 5px;margin-left: 10px;">
            <span style="width: 100%;height: 35px;line-height: 35px;text-align: center;font-size: 20px;color: white;
                          padding-left: 20%;cursor: pointer" @click="topurchase(item.goodsId)" >
              立即抢购
            </span>
          </div>
          <div v-else class="rush-purchase-disa" style="width: 75%;height: 35px;background-color: gray;margin-top: 5px;margin-left: 10px;">
            <span style="width: 100%;height: 35px;line-height: 35px;text-align: center;font-size: 20px;color: white;
                          padding-left: 20%;cursor: not-allowed"  >
              立即抢购
            </span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
// import  MvCountDown from 'mv-count-down'
import {post,get} from "@/utils/Network";
import QS from "qs";
import * as math from "mathjs";
import countdown from "@/components/countdown";
import SearchAllGoods from "@/components/SearchAllGoods";
import moment from "moment"
import router from "../router";
import Qs from "qs";


export default {
  name: "secondskill",
  components:{
    SearchAllGoods,
    countdown
  },
  data(){
    return{
      secondskill_list:[],
      id:1,
      endTime:'',
      clickstatus:1
    }
  },
  computed:{
    randominventory(){
      let rannum = math.round(math.random()*(200-100)+100)
      // console.log(rannum)
      return rannum
    },
  },
  mounted() {
    this.getsecondskill()
  },
  methods:{
    getsecondskill(){
      get('/seckill/getAllInfo')
          .then(res => {
            // console.log(res.data.data)
            let list_temp = res.data.data
            this.secondskill_list = list_temp
            console.log("///开始时间")
            console.log(res.data.data[0].bdate)
            let bdatetemp = res.data.data[0].bdate
            console.log("///结束时间")
            console.log(res.data.data[0].edate)
            let edatetemp = res.data.data[0].edate
            console.log("///现在时间")
            let nowtime2 = new Date()
            let nowtime = Date.parse(nowtime2)
            nowtime = nowtime/1000
            console.log(nowtime)
            if(nowtime < bdatetemp || nowtime > edatetemp) {
              this.clickstatus = 0
              // router.go(0)
            }
            else this.clickstatus = 1
            // let temp2 = new Date(bdatetemp * 1000).toLocaleString()
            // console.log(temp2)
            // console.log(moment(String(edatetemp)).format('YYYY/MM/DD hh:mm:ss'))
            let temp5 = new Date(edatetemp*1000)
            console.log("///")
            console.log(temp5)
            console.log(moment(temp5).format('YYYY/MM/DD HH:mm:ss'))
            this.endTime = moment(temp5).format('YYYY/MM/DD HH:mm:ss')
          })

      // console.log(moment(nowtime).format('YYYY/MM/DD hh:mm:ss'))
      // console.log(moment(nowtime).valueOf())

      // if
      // console.log(timetemp)
    },
    topurchase(id){
      post("/seckill/comfirm",QS.stringify({prodid:id})).then(res=>{
        if(res.data.code===200){
          this.$router.push({
            path:'/payfororder',
            query:{
              order_id:res.data.data.order_id
            }
          })
        }
        else if(res.data.code===99){
          this.$message({
            type:'error',
            message:'该商品已抢空'
          })
        }
        else if(res.data.code===100){
          this.$message({
            type:'error',
            message:'您已抢购过该商品'
          })
        }
        else if(res.data.code===101){
          this.$message({
            type:'error',
            message:'服务器异常'
          })
        }
      })
    }
  },
}
</script>

<style scoped>
.seconds-kill {

  /*background-image: url("../assets/image/miaoshabg.jpg");*/
}
.rush-purchase:hover {
  background-color: #ff4400!important;
}
</style>