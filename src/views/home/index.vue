<template>
  <div
    class="home"
    ref="home"
    :style="{ backgroundImage: `url(${$store.getters.mainBg})` }"
  >
    <nav-bar
      :avatar="blogInfo.avatar"
      :concise-desc="blogInfo.conciseDesc"
      ref="navbar"
    />
    <div class="home-container" ref="container">
      <!-- <introduction /> -->
      <div class="home-main">
        <div class="home-main-right">
          <div class="title-article">最新文章</div>
          <articleList :showPage="false" :scrollBox="'home-container'" />
          <!-- <div class="title-album">精美图集</div>
          <album2 /> -->
        </div>
        <sideBar />
      </div>
    </div>
    <transition name="stretch">
      <footBar v-show="showFooter" />
    </transition>
    <div class="toTop" :class="showToTop ? 'toTop-show' : ''" @click="toTop">
      <div class="line"></div>
      <div class="text">toTop</div>
      <img :src="require('@/assets/images/toTop.png')" />
    </div>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import navBar from "@/components/navbar/index.vue";
import introduction from "@/components/introduction/index.vue";
import articleList from "@/components/articleList/index.vue";
// import album from "./components/album/index.vue";
import album2 from "./components/album2/index.vue";
import sideBar from "@/components/sideBar/index.vue";
import footBar from "@/components/footBar/index.vue";

import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

export default {
  name: "home",
  components: {
    navBar,
    introduction,
    articleList,
    // album,
    album2,
    sideBar,
    footBar,
  },
  data() {
    return {
      home: {
        backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
        backgroundPosition: "center",
      },
      blogInfo: {},
      showToTop: false,
      toTopTimer: null,
      showFooter: true,
      background: null,
    };
  },
  sockets: {
    greet(name) {
      console.log(`你好,${name},egg已接受到你的消息`);
    },
    res(str) {
      console.log(str);
    },
  },
  created() {
    this.getBlogInfo();
    const userid = useridIns.getUserId();
    let user = userid === 1 ? "李沣" : userid === 2 ? "刘欢" : "邓宇";
    this.$socket.emit("chat", { name: user });
  },
  methods: {
    async getBlogInfo() {
      const userid = useridIns.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
    // 回到顶部
    toTop() {
      this.showToTop = false;
      let h = this.$refs.home.scrollTop;
      this.toTopTimer = setInterval(() => {
        h -= 100;
        this.$refs.home.scrollTo(0, h);
        if (h <= 0) {
          clearInterval(this.toTopTimer);
          return;
        }
      }, 20);
    },
  },
};
</script>

<style lang="less" scoped></style>
