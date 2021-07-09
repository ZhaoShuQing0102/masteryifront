<template>
  <div class="activity">
  <el-row :gutter="20">
    <div class="grid-content bg-purple">秒杀活动</div>
    <div class="grid-content bg-purple">特价活动</div>
    <div class="grid-content bg-purple">0元抢购</div>
    <div class="grid-content bg-purple">其他活动</div>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "activity"
}
</script>

<style scoped>

.activity{
  position: absolute;
  margin-top: 600px;
  margin-left: 700px;
}
</style>