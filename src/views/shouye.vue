<template>
  <div class="shouye">

    <div class="nav" style="height:100px;width: 84%;margin-left: 8%;">
      <div class="yifont" style="float: left;height: 100px;width: 20%;margin-left: 3%;">
        <img src="../assets/image/yifont.png" alt="" style="width: 100%;height: 100%">
      </div>
      <div class="nav-serach" style="height: 100px;width: 40%;margin-left: 15%;float: left;">
        <SearchAllGoods style="margin-top: 20px" :key="new Date().getTime()"></SearchAllGoods>
      </div>
    </div>

    <!--    这里显示的是轮播图和轮播图左边的东西-->
    <div class="main-body" style="width: 84%;height: 500px;margin-left: 8%;margin-top: 4px;background-color: white">
      <!--      这里是左边的分类栏-->
      <div class="left-categories" style="width: 17%;height: 100%;float: left;">
        <div class="jutifenlei" style="width: 100%;height: 496px;margin-top: 0;">
          <div class="category" v-for="(item,index) in categorieslist"  @click="tocategories($event,item)"
               style="width: 100%;height: 10%;text-align: center;
                margin-top: 0;border-bottom: 1px solid #DDDDDD;cursor: pointer">
            <div class="category-item" style="width: 90%;height: 90%;margin-left: 5%;margin-bottom: 5%;">
              <div class="item-name" style="width: 100%;height: 100%;float: left;font-size: 1.2em;color: #666666;
                                              text-align: left;margin-left:15%;line-height: 250%;text-indent: 0.6em">
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--这是右边的轮播图-->
      <div class="slide-show" style="float: left;width: 82%;height: 100%;margin-left: 1%;">
        <el-carousel :interval="30000" arrow="always" height="500px">
          <el-carousel-item v-for="(item,index) in slidepicture" :key="index" >
            <el-image :src="item.idView" alt="这里是图片" fit="fill" style="height: 100%;width: 100%"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>


    <div class="secondkill" style="width: 84%;height: 260px;margin-left: 8%;margin-top: 20px">
<!--      <el-link href="javascript:void(0)">-->
      <div class="skbutton" @click="secondskillclick" style="cursor:pointer;width: 20%;height: 100%;float: left;background-image: url('https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png')">
        <div class="miaosha" style="width: 100%;height: 16%;background-color: #E1251B;padding-top: 14%;color: #ffffff;
                                     font-size: 2em;font-weight: 700;text-align: center">
          易大师秒杀
        </div>
        <div class="count-down" style="width: 100%;height: 20%;margin-top: 40%;color: #ffffff;text-indent: 4.5em;line-height: 100%">
          距结束
          <countdown :endTime="endTime" style="width: 100%;height: 60px;font-size: 1.6em;line-height: 60px;color: #ffffff;font-style: normal;
                                                text-indent: 1.8em;font-weight: 700 "></countdown>
        </div>
      </div>
<!--      </el-link>-->

      <div class="goods-info" style="width: 80%;height: 100%;float: left;background-color: white">
        <div v-for="(item,index) in secondkill_displaylist" :key="index" style="width: 22%;margin-left: 2%;height: 100%;float: left;border-right: 1px solid #DDDDDD;">
          <div class="goods-picture" style="height: 70%;width: 90%;margin-left: 5%;margin-top: 5%;">
            <img src="../assets/image/huawei.jpg" alt="" style="width: 100%;height: 100%">
