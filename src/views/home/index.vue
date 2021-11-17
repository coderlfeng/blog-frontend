<template>
  <div class="home">
      <nav-bar :avatar="blogInfo.avatar"/>
      <articles />
      <album />
  </div>
</template>

<script>
import showCase from "@/components/showcase/index";
import articles from "./components/article/index.vue";
import album from "./components/album/index.vue"
import navBar from "@/components/navbar/index.vue"
import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

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
      blogInfo: {}
    };
  },
  created() {
    this.getBlogInfo()
  },

  methods: {
    async getBlogInfo() {
      const userid = useridIns.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: scroll;
  .home-main {
    
  }
}
</style>
