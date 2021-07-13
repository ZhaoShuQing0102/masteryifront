<template>
    <el-container style="margin-left: 20%;width: 60%">
        <el-header height="250px">
            <div> <el-image
                style="width: 150px; height: 150px;border-radius: 50%; margin-top:50px;margin-left:20%;float: left"
                :src=user.userImgUrl
                :fit="fit">
            </el-image>
            </div>
            <div style="margin-top: 50px;float: left;margin-left: 10%">
                <h1>{{user.userName}}</h1>
                <h3 style="margin-top: 50px">-_- 欢迎您！！！</h3>
            </div>
        </el-header>
        <el-main>
            <div style="margin-top: 20px;margin-left: 20%;text-align: left">
                <h3>手机号：{{user.phoneNum}}</h3>
            </div>
            <div style="margin-top: 50px;margin-left: 20%;text-align: left">
                <h3>地址：{{user.address}}</h3>
            </div>
            <div style="margin-top: 50px;margin-left: 20%;text-align: left">
                <h3>消费：{{user.consumption}}</h3>
            </div>
            <div style="margin-top: 50px;margin-left: 20%;float:left">
                <el-button type="primary" icon="el-icon-edit" circle @click="open_edit">
                </el-button>
                修改个人信息
            </div>
            <div style="margin-top: 50px;margin-left: 10%;float:left">
                <router-link :to="'/order/'">
                <el-button type="primary" icon="el-icon-edit" circle>
                </el-button>
                查看个人订单
                </router-link>
            </div>
        </el-main>
        <el-main v-if="edit">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.user_pwd"></el-input>
                </el-form-item>
                <el-form-item label="新手机号">
                    <el-input v-model="form.phone_num"></el-input>
                </el-form-item>
                <el-form-item label="新地址">
                    <el-input v-model="form.user_address"></el-input>
                </el-form-item>
                <el-form-item label="新头像">
                    <el-input v-model="form.user_img"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="change_user_info">立即更改</el-button>
                    <el-button type="primary" @click="edit=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>

</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
    data() {
        return {
            userId:2,
            name: 1,
            user:'',
            edit:false,
            form:{
                user_name: '',
                user_pwd: '',
                phone_num: '',
                user_address: '',
                user_img:''
            }
        }
    },
    mounted() {
        axios.post("http://localhost:8083/user/getuser",Qs.stringify({userId:this.userId}))
            .then(res => {
                this.user = res.data.data;
                console.log(this.user);
            })
    },
    methods:{
        open_edit() {
            this.edit=true;
        },
        change_user_info(){
            axios.post("http://localhost:8083/user/changeuserinfo",
                Qs.stringify({userId:this.userId,
                                userName:this.form.user_name,
                                userPwd:this.form.user_pwd,
                                phoneNum:this.form.phone_num,
                                userAddress:this.form.user_address,
                                userImgUrl:this.form.user_img}))
            .then(res => {
                if(res.data.code==="200"){
                    this.$message({
                        type:"success",
                        message:"成功更改",
                        offset: 150
                    });
                    this.edit = false;
                }
            })
        }
    }
}
</script>
<style>
.mshow {
    width: 800px;
    height: 700px;
    background: #FFFFFF;
}
</style>