<template>
  <transition name="slide">
    <router-view />
  </transition>
</template>

<script>
import home from "@/views/home/index.vue";
export default {
  components: {
    home,
  },
  sockets: {
    io_token(token) {
      // console.log("接收到当前socketid", token);
      sessionStorage.setItem("io_token", token)
    },
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
