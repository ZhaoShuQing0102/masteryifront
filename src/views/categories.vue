<template>
  <div class="categories" style="min-height: 1200px">

    <div class="nav" style="height:100px;border-bottom: 1px solid #DDDDDD;width: 84%;margin-left: 8%;">
      <div class="yifont" style="float: left;height: 100px;width: 20%;margin-left: 3%;">
        <img src="../assets/image/yifont.png" alt="" style="width: 100%;height: 100%">
      </div>
      <div class="nav-serach" style="height: 100px;width: 40%;margin-left: 15%;float: left;">
        <SearchAllGoods style="margin-top: 20px"></SearchAllGoods>
      </div>
    </div>

<!--    这里显示的是轮播图和轮播图左边的东西-->
    <div class="main-body" style="width: 84%;height: 500px;margin-left: 8%;">
<!--      这里是左边的分类栏-->
      <div class="left-categories" style="width: 18%;height: 100%;float: left">
        <h3 class="biaoti" style="height: 40px;width: 100%;background-color: #e33233;color: #ffffff;
                                  line-height: 40px;text-align: center;font-size: 1.17em;padding-left: 0;text-indent: 0;">
          {{cname + '分类'}}
        </h3>
        <div class="jutifenlei" style="width: 100%;height: 458px;margin-top: 2px">
          <div class="category" v-for="(item,index) in list"  style="width: 100%;height: 20%;
                                                      margin-top: 1%;border-bottom: rgb(228, 229, 234)">
            <div class="category-item" style="width: 90%;height: 90%;margin-left: 5%;margin-bottom: 5%;border-bottom: 1px solid #DDDDDD;">
              <div class="item-icon" style="width: 40%;height: 100%;float: left;">
<!--                这里是图标-->
                <img v-if="cname === '化妆品'" src="../assets/image/10.jpg" alt="" style="height: 100%;width: 100%">
                <img v-else-if="cname === '数码产品'"  src="../assets/image/huawei.jpg" alt="" style="height: 100%;width: 100%">
                <img v-else-if="cname === '日用品'"  src="../assets/image/riyongpin.jpg" alt="" style="height: 100%;width: 100%">
                <img v-else-if="cname === '生鲜'"  src="../assets/image/shengxian.jpg" alt="" style="height: 100%;width: 100%">
                <img v-else-if="cname === '体育运动'"  src="../assets/image/tiyu.jpg" alt="" style="height: 100%;width: 100%">
                <img v-else-if="cname === '流行服饰'"  src="../assets/image/yifu.jpg" alt="" style="height: 100%;width: 100%">
              </div>
              <div class="item-name" style="width: 60%;height: 100%;float: left;font-size: 1.2em;color: #666666;
                                              text-align: left;line-height: 400%;text-indent: 0.6em">
                {{item.categoryName}}
              </div>
            </div>
          </div>
        </div>
      </div>
