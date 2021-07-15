<template>
    <div style="margin-left: 20%;width: 60%;height: 80vh;background-color: #FFFFFF">
        <div width="100%">
            <div>
                <el-image
                    style="width: 150px; height: 150px;border-radius: 50%; margin-top:50px;margin-left:30%;float: left"
                    :src=user.userImgUrl
                    :fit="fit">
                </el-image>
            </div>
            <div style="margin-top: 50px;float: left;margin-left: 10%">
                <h1>{{ user.userName }}</h1>
                <h3 style="margin-top: 50px">-_- 欢迎您！！！</h3>
            </div>
        </div>
        <div style="margin-left: 40%;float:left;clear: both">
            <div style="margin-top: 50px;text-align: left">
                <h3>手机号：{{ user.phoneNum }}</h3>
            </div>
            <div style="margin-top: 30px;text-align: left">
                <h3>地址：{{ user.address }}</h3>
            </div>
            <div style="margin-top: 30px;text-align: left">
                <h3>消费：{{ user.consumption }}</h3>
            </div>
        </div>
        <div>
            <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"
                       style="float:left; margin-left: 50px;margin-top: 130px"></el-button>
        </div>
        <div style="float:left;width: 100%;margin-top: 80px">
            <!--                    <div>-->
            <!--                        <el-button type="primary" icon="el-icon-edit" @click="open_edit">-->
            <!--                            修改个人信息-->
            <!--                        </el-button>-->
            <!--                    </div>-->

            <router-link :to="'/order/'">
                <el-button type="primary" icon="el-icon-tickets" round>
                    查看个人订单
                </el-button>
            </router-link>

            <router-link :to="'/cart/'">
                <el-button type="primary" icon="el-icon-shopping-cart-full" round style="margin-left: 3%">
                    查看购物车
                </el-button>
            </router-link>

            <router-link :to="'/favorite/'">
                <el-button type="primary" icon="el-icon-star-on" round style="margin-left: 3%">
                    查看收藏夹
                </el-button>
            </router-link>

        </div>
        <el-dialog title="收货地址" v-model="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="form.user_name" ></el-input>
                </el-form-item>
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
                        action="https://localhost:8083/image/upload"
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
</template>

<script>
import axios from "axios";
import Qs from "qs";
import {post} from "@/utils/Network";

export default {
    data() {
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
            form: {
                user_name: '',
                user_pwd1: '',
                user_pwd2: '',
                phone_num: '',
                user_address: '',
                user_img: ''
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
    mounted() {
        post("/user/getuser", Qs.stringify({}))
            .then(res => {
                this.user = res.data.data;
                console.log(this.user);
                this.form.user_name=this.user.userName;
                this.form.user_pwd1=this.user.userPwd;
                this.form.user_pwd2=this.user.userPwd;
                this.form.phone_num=this.user.phoneNum;
                this.form.user_address=this.user.address;
                this.form.user_img=this.user.userImgUrl;
            })
    },
    methods: {
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
        handleAvatarSuccess(res, file) {
            this.form.user_img = res.data;
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
<style>
.mshow {
    width: 800px;
    height: 700px;
    background: #FFFFFF;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>