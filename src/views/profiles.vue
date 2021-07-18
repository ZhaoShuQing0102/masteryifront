<template>
  <div class="profiles" >
    <div class="nav" style="width: 100%;height: 80px;background-color: white">
      <div class="w" style="width: 84%;height: 80px;margin-left: 8%;">
        <div class="logo" style="width: 15%;height: 80px;float: left;">
          <img src="../assets/image/yifont.png" alt="" style="width: 100%;height: 100%">
        </div>
        <div style="height: 50%;width: 10%;float: left;margin-top: 35px;font-size: 1.4em;
                line-height: 170%;margin-left: 2%;">

        </div>
<!--        <div style="height: 50%;width: 10%;float: left;margin-top: 35px;font-size: 1.4em;-->
<!--                line-height: 170%;margin-left: 10%;">-->
<!--          首页-->
<!--        </div>-->
<!--        <div style="height: 50%;width: 10%;float: left;margin-top: 35px;font-size: 1.4em;-->
<!--                line-height: 170%;margin-left: 2%;">-->
<!--          账户信息-->
<!--        </div>-->
        <div style="height: 70%;width: 15%;float: right;font-size: 1.4em;
                line-height: 170%;margin-right: 8%;">
          <el-image
              style="width: 33%; height: 100%;border-radius: 50%;margin-top: 8%;"
              :src=user.userImgUrl
              :fit="fit">

          </el-image>
          <div style="float: right;line-height: 400%">{{form.user_name}}</div>
        </div>
      </div>
    </div>

    <div class="body" style="width: 84%;height: auto;overflow: auto;margin-left: 8%;">

      <div class="sub" style="width: 16%;height: auto;overflow: hidden;min-height: 1000px;margin-top: 10px;float: left;">
        <div class="menu" style="width: 90%;background-color: #FFFFFF;height: 100%;min-height: 1000px">
          <dl style="width: 80%;height: 150px;margin-bottom: 15px;margin-left: 10%;border-bottom: 1px solid #f3f3f3">
            <dt style="width: 100%;height: 50px;font-size: 20px;font-weight: 700;text-align: left;padding-top: 15px;">订单中心</dt>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="javascript:void (0)" @click="goOrder">我的订单</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">评价晒单</a>
            </dd>
          </dl>
          <dl style="width: 80%;height: 240px;margin-bottom: 15px;margin-left: 10%;border-bottom: 1px solid #f3f3f3">
            <dt style="width: 100%;height: 50px;font-size: 20px;font-weight: 700;text-align: left;padding-top: 15px;">我的钱包</dt>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">优惠券</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">红包</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">消费额</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">礼品卡</a>
            </dd>
          </dl>
          <dl style="width: 80%;height: 195px;margin-bottom: 15px;margin-left: 10%;border-bottom: 1px solid #f3f3f3">
            <dt style="width: 100%;height: 50px;font-size: 20px;font-weight: 700;text-align: left;padding-top: 15px;">我的收藏</dt>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <router-link :to="'/favorite/'">
                收藏商品
              </router-link>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">收藏店铺</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">其他收藏</a>
            </dd>
          </dl>
          <dl style="width: 80%;height: 285px;;margin-bottom: 15px;margin-left: 10%;border-bottom: 1px solid #f3f3f3">
            <dt style="width: 100%;height: 50px;font-size: 20px;font-weight: 700;text-align: left;padding-top: 15px;">活动与服务</dt>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">秒杀活动</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">我的回收单</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">我的预约</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">返修退货</a>
            </dd>
            <dd style="width: 100%;height: 45px;font-size: 16px;font-weight: 400;text-align: left;line-height: 45px">
              <a href="#">在线客服</a>
            </dd>
          </dl>
        </div>
      </div>

      <div class="main" style="width: 84%;height: auto;overflow: hidden;min-height: 1000px;margin-top: 10px;float: left;">
