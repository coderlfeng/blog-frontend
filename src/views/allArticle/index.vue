<template>
  <div
    class="home"
    ref="home"
    :style="{ backgroundImage: `url(${$store.getters.mainBg})` }"
  >
    <div class="home-container">
      <nav-bar
        :avatar="blogInfo.avatar"
        :concise-desc="blogInfo.conciseDesc"
        ref="navbar"
      />
      <div class="home-main">
        <div class="home-main-right">
          <articleList :showPage="true" :tag="$route.query.tag" />
        </div>
      </div>
    </div>
    <footBar class="all-footer"/>

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
import articleList from "@/components/articleList/index.vue";
import sideBar from "@/components/sideBar/index.vue";
import footBar from "@/components/footBar/index.vue";

import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

export default {
  name: "home",
  components: {
    navBar,
    articleList,
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
