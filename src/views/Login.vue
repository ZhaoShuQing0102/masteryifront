<template>
      <div class="Login" style="float:left; margin-left: 20%; margin-top: 4%;width: 60%;height:64vh;">
          <div class="login-ui" v-if="name===2" style="float: left; margin-left: 5%">
               <div class="l-logo" style="float: left; margin-left: 9%; margin-top: 15%">
                 <img src="../assets/images/back.png" style="width: 400px; height: 200px"/>
               </div>
               <div class="l-input">
                 <div class="l-head" style="float: left; margin-top: 5%; margin-left: 45%">
                   <h2>注册</h2>
                 </div>
                 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="float: left;margin-top: 8%;margin-left: 7%">
                   <el-form-item label="用户名:" prop="username">
                     <el-input v-model="ruleForm.username"></el-input>
                   </el-form-item>
                   <el-form-item label="密码:" prop="pass">
                     <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="确认密码:" prop="checkPass">
                     <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="手机号:" prop="number">
                     <el-input v-model.number="ruleForm.number"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" @click="submitForm">注册</el-button>
                   </el-form-item>
                 </el-form>
                 <div @click="name=1" class="register" style="float: left;margin-left: 8%;">
                   <h4>马上登录</h4>
                 </div>
                 <div @click="name=3" class="findps" style="float: left;margin-left: 50%;">
                   <h4>忘记密码</h4>
                 </div>
               </div>
          </div>
          <div class="register-ui" v-if="name===1" style="float:left; margin-left: 5%">
            <div class="r-logo" style="float: left; margin-left: 9%; margin-top: 15%">
              <img src="../assets/images/back.png" style="width: 400px; height: 200px"/>
            </div>
            <div class="r-input">
              <div class="rhead" style="float: left; margin-top: 5%; margin-left: 45%">
                <h2>登录</h2>
              </div>
              <el-form :model="LoginMsg" status-icon :rules="rules" ref="LoginMsg" label-width="80px" class="demo-login" style="float: left;margin-top: 15%;margin-left: 3%">
                <el-form-item label="账号:" prop="Username">
                  <el-input v-model="LoginMsg.Username"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="Pass">
                  <el-input type="password" v-model="LoginMsg.Pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitMsg('LoginMsg')">登录</el-button>
                </el-form-item>
              </el-form>
              <div @click="name=2" class="register" style="float: left;margin-left: 8%;margin-top: 5%">
                <h4>立即注册</h4>
              </div>
              <div @click="name=3" class="findps" style="float: left;margin-left: 50%;margin-top: 5%">
                <h4>忘记密码</h4>
              </div>
          </div>
          </div>
      </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Qs from "qs";
import axios from "axios";
import {post} from "@/utils/Network";

export default defineComponent({
  data() {
    let checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        else {
          callback();
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validatePass3 = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      name: 1,
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
        number: '',
        Lkey: false,
        Rkey: false
      },
      LoginMsg: {
        Username: '',
        Pass: ''
      },
      rules: {
        pass: [
          {required:true,message:'不能为空',trigger: 'change'},
          {pattern: /^[a-zA-Z_]\w{6,14}$/, message: '字母开头的7-15位数字、字母或下划线', trigger: 'change'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'change'}
        ],
        number: [
          {validator: checkNum, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '不能为空', trigger: 'change'},
          {pattern: /^[0-9a-zA-Z]{7,15}$/, message: '账号只能由7-15位的数字和字母组成', trigger: 'change'}
        ],
        Username: [
          {required: true, message: '不能为空', trigger: 'change'},
        ],
        Pass: [
          {validator: validatePass3, trigger: 'change'}
        ]
      },
    }
  },
  methods: {
    submitForm() {
      post("/user/addUser", Qs.stringify({
        username: this.ruleForm.username,
        password: this.ruleForm.pass
      }))
          .then(res => {
            this.Rkey = res.data.data;
            console.log(res.data)
            if (this.Rkey === true) {
              this.$alert('注册成功', {
                confirmButtonText: '确定'
              })
            }
            if (this.Rkey === false) {
              this.$alert('注册失败', {
                confirmButtonText: '确定'
              })
            }
          })

    },
    submitMsg(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        post("/login/comfirm", Qs.stringify({
          username: this.LoginMsg.Username,
          password: this.LoginMsg.Pass
        }))
            .then(res => {
              window.localStorage.setItem("token",res.data.token)
              console.log(res.data.token)
              if (res.data.token !== null) {
                this.$store.commit('changeLogin')
                this.$alert('登录成功', {
                  confirmButtonText: '确定',

                }).then(() => {
                  this.$router.push({path: '/'})
                })
              } else {
                this.Lkey = false;
                this.$message({
                  type: 'warning',
                  message: '不能为空'
                })
              }
            })

      })
    }
  }
})

</script>


<style scoped>


.login-ui{
  background: #FFFFFF;
  border: 10px;
  width: 1000px;
  height: 500px;
}
.l-input{
  float: left;
  margin-top: 5%;
  margin-left: 10%;
  width: 400px;
  height: 420px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.register-ui {
  background: #FFFFFF;
  border: 10px;
  width: 1000px;
  height: 450px;
}
.r-input {
  float: left;
  margin-top: 5%;
  margin-left: 10%;
  width: 350px;
  height: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>