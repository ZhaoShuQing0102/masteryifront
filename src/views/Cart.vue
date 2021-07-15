<template>
<div style="width: 86%;margin-left: 7%">
  <div style="margin-top: 15px;font-size: 28px;color: RGB(141,141,255);width:100%;padding-bottom: 15px;margin-bottom:5px;width: 100%;border-bottom: 2px solid #E4E7ED">
    <b>我的购物车</b>
    <div style="float:right;">
      <el-button plain round :disabled="len===0" type="danger" icon="el-icon-delete" size="mini" style="margin-top: 10px" @click="delChosed">删除</el-button>
    </div>
  </div>
  <div style="width: 100%;max-height: 100vh;overflow: auto">
    <el-table
        :row-key="(row)=>{return row.id}"
      :data="tableData.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100% ;font-size: 16px" @selection-change="handleSelectionChange" ref="multipleTable"
      :row-style="{height: '80px'}">
    <el-table-column

        :reserve-selection="true"
        type="selection"
        width="80"
    >
    </el-table-column>
    <el-table-column
        label="商品名称"
        prop="goodsName"
        width="280">
      <template #default="scope">
        <div style="height: 60px;line-height: 60px;position:relative;" >
          <img src="../assets/images/1.jpg" alt="" style="width: 60px;height: 60px;line-height: 50px">
          <span style="margin-left: 10px;height: 50px;line-height: 30px;position:absolute;top: 20px " >{{ scope.row.goodsName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        label="规格"
        prop="userName"
        width="250">
      <template #default="scope">
        <el-dropdown trigger="click" @command="handleCommand" size="medium" >
  <el-link href="javascript:void(0)" :underline="false" style="font-size: 17px" @click="getSpecs(scope.row)">
    {{ getSpec(scope.row.specs) }}<i class="el-icon-arrow-down el-icon--right"></i>
  </el-link>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in preChooseSpec" :command="item.id+'-'+scope.row.cartItemId">{{item.spec}}</el-dropdown-item>
              <el-dropdown-item v-if="preChooseSpec.length===0" :command="0" disabled>没有更多规格了</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>

    <el-table-column
        label="单价"
        prop="price"
        width="150">
      <template #default="scope">
        <span >{{ scope.row.price }}元</span>
      </template>
    </el-table-column>

    <el-table-column
        label="数量"
        prop="goodsNum"
        width="200">
      <template #default="scope">
        <el-input-number size="small" v-model="scope.row.goodsNum" @change="handleChange(scope.row)" :min="1" label="描述文字"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
        label="小计"
        width="150">
      <template #default="scope">
        <span >{{ scope.row.goodsNum*scope.row.price }}元</span>
      </template>
    </el-table-column>
    <el-table-column
        align="right"
    >

      <template #default="scope">
        <el-link
            style="font-size: 32px;margin-right: 15px"
            :underline="false"
            size="mini"

            href="javascript:void(0)"
            @click="handleDelete(scope.$index, scope.row)" icon="el-icon-close"></el-link>
      </template>
    </el-table-column>
  </el-table></div>
 <div style="width: 100%;min-height: 100px;margin-bottom: 15px">
   <div style="float:left;;font-size: 19px;margin-top: 25px">共 {{tableData.length}} 件商品,已选 {{len}} 件</div>
   <div style="float: right;color: RGB(245,154,35);margin-top: 20px;position: relative;min-width: 550px;" >

     <div style="float:right ;">
       <el-button round :disabled="len===0" type="warning" style="width: 150px;height: 50px;font-size: 26px" @click="payNow">立即结算</el-button>
     </div>
     <div style="float: right;font-size: 30px;margin-right: 30px;margin-top: 5px;" >合计 <svg class="icon" aria-hidden="true">
       <use xlink:href="#icon-newbimoney"></use>
     </svg>{{count}} </div>

   </div>

 </div>

</div>
</template>

<script>
import {post} from "@/utils/Network";
import QS from "qs"
export default {
  name: "Cart",
  data(){
    return{
      tableData:[],
      search:'',
      len:0,
      currentPage: 1, // 当前页码
      total: '', // 总条数
      pageSize: 7, // 每页的数据条数,
      multipleSelection: [],
      preChooseSpec:[],
    }
  },
  computed:{
    count(){
      let sum=0
      for(let i in this.multipleSelection){
        sum+=this.multipleSelection[i].price*this.multipleSelection[i].goodsNum
      }
      return sum;
    },
  },
  methods:{
    handleDelete(index,row){
      this.$confirm('确定要从购物车中删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true})
          .then(() => {
            let ids=[]
            ids.push(row.cartItemId)
            if(ids.length>0){
              post("/cartitem/deletecartitembyid", QS.stringify({selectedCartItemId: ids},{indices:false} ))
                  .then(res => {
                    this.initData()
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  })
            }
          }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    delChosed(){
      this.$confirm('要从购物车中删除所选商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true})
          .then(() => {
            let ids=[]
            for(let i in this.multipleSelection){
              ids.push(this.multipleSelection[i].cartItemId)
            }
            if(ids.length>0){
              post("/cartitem/deletecartitembyid", QS.stringify({selectedCartItemId: ids},{indices:false} ))
                  .then(res => {
                    this.initData()
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  })
            }
          }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    getSpec(val){
      let res=''
      for(let i in Object.keys(val)){
        if(i!==Object.keys(val).length-1+'')
          res= res+val[Object.keys(val)[i]]+"，"
        else res= res+val[Object.keys(val)[i]]
      }
      return res
    },
    handleCommand(command){

      post("/cartitem/changegoodid",QS.stringify({cartItemId:command.split("-")[1],goodsId:command.split("-")[0]})).then(res=>{
        if(res.data.code===200){
          this.initData()
          this.$refs.multipleTable.clearSelection();
          this.$message({
            type:'success',
            message:'更改成功'
          })
        }
        else {
          this.$message({
            type:'warning',
            message:'购物车中已存在'
          })
        }
      })

    },
    getSpecs(val){
      post("/goods/getallgoodspecs",QS.stringify({goods_id:val.goodsId})).then(res=>{
        this.preChooseSpec=[]
        let data=res.data.data[0]

        for(let i in data){
          if(val.id!==data[i].id){
            this.preChooseSpec.push({id:data[i].id,spec:this.getSpec(data[i].specDetail)})
          }
        }
      })
    },

    handleSelectionChange(val){
      let _this=this

      _this.multipleSelection = val
      _this.len=_this.multipleSelection.length

    },
    handleChange(row){
      console.log(row.cartItemId);
      post("/cartitem/changegoodsnumbyid",QS.stringify({cartItemId:row.cartItemId,newGoodsNum:row.goodsNum})).then(res=>{
        if(res.data.code===100){
        }
      })
    },
    payNow(){
      let goods=[],num=[],singlePrice=[]
      for(let i in this.multipleSelection){
        goods.push(this.multipleSelection[i].goodsId)
        num.push(this.multipleSelection[i].goodsNum)
        singlePrice.push(this.multipleSelection[i].price)
      }
      if(goods.length>0){
        post("/order/creatOrder",QS.stringify({goods:goods,num:num,singlePrice:singlePrice,u_id:1,
          status:1, price:this.count,address:'1'})).then(res=>{

        })
      }
    },
    initData(){
      post("/cartitem/showmycart",QS.stringify({})).then(res=>{
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
.table__row{
  height: 80px!important;
}
.el-checkbox__inner{
  width: 20px!important;
  height: 20px!important;
}
.el-checkbox__inner::after{
  height: 9px!important;
  left: 7px!important;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>