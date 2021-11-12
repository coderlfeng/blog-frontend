<template>
  <div class="home">
    <showCase @slideToHome="slideToHome" />
    <section class="home-main">溜了溜了</section>
  </div>
</template>

<script>
import showCase from "@/components/showcase/index";
import useridIns from "@/utils/userid";

export default {
  name: "home",
  components: {
    showCase,
  },
  data() {
    return {
      home: {
        backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
        backgroundPosition: "center",
      },
    };
  },
  created() {},

  methods: {
    slideToHome() {
      this.$el
        .querySelector(".home-main")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  .home-main {
    height: 1000px;
    scroll-snap-align: start;
  }
}
</style>
