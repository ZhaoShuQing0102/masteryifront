<template>
  <div class="about">
    <el-row class="tac" style="position: absolute; margin-top: 20px;margin-left: 280px;">
      <el-col :span="12">
        <h3>我的个人中心</h3>
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
    </el-row>
      <div class="mshow name1" v-if="name==1" style="position: absolute ; margin-top: 40px; margin-left: 530px">
        <div class="name1-head" style="height: 30%; width: 100%;">

        </div>
        <el-divider></el-divider>
      </div>
      <div class="mshow" v-if="name==2" style="position: absolute ; margin-top: 40px; margin-left: 530px">
        <div class="mname" style="position: absolute; margin-top: 30px; margin-left: 20px">
           <h3>个人信息</h3>
        </div>
        <div class="headshot" style="position: absolute ; margin-top: 80px; margin-left: 100px">
             <h4>头像:</h4>
        </div>
        <div class="nick-name" style="position: absolute ; margin-top: 200px; margin-left: 100px">
             <h4>昵称:jkl</h4>
        </div>
        <div class="sex" style="position: absolute ; margin-top: 280px; margin-left: 100px">
             <h4>性别:jkl</h4>
        </div>
        <div class="signature" style="position: absolute ; margin-top: 360px; margin-left: 100px">
          <h4>个性签名:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h4>
        </div>
        <div class="phone-num" style="position: absolute ; margin-top: 440px; margin-left: 100px">
          <h4>手机号:xxxxxxxx</h4>
        </div>
        <div class="edit" style="position: absolute ; margin-top: 520px; margin-left: 370px">
        <el-button size="medium" type="warning">编辑</el-button>
        </div>
      </div>
    <div v-else-if="name==3">
      789
    </div>
    <div v-else-if="name==4">
      123
    </div>
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
     height: 600px;
     background: #FFFFFF;
   }
</style>