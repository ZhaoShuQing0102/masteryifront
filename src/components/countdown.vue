<template>
  <p>{{time}}</p>
</template>

<script>
export default {
  name: "countdown",
  data(){
    return {
      time:'',
      flag:false
    }
  },
  props:{
    endTime:{
      type:String
    }
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag === true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
      }
      this.time = `${h}:${m}:${s}`; // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
      if (this.time <= '00:00:00') this.time = '00:00:00'
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
}
</script>

<style scoped>

</style>