<!--            <img :src="item.goodsCoverUrl" alt="" width="100%" height="100%">-->
          </div>
          <div style="height: 10%;width: 100%;margin-top: 2%;font-size: 14px;text-align: center;color: #333">
              {{item.goodsName}}
          </div>
          <div style="height: 10%;width: 100%;margin-top: 2%;">
            <div style="width: 60%;height: 100%;float: left;font-size: 16px;color: red;font-weight: 700;text-indent: 4em">
              {{'￥ '+item.newprice}}
            </div>
            <div style="width: 40%;height: 100%;font-size: 12px;float: left;color: #999;line-height: 200%;text-indent: 0;text-decoration: line-through">
              {{'￥ ' + item.oldprice}}
            </div>
          </div>
        </div>
      </div>
    </div>


    <div style="height: 65px;width: 84%;margin-left: 8%;margin-top: 15px;
                text-align: center;line-height: 65px;font-size: 28px;font-weight: 700;color: #333333">
      <div style="width: 7%;height: 100%;margin-left: 38%;float: left;background-image: url('http://qw7r9ly4i.hb-bkt.clouddn.com/101.png')"></div>
      <h4 style="height: 100%;width: 10%;float: left;">为你推荐</h4>
      <div style="width: 7%;height: 100%;float: left;background-image: url('http://qw7r9ly4i.hb-bkt.clouddn.com/101.png')"></div>
    </div>

    <div style="height: 60px;width: 84%;margin-left: 8%;margin-top: 15px;">
      <ul style="height: 60px;width: 90%;margin-left: 6%">
        <li style="height: 60px;width: 24%;float: left">
          <div style="border-right: 1px solid red;">
            <div style="height: 27px;margin-top: 6px;line-height: 27px;text-align: center;
                      font-size: 16px">
              精选
            </div>
            <div style="height: 21px;margin-bottom: 6px;line-height: 21px;text-align: center;
                       font-size: 14px;color: #999">
              猜你喜欢
            </div>
          </div>
        </li>
        <li style="height: 60px;width: 24%;float: left;">
          <div style="border-right: 1px solid red;">
            <div style="height: 27px;margin-top: 6px;line-height: 27px;text-align: center;
                      font-size: 16px">
              时尚达人
            </div>
            <div style="height: 21px;margin-bottom: 6px;line-height: 21px;text-align: center;
                       font-size: 14px;color: #999">
              美妆穿搭
            </div>
          </div>
        </li>
        <li style="height: 60px;width: 24%;float: left;">
          <div style="border-right: 1px solid red;">
            <div style="height: 27px;margin-top: 6px;line-height: 27px;text-align: center;
                      font-size: 16px">
              居家优品
            </div>
            <div style="height: 21px;margin-bottom: 6px;line-height: 21px;text-align: center;
                       font-size: 14px;color: #999">
              品质生活
            </div>
          </div>
        </li>
        <li style="height: 60px;width: 24%;float: left;">
          <div style="border-right: 2px solid red;">
            <div style="height: 27px;margin-top: 6px;line-height: 27px;text-align: center;
                      font-size: 16px">
              进口好物
            </div>
            <div style="height: 21px;margin-bottom: 6px;line-height: 21px;text-align: center;
                       font-size: 14px;color: #999">
              京东国际
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="recommend" style="overflow: auto;width: 84%;margin-left: 8%;">
      <ul style="width: 100%;overflow: auto">
        <li v-for="(item,index) in recommendlist" :key="index" style="width: 19%;height: 320px;margin-bottom: 10px;float: left;
                                                          margin-right: 1%;background-color: white" @click="goShop(item.goodsId)">
          <div style="width: 80%;height: 150px;margin: 30px auto 30px;cursor:pointer;">
            <img v-if="item.goodsCoverUrl==='null'||item.goodsCoverUrl===null" src="../assets/image/iphone.jpg" alt="" style="width: 100%;height: 100%">
            <img v-else :src="item.goodsCoverUrl" alt="" style="width: 100%;height: 100%">
          </div>
          <div style="height: 65px;width: 90%;margin-left: 5%;text-align: center;
                            font-weight: 400;line-height: 30px;cursor:pointer;">
            <h5 style="font-weight: 400;font-size: 18px">{{item.goodsName}}</h5>
            <h5 style="font-weight: 400;font-size: 16px">{{item.goodsInformation}}</h5>
          </div>
          <div style="height: 40px;width: 66%;margin-left: 17%;
                      text-align: left;line-height: 40px;color: #c81623;font-weight: 700;font-size: 1.2em">
            {{'￥' + item.lowPrice}}
          </div>
        </li>
      </ul>
    </div>


