<template>
  <div class="home">
    <showCase @slideToHome="slideToHome" />
    <section class="home-main">
      <nav-bar />
      <articles />
      <album />
    </section>
  </div>
</template>

<script>
import showCase from "@/components/showcase/index";
import articles from "./components/article/index.vue";
import album from "./components/album/index.vue"
import navBar from "@/components/navbar/index.vue"
import useridIns from "@/utils/userid";

export default {
  name: "home",
  components: {
    showCase,
    articles,
    album,
    navBar
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
    // height: 1000px;
    scroll-snap-align: start;
  }
}
</style>
