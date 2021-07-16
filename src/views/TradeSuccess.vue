<template>
<div style="min-height: 75vh;width: 100%">
  <div style="width: 70%;margin-left: 15%;background-color: white;min-height: 65vh;margin-top: 2vh">
    <div style="padding-top: 15vh;font-size: 40px">
      <svg class="icon" aria-hidden="true" style="font-size: 55px;margin-right: 20px">
        <use xlink:href="#icon-zhifuchenggong"></use>
      </svg>
      恭喜您，支付成功！
    </div>
    <div style="color: #909399;margin-top: 2.5vh"> 温馨提示:订单已经生成，商家将以最快的速度为您发货</div>
    <div style="margin-top: 10vh">
      <el-button type="success" plain icon="el-icon-arrow-left" style="margin-right: 40px" @click="$router.push('/')">继续购物</el-button>
      <el-link type="primary" href="javascript:void(0)" :underline="false" @click="$router.push('/order')">查看订单</el-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TradeSuccess"
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>