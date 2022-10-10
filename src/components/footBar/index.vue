<template>
  <div class="footer-container">
    <p class="footer-desc">
      {{ new Date().getFullYear() }} &copy; EXCELLENTLLD
    </p>
    <p class="footer-filing" @click="goIPC">蜀ICP备2021028558号</p>
    <p class="footer-notice">本站原创内容转载请注明来源</p>
    <p class="footer-run-time">本站已运行{{ time }}</p>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

export default {
  data() {
    return {
      time: "",
    };
  },
  created() {
    this.computeTimer = setInterval(() => {
      this.computeTime();
    }, 1000);
  },
  methods: {
    computeTime() {
      const timestamp = +new Date() - 1635436800000;
      let days = Math.floor(timestamp / (24 * 3600 * 1000));
      let leavel1 = timestamp % (24 * 3600 * 1000);
      let hours = Math.floor(leavel1 / (3600 * 1000));
      let leavel2 = timestamp % (3600 * 1000);
      let minutes = Math.floor(leavel2 / (60 * 1000));
      let seconds = Math.floor((leavel2 / 1000) % 60);
      this.time = `${days}天${hours}小时${minutes}分钟${seconds}秒`;
    },
    goIPC() {
      location.href = 'https://beian.miit.gov.cn/#/Integrated/recordQuery'
    }
  },
  destroyed() {
    this.computeTimer = null;
  },
};
</script>

<style lang="less" scoped></style>
