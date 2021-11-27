<template>
  <div class="home" @click="hideMenu" @scroll="hideMenu">
    <!-- <div class="home-main"> -->
      <nav-bar :avatar="blogInfo.avatar" :concise-desc="blogInfo.conciseDesc" ref="navbar" />
      <articles />
      <album />
    <!-- </div> -->
  </div>
</template>

<script>
import showCase from "@/components/showcase/index";
import articles from "./components/article/index.vue";
import album from "./components/album/index.vue";
import navBar from "@/components/navbar/index.vue";
import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

export default {
  name: "home",
  components: {
    showCase,
    articles,
    album,
    navBar,
  },
  data() {
    return {
      home: {
        backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
        backgroundPosition: "center",
      },
      blogInfo: {},
    };
  },
  created() {
    this.getBlogInfo();
  },

  methods: {
    async getBlogInfo() {
      const userid = useridIns.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
    hideMenu() {
      this.$refs['navbar'].hideMenu()
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: scroll;
  background: url("../../assets/images/m-bg1.jpg") no-repeat;
  background-size: cover;
  @media only screen and (min-width: 1000px) {
    padding: 0 10%;
    box-sizing: border-box;
    background: url("../../assets/images/home.jpg") center center no-repeat;
    .home-main {
      backdrop-filter: blur(6px);
      box-shadow: 15px 0 20px -1px rgba(255,255,255,.3), -15px 0 20px -1px rgba(255,255,255,.3);
    }
  }
}
</style>