<!--这是右边的轮播图-->
      <div class="slide-show" style="float: left;width: 81%;height: 100%;margin-left: 1%;">
        <el-carousel :interval="30000" arrow="always" height="500px">
          <el-carousel-item v-for="(item,index) in slidepicture" :key="index" >
            <el-image :src="item.idView" alt="这里是图片" fit="fill" style="width: 940px;height: 500px"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="below-main" style="width: 84%;height: 50px;margin-left: 10%;margin-top: 20px;
                                  background-image: url('https://img13.360buyimg.com/aotucms/jfs/t1/30073/11/1518/5252/5c4ecb46E9b68f6be/d50b95e60c885a4a.png')">
    </div>
    <div class="below-goods" style="height: 410px;width: 84%;margin-left: 8%;">

      <div class="goods-head" style="height: 55px;width: 100%;overflow: auto;margin-bottom: 5px;border: 1px solid #f2f2f2">
        <ul style="height: 100%;width: 100%;overflow: auto">
          <li v-for="(item,index) in list" :key="index" style="height: 100%;width: 15%;margin-left: 2%;cursor: pointer;
                                                          float: left;" @mouseover="checkcategory(item)" class="categoryhead">
              <div style="width: 70%;padding-left: 20%;height: 30px;margin-top: 6px;margin-left: 10%;padding-top: 10%;
                           line-height: 100%;font-size: 1.1em;font-family: Microsoft YaHei, tahoma;" >
                {{item.categoryName}}
              </div>
          </li>
        </ul>
      </div>

      <div class="goods-item" style="width: 100%;height: 350px;">
        <ul style="height: 100%;width: 100%;overflow: auto;min-height: 400px">
          <li v-for="(item,index) in goodslist" :key="index" style="cursor:pointer;height: 350px;
          width: 25%;float: left;border: 1px solid #f2f2f2;background-color: white;margin-right: 10px;margin-top: 10px"
          @click="goShop(item.goodsId)">

            <div class="goods-info" style="width: 100%;height: 305px;">
              <div class="goods-img" style="height: 280px;width: 90%;margin-left: 5%;">
                <img v-if="item.goodsCoverUrl==='null'||item.goodsCoverUrl===null" src="../assets/image/huawei.jpg" alt="" style="width: 100%;height: 100%;margin-top: 10px">
                <img v-else :src="item.goodsCoverUrl" alt="" style="width: 100%;height: 100%;margin-top: 10px">

              </div>
              <div class="goods-name" style="height: 20px;width: 100%;
                                    margin-top: 15px;line-height: 20px;text-align: center;font-size: 1.2em;">
                <h5>{{item.goodsName + ' ' +item.goodsInformation}}</h5>
<!--                <h5>{{item.goodsInformation}}</h5>-->
              </div>
            </div>
            <div class="goods-price" style="width: 100%;height:45px;text-align: center;line-height: 45px;font-size: 18px;
                                            color: rgb(221, 69, 69)">
              {{'￥' + item.lowPrice}}
            </div>

          </li>
        </ul>
      </div>

    </div>



  </div>
</template>

<script>
import {post} from "@/utils/Network";
import QS from "qs";
import * as math from 'mathjs';
import $ from "jquery";
import SearchGoodByType from "@/components/SearchGoodByType";
import SearchAllGoods from "@/components/SearchAllGoods";
export default {
  name: "categories",
  components: {SearchAllGoods, SearchGoodByType},
  data(){
    return{
      parent_category_id:101,
      cname:'',
      //这个是一个大类下面所有的子类列表
      list:[],
      slidepicture:[
        {id:0,idView:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {id:1,idView:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {id:2,idView:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
        {id:3,idView:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
      ],
      //这个是每个子类下面的商品
      goodslist:[],
      // fenlei_head_color
    }
  },
  computed:{
  },
  mounted() {
    this.getcname()
    this.getcategories()
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
    getcname(){
      this.cname = this.$route.query.cname
      // if(this.cname == '化妆品') this.fenlei_head_color = 'red'
      // console.log(this.cname)
    },
    getcategories(){
      let templist = []
      post('/category/getallcategory')
      .then(res => {
        let cnametemp = this.cname
        console.log(res.data.data[cnametemp])
        templist = res.data.data[cnametemp]
        this.list = templist
        post('/goods/categoryGoods',QS.stringify({category_id:templist[0].categoryId}))
            .then(res => {
              let listtemp = res.data.data
              let temp = []
              if(listtemp.length <= 5)  temp = listtemp
              else {
                temp.push(listtemp[1])
                temp.push(listtemp[2])
                temp.push(listtemp[3])
                temp.push(listtemp[4])
                temp.push(listtemp[5])
              }
              this.goodslist = temp
            })
      })
    },
    checkcategory(item){
      post('/goods/categoryGoods',QS.stringify({category_id:item.categoryId}))
      .then(res => {
        let listtemp = res.data.data
        let temp = []
        if(listtemp.length <= 5)  temp = listtemp
        else {
          temp.push(listtemp[1])
          temp.push(listtemp[2])
          temp.push(listtemp[3])
          temp.push(listtemp[4])
          temp.push(listtemp[5])
        }
        this.goodslist = temp
      })
    }
  }
}
</script>

<style scoped>
h5 {
  font-weight: 400;
}
.categoryhead{
  transition:background-color 0.3s;
}
.categoryhead:hover {

  background-color: rgb(221, 69, 69);
}
</style>