<!--        我的订单-->
        <div style="width: 68%;height: 100%;float: left;margin-right: 2%;min-height: 780px">
          <div style="width: 100%;height: 260px;border-bottom: 1px solid #DDDDDD;;background-color: #FFFFFF;padding-left: 20px">
            <div style="width: 100%;height: 60px;text-align: left;font-size: 20px;line-height: 60px">
              我的信息
              <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"
                         style="float:right;margin-top: 15px;margin-right: 15px "></el-button>
            </div>
            <div style="width: 30%;height: 200px;float: left;">
              <div style="width: 100%;height: 60px;font-size: 20px;text-align: left;line-height: 60px;margin-top: 10px;">
                手机号：<b>{{ user.phoneNum }}</b>
              </div>
              <div style="width: 100%;height: 60px;font-size: 20px;text-align: left;line-height: 60px;">
                地址：<b>{{ user.address }}</b>
              </div>
              <div style="width: 100%;height: 60px;font-size: 20px;text-align: left;line-height: 60px;">
                消费：<b><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-newbimoney"></use>
              </svg>{{ user.consumption }}</b>
              </div>
            </div>
            <div style="width: 20%;height: 50px;margin-top: 0px;float: left;">

            </div>
            <el-dialog title="收货地址" v-model="dialogFormVisible" width="30%">
              <el-form :model="form" :rules="rules" ref="form">
                <!--                <p style="color:RED">若无需改密码请保持下方内容</p>-->
                <el-form-item label="新密码" prop="user_pwd1">
                  <el-input type="password" autocomplete="false" v-model="form.user_pwd1"></el-input>
                </el-form-item>
                <el-form-item label="再次确认密码" prop="user_pwd2">
                  <el-input type="password" autocomplete="false" v-model="form.user_pwd2"></el-input>
                </el-form-item>
                <el-form-item label="新手机号" prop="phone_num">
                  <el-input v-model.number="form.phone_num"></el-input>
                </el-form-item>
                <el-form-item label="新地址">
                  <el-input v-model="form.user_address"></el-input>
                </el-form-item>
                <el-form-item label="新头像">
                  <!--                    <el-input v-model="form.user_img"></el-input>-->
                  <el-upload
                      class="avatar-uploader"
                      action="http://localhost:8083/image/upload"
                      :headers="header"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="change_user_info('form')">确 定</el-button>
                </span>
              </template>
            </el-dialog>
          </div>

          <div style="width: 100%;height: 60px;border-bottom: 1px solid #f0f3ef;margin-top: 11px;font-size: 20px;text-indent: 1em;line-height: 60px;text-align: left;;background-color: #FFFFFF">
            我的订单
          </div>
          <div style="width: 100%;height: 100px;background-color: #FFFFFF">
            <div style="cursor:pointer;width: 17%;height: 80px;float: left;margin-right: 2%;margin-left: 3%;margin-top: 10px;" @click="goOrder">
              <div style="width: 100%;height: 50%">
                <svg class="icon" aria-hidden="true" style="font-size: 48px">
                  <use xlink:href="#icon-daifukuan"></use>
                </svg>
              </div>
              <div style="width: 100%;height: 50%;line-height: 240%;text-align: center;">

                  待付款

              </div>
            </div>
            <div style="cursor:pointer;width: 17%;height: 80px;float: left;margin-right: 2%;margin-top: 10px;" @click="goOrder">
              <div style="width: 100%;height: 50%">
                <svg class="icon" aria-hidden="true" style="font-size: 48px">
                  <use xlink:href="#icon-ziyuan"></use>
                </svg>
              </div>
              <div style="width: 100%;height: 50%;line-height: 240%;text-align: center;">

                  待收货

              </div>
            </div>
            <div style="cursor:pointer;width: 17%;height: 80px;float: left;margin-right: 2%;margin-top: 10px;" @click="goOrder">
              <div style="width: 100%;height: 50%">
                <svg class="icon" aria-hidden="true" style="font-size: 48px">
                  <use xlink:href="#icon-pingjia-"></use>
                </svg>
              </div>
              <div style="width: 100%;height: 50%;line-height: 240%;text-align: center;">

                  待评价

              </div>
            </div>
            <div style="cursor:pointer;width: 17%;height: 80px;float: left;margin-right: 2%;margin-top: 10px;" @click="goOrder">
              <svg class="icon" aria-hidden="true" style="font-size: 48px">
                <use xlink:href="#icon-shouhou"></use>
              </svg>
              <div style="width: 100%;height: 50%;line-height: 135%;text-align: center;">

                  售后

              </div>
            </div>
            <div style="cursor:pointer;width: 17%;height: 80px;float: left;margin-right: 2%;margin-top: 10px;" @click="goOrder">
              <svg class="icon" aria-hidden="true" style="font-size: 48px;color: black">
                <use xlink:href="#icon-gengduo-a"></use>
              </svg>
              <div style="width: 100%;height: 50%;line-height: 135%;text-align: center;">

                  更多

              </div>
            </div>
          </div>

          <div style="width: 100%;height: 330px;">
            <div style="width: 80%;height: 60px;line-height: 60px;margin-left: 10%;margin-top: 50px;font-size: 16px">
              <svg class="icon" aria-hidden="true" style="font-size: 80px;margin-right: 20px">
                <use xlink:href="#icon-che"></use>
              </svg> 您买的东西太少了，快去挑选合适的商品吧！
            </div>
          </div>



        </div>
