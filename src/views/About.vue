<template>
  <div class="about">
    <el-container>
      <el-aside width="30%">
      <el-col :span="25" style="float: left; margin-top: 5%;margin-left: 75%">
        <h3 @click="name=1">我的个人中心</h3>
        <el-menu
            :uniqueOpened="true"
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#303133">
          <el-menu-item-group>
            <el-menu-item index="1" @click="name=2">个人信息</el-menu-item>
            <el-menu-item index="2" @click="name=3">修改密码</el-menu-item>
            <el-menu-item index="3" @click="name=4">收货地址</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
      </el-aside>
      <el-main>
      <div class="mshow name1" v-if="name===1" style="margin-top: 2%;">
        <div class="name1-head" style="height: 30%; width: 100%;">

        </div>
        <el-divider></el-divider>
        <div class="first" style="float: left;margin-top: 10%;width: 100%">
        <div class="my-pay" style="float: left; margin-left: 10%;">
          <h4>待支付的订单： 0</h4>
        </div>
        <div class="look-my-pay" style=" margin-left: 60%;">
          <h4>查看待支付的订单></h4>
        </div>
        </div>
        <div class="second" style="float: left;margin-top: 10%;width: 100%">
          <div class="my-goods" style="float: left; margin-left: 10%;">
            <h4>待收货的订单： 0</h4>
          </div>
          <div class="look-my-goods" style=" margin-left: 60%;">
            <h4>查看待收货的订单></h4>
          </div>
        </div>
        <div class="third" style="float: left;margin-top: 10%;width: 100%">
          <div class="my-comment" style="float: left; margin-left: 10%;">
            <h4>待评价的订单： 0</h4>
          </div>
          <div class="look-my-comment" style=" margin-left: 60%;">
            <h4>查看待评价的订单></h4>
          </div>
        </div>
        <div class="forth" style="float: left;margin-top: 10%;width: 100%">
          <div class="my-comment" style="float: left; margin-left: 10%;">
            <h4>待收藏的订单： 0</h4>
          </div>
          <div class="look-my-comment" style=" margin-left: 60%;">
            <h4>查看待收藏的订单></h4>
          </div>
        </div>
      </div>
      <div class="mshow name2" v-if="name===2" style="margin-top: 2%;border-top:1px solid #FFFFFF;border-left:1px solid #FFFFFF;">
        <div class="name2-head" style="margin-top:5%;float: left;margin-left: 5%;">
           <h3>个人信息</h3>
        </div>
        <div class="headshot" style="float:left;margin-top: 10%;margin-left:15%;clear: both">
             <h4>头像:</h4>
        </div>
        <div class="nick-name" style="float:left;margin-top: 10%;margin-left:15%;clear: both">
             <h4>昵称:jkl</h4>
        </div>
        <div class="sex" style="float:left;margin-top: 10%;margin-left:15%;clear: both">
             <h4>性别:jkl</h4>
        </div>
        <div class="signature" style="float:left;margin-top: 10%;margin-left:15%;clear: both">
          <h4>个性签名:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h4>
        </div>
        <div class="phone-num" style="float:left;margin-top: 10%;margin-left:15%;clear: both">
          <h4>手机号:xxxxxxxx</h4>
        </div>
        <div class="edit" style="float:left;margin-top: 10%;margin-left:50%;clear: both">
        <el-button size="medium" type="warning">编辑</el-button>
        </div>
      </div>
    <div v-else-if="name==3">
      789
    </div>
    <div class="mshow name2" v-else-if="name==4" style="margin-top: 2%;border-top:1px solid #FFFFFF;border-left:1px solid #FFFFFF;">
        <div class="name3-head" style="width: 100%;height: 15%;">

        </div>
      <el-divider></el-divider>
      <div class="name3-body" style="width: 100%;height: 35%;">

      </div>
      <el-divider></el-divider>
    </div>
  </el-main>
  </el-container>
  </div>
</template>
<script>
   export default {
     data() {
       return {
         name: 1
       }
     }
   }
</script>
<style>
   .mshow{
     width: 800px;
     height: 700px;
     background: #FFFFFF;
   }
</style>