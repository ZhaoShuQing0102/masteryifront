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
        <countdown :endTime="endTime" style="width: 100%;height: 80px;font-size: 16px;line-height: 80px;color: #ffffff;font-style: normal"></countdown>
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
          <div class="rush-purchase" style="width: 75%;height: 35px;background-color: #D9001B;margin-top: 5px;margin-left: 10px;">
            <span style="width: 100%;height: 35px;line-height: 35px;text-align: center;font-size: 20px;color: white;
                          padding-left: 20%;cursor: pointer" @click="topurchase" >
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
      endTime:'2021-08-29 9:51:00'
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
    this.getsecondskill(this.id)
  },
  methods:{
    getsecondskill(userId){
      //本来应该请求秒杀的。但是这里先请求一下收藏
      get('/seckill/getAllInfo')
          .then(res => {
            // console.log(res.data.data)
            let list_temp = res.data.data
            this.secondskill_list = list_temp
          })
    },
    topurchase(){

    }
  }
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