<template>
  <div class="cart" style="background-color: #FFFFFF;border-top:1px solid #FFFFFF;border-left:1px solid #FFFFFF;">
     <div class="cart-logo" style="float:left;margin-left: 15%;margin-top: 1%;clear: both">
       <img src="../assets/images/back.png" style="width: 110px; height: 60px">
     </div>
     <div class="cart-head" style="float: left;margin-left:16%;margin-top:2%;clear:both">
       <h3>全部商品</h3>
     </div>
    <el-divider style="margin-top: 8%;margin-left: 10%;margin-right: 10%"></el-divider>
    <div class="cart-body-head">
      <div class="operation" style=" float: left;margin-left: 16%">
        <input type = "checkbox"/>
      </div>
      <div style="float: left">
        <h4>全选</h4>
      </div>
      <div class="cart-msg" style="float: left;margin-left: 5%">
        <h4>商品信息</h4>
      </div>
      <div class="cart-cost" style="float: left;margin-left: 27%">
        <h4>单价</h4>
      </div>
      <div class="cart-num" style="float: left;margin-left: 7%">
        <h4>数量</h4>
      </div>
      <div class="cart-money" style="float: left;margin-left: 7%">
        <h4>金额</h4>
      </div>
      <div class="cart-operation" style="float: left;margin-left: 8.5%">
        <h4>操作</h4>
      </div>
    </div>
    <div class="cart-body" v-for="item in goods" :key="item.goodsId">
        <div class="cartlist" style="margin-top:3%;margin-left:14%;margin-right:10%;background-color: beige;height: 200px">
            <div class="chose" style="float: left;margin-left: 4%;margin-top: 8%">
              <input type = "checkbox"/>
            </div>
            <div class="chose-img" style="float: left;margin-left: 5%; margin-top: 2%">
              <img src="../assets/images/1.jpg"/>
            </div>
            <div class="chose-msg" style="float:left; margin-top: 3%;margin-left: 10%;width: 80px">
              {{item.goodsName}}篮球服套装定制男大学生比赛运动团购队服黑金色球衣篮球男透气潮
            </div>
            <div class="chose-cost" style="float:left; margin-top: 5%;margin-left: 11.5%">
              {{item.lowPrice}}￥
            </div>
            <div class="chose-num" style="float:left; margin-top: 5%; margin-left: 7%">
              <button style="width: 20px">-</button>
              <input type="text" style="width:30px"/>
              <button style="width: 20px">+</button>
            </div>
            <div class="chose-money" style="float: left;margin-top: 5%; margin-left: 8.5%">
              580￥
            </div>
            <div class="chose-operation" style="float: left; margin-top: 5%; margin-left: 8%">
              <h4>移入收藏夹</h4>
              <br/>
              <h4>删除</h4>
            </div>
        </div>
    </div>
    <div class="cart-footer" style="background-color: darkgrey;height: 50px;margin-left: 14%;margin-right: 10%">
       <div class="already-chose" style="float: right; margin-right: 30%;margin-top: 1%">
         <h4>已选商品0件</h4>
       </div>
      <div class="already-chose" style="float: left;margin-left:2%;margin-top: 1%">
        <h4>合计：0￥</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  name: "ShopCart",
  data() {
    return {
      radio:'1',
      goods:[

      ],
    }
  },
  mounted() {
    axios.get("http://localhost:8080/goods/allGoods")
        .then(res => {
          this.goods = res.data.data;
          console.log(res.data);
        })
  },
}

</script>

<style scoped lang="scss">
.cart-body {
  border-top:1px solid #FFFFFF;
  border-left:1px solid #FFFFFF;
}


</style>