<!--左边部分结束了-->
<!--        右边部分-->
        <div style="width: 30%;height: 100%;float: left;min-height: 800px">

<!--          我的收藏-->
          <div style="width: 100%;height: 260px;">
            <div style="width: 100%;height: 100px;line-height: 100px;padding-left:15px;text-align: left;font-size: 1.2em;color: #333333;background-color: white">
              我的收藏
              <span style="margin-left: 30%">
                <svg class="icon" aria-hidden="true" style="font-size: 48px;margin-top: 10px" >
                  <use xlink:href="#icon-shoucang"></use>
                </svg>
              </span>
            </div>
            <div style="width: 100%;height: 160px;background-color: white;margin-top: 5px;">
              <div style="width: 28%;height: 120px;margin:20px 2%;float: left;">
                <div style="width: 100%;height: 50%;text-align: left;line-height: 300%;font-size: 20px;text-align: center">
                  {{collect_length}}
                </div>
                <div style="width: 100%;height: 50%;text-align: left;line-height: 300%;font-size: 20px;">
                  <router-link :to="'/favorite/'">商品收藏</router-link>
                </div>
              </div>
              <div style="width: 28%;height: 120px;margin:20px 2%;float: left;">
                <div style="width: 100%;height: 50%;text-align: left;line-height: 300%;font-size: 20px;text-align: center">
                  0
                </div>
                <div style="width: 100%;height: 50%;text-align: left;line-height: 300%;font-size: 20px;">
                  店铺收藏
                </div>
              </div>
              <div style="width: 28%;height: 120px;margin:20px 2%;float: left;">
                <div style="width: 100%;height: 50%;text-align: left;line-height: 300%;font-size: 20px;text-align: center">
                  0
                </div>
                <div style="width: 100%;height: 50%;text-align: left;line-height: 300%;font-size: 20px;">
                  收藏内容
                </div>
              </div>
            </div>
          </div>
<!--          我的收藏结束-->
<!--          常购清单-->
          <div style="width: 100%;height: 200px;margin-top: 25px">
            <div style="width: 100%;height: 60px;line-height: 60px;text-align: left;font-size: 1.2em;color: #333333;background-color: white">
              常购清单
            </div>
            <div style="width: 100%;height: 140px;background-color: white;margin-top: 5px;">
              <div style="width: 70%;height: 100%;float: left;margin:auto 5%;">
                <img src="http://qw7r9ly4i.hb-bkt.clouddn.com/xiaomi.jpg" alt="" style="width: 100%;height: 100%">
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import {get,post} from "@/utils/Network";
import Qs from "qs";

export default {
  name: "profiles",
  data(){
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.user_pwd1 !== '') {
          this.$refs.form.validateField('user_pwd2');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.user_pwd1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userId: 2,
      name: 1,
      user: '',
      edit: false,
      collect_length:'',
      form: {
        user_name: '',
        user_pwd1: '',
        user_pwd2: '',
        phone_num: '',
        user_address: '',
        user_img: ''
      },
      header:{
        'token':window.localStorage.getItem('token')
      },
      imageUrl: '',
      dialogFormVisible:false,
      rules: {
        user_name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone_num: [
          //待添加手机号验证规则
        ],
        user_pwd1: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        user_pwd2: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    post("/user/getuser", Qs.stringify({}))
        .then(res => {
          this.user = res.data.data;
          // console.log(this.user);
          this.form.user_name=this.user.userName;
          this.form.user_pwd1=this.user.userPwd;
          this.form.user_pwd2=this.user.userPwd;
          this.form.phone_num=this.user.phoneNum;
          this.form.user_address=this.user.address;
          this.form.user_img=this.user.userImgUrl;

          post('/collect/showmycollect')
          .then(res2 => {
            console.log('///')
            console.log(res2.data.data)
            this.collect_length = res2.data.data.length
          })
        })
  },
  methods:{
    change_user_info(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          post("/user/changeuserinfo",
              Qs.stringify({
                //userId: this.userId,
                userName: this.form.user_name,
                userPwd: this.form.user_pwd2,
                phoneNum: this.form.phone_num,
                userAddress: this.form.user_address,
                userImgUrl: this.form.user_img
              }))
        }
      })
    },
    goOrder(){
      this.$router.push({path:'/order'})
    },
    handleAvatarSuccess(res, file) {
      this.user.userImgUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isLt2M;
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>