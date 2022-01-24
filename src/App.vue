<template>
  <router-view />
</template>

<script>
import home from "@/views/home/index.vue";
export default {
  components: {
    home,
  },
  created() {
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("userComMsg", JSON.stringify(this.$store.state));
    });

    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem("userComMsg")) {
      Object.assign(
        this.$store.state,
        JSON.parse(localStorage.getItem("userComMsg"))
      );
      //使用后清除内存
      setTimeout(function () {
        localStorage.removeItem("userComMsg");
      }, 300);
    }
  },
};
</script>
<style lang="less">
html {
  font-family: harmonyos_sans;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
