<template>
  <div class="footer">
<!--    <el-footer class="footer" height="260px">-->
      <div class="service">
        <ul class="slogen" style="width:100%">
          <li class="first-slogn">
            <h5 class="h51"></h5>
            <div class="service-txt">
              <h4><b>品类齐全,轻松购物</b></h4>

            </div>
          </li>
          <li>
            <h5 class="h52"></h5>
            <div class="service-txt">
              <h4><b>多仓直发,极速配送</b></h4>

            </div>
          </li>
          <li>
            <h5 class="h53"></h5>
            <div class="service-txt">
              <h4><b>正品行货,精致服务</b></h4>

            </div>
          </li>
          <li>
            <h5 class="h54"></h5>
            <div class="service-txt">
              <h4><b>天天低价,畅选无忧</b></h4>
            </div>
          </li>
        </ul>
      </div>
      <div class="help" >
        <dl>
          <dt>购物指南</dt>
          <dd><a href="#">购物流程</a></dd>
          <dd><a href="#">团购</a></dd>
          <dd><a href="#">常见问题</a></dd>
          <dd><a href="#">大家电</a></dd>
          <dd><a href="#">联系客服</a></dd>
        </dl>
        <dl>
          <dt>支付方式</dt>
          <dd><a href="#">货到付款</a></dd>
          <dd><a href="#">在线支付</a></dd>
          <dd><a href="#">分期付款</a></dd>
          <dd><a href="#">公司转账</a></dd>
        </dl>
        <dl>
          <dt>售后服务</dt>
          <dd><a href="#">售后政策</a></dd>
          <dd><a href="#">价格保护</a></dd>
          <dd><a href="#">退款说明</a></dd>
          <dd><a href="#">返修/退换货</a></dd>
          <dd><a href="#">取消订单</a></dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd><a href="#">易大师装机</a></dd>
          <dd><a href="#">易大师通信</a></dd>
          <dd><a href="#">易大师延保服务</a></dd>
          <dd><a href="#">易大师代练</a></dd>
          <dd><a href="#">易大师夺宝岛</a></dd>
        </dl>
        <dl style="margin-left: 8%">
          <dt>帮助中心</dt>
          <dd>
            <img src="../assets/images/yierweima.png" alt="" style="width:60px; height:60px">
            易大师咨询
          </dd>
        </dl>
      </div>
      <div class="copyright">
        <div class="links">
          关于我们| 联系我们| 联系客服| 合作招商| 商家帮助| 营销中心| 友情链接| 销售联盟| 风险监测| 隐私政策| English Site| Media & IR
        </div>
        <div class="info">
          地址：陕西省西安市咸宁西路28号西安交通大学 主楼1303  版权所有：西安交通大学易大师小组  站点建设与维护： 易大师   联系电话：82668301
        </div>
      </div>
<!--    </el-footer>-->
  </div>
</template>

<script>
export default {
  name: "orderfooter"
}
</script>

<style scoped>
.footer {
  height: 285px;
  width: 100%;
  background-color: #f5f5f5;
  /*padding-top: 15px;*/
}
.service {
  height: 65px;
  border-bottom: 1px solid #ccc;
}
.service .slogen {
  height: 65px;
  width: 100%;

  /*padding-left: 10%;*/
}

.service ul li {
  float: left;
  height: 40px;
  width:15%;
  margin-left: 8%;
  padding-top: 10px;
}
.service ul li h5 {
  float: left;
  width: 17%;
  height: 40px;
  /*background-color: purple;*/

  /*background-size:100% 100%;*/
  background-size:100% 100%;
}
.h51 {
  background: url("../assets/images/duo.png");
}
.h52 {
  background: url("../assets/images/kuai.png");
}
.h53 {
  background: url("../assets/images/hao.png");
}
.h54 {
  background: url("../assets/images/sheng.png");
}
.service-txt {
    float: left;
    margin-left: 5%;
    margin-top: 2%;
    font-size: 26px;
}
.service-txt h4 {
  padding-top: 5px;
  font-size: 18px;
}
.service-txt p {
  font-size: 10px;
}
.help {
  height: 140px;
  border-bottom: 1px solid #ccc;
  padding-top: 15px;
  width: 90%;
  margin-left: 5%;
}
.help dl {
  float: left;
  width: 220px;
  margin-left: 15px;
}
.help dl:last-child {
  width: 60px;
}
.help dt {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}
.help dd {
  font-size: 12px;
}
.help dd a{
  color: black;
}
.help dd a:hover{
  color: coral;
}
.copyright {
  text-align: center;
  padding-top: 15px;
}
.links {
  color: gray;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 10px;
}
.info {
  color: gray;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
}
ul,ol {
  list-style:none
}
</style>