<!--    <el-button type="danger" @click="tocategories($event,'化妆品')">化妆品</el-button>-->
<!--    <el-button type="danger" @click="tocategories($event,'数码产品')">数码产品</el-button>-->
<!--    <el-button type="danger" @click="tocategories($event,'体育产品')">体育运动</el-button>-->
  </div>
</template>

<script>
import {post,get} from "@/utils/Network";
import countdown from "@/components/countdown";
import QS from "qs";
import SearchAllGoods from "@/components/SearchAllGoods";
export default {
  name: "shouye",
  components:{
    countdown,SearchAllGoods
  },
  data(){
    return{
      style1:"width: 22%;margin-left: 2%;height: 100%;float: left;border-right: 1px solid #DDDDDD;",
      style2:"width: 22%;margin-left: 2%;height: 100%;float: left;",
      categorieslist:[],//这是全部的大类
      slidepicture:[
        {id:0,idView:'http://qw7r9ly4i.hb-bkt.clouddn.com/121.jpg'},
        {id:1,idView:'http://qw7r9ly4i.hb-bkt.clouddn.com/122.jpg'},
        {id:2,idView:'http://qw7r9ly4i.hb-bkt.clouddn.com/123.jpg'},
        {id:3,idView:'http://qw7r9ly4i.hb-bkt.clouddn.com/124.jpg'}
      ],
      endTime:'2021-08-29 9:51:00',
      //秒杀接口展示的秒杀商品
      secondkill_displaylist:[],
      recommendlist:[]
    }
  },
  mounted() {
    this.initData()
    // this.getsecondskill_list()
    // this.getrecommendlist()
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
    secondskillclick(){
      // this.$emit('secondskillclick',1)
      this.$router.push({
        path:'/secondskill'
      })
    },
    tocategories(event,cname){
      this.$emit('tocategories',cname)
      this.$router.push({
        path:"/categories",
        query:{
          cname:cname
        }
      })
    },
    initData(){
      let templist1 = []
      post('/category/getallcategory')
      .then(res => {
        for(let i in res.data.data){
          templist1.push(i)
        }
        this.categorieslist = templist1
        let templist = []
        get('/seckill/getAllInfo')
            .then(res => {
              if(res.data.data.length <= 4) templist = res.data.data
              else{
                templist.push(res.data.data[0])
                templist.push(res.data.data[1])
                templist.push(res.data.data[2])
                templist.push(res.data.data[3])
                this.secondkill_displaylist = templist
              }
              let templist3 = []
              get('/goods/allGoods')
                  .then(res => {
                    templist3 = res.data.data
                    this.recommendlist = templist3
                    console.log("///")
                    console.log(this.recommendlist)
                  })
              // console.log(this.secondkill_displaylist)
            })
      })
    },
    getsecondskill_list(){
      let templist = []
      get('/seckill/getAllInfo')
      .then(res => {
        if(res.data.data.length <= 4) templist = res.data.data
        else{
          templist.push(res.data.data[0])
          templist.push(res.data.data[1])
          templist.push(res.data.data[2])
          templist.push(res.data.data[3])
          this.secondkill_displaylist = templist
        }
        // console.log(this.secondkill_displaylist)
      })
    },
    getrecommendlist(){
      let templist = []
      get('/goods/allGoods')
      .then(res => {
        templist = res.data.data
        this.recommendlist = templist
        console.log("///")
        console.log(this.recommendlist)
      })
    }
  }
}
</script>

<style scoped>
.category:hover {
  background-color: #D9D9D9 !important;
}
</style>