<template>
  <section class="showcase" :style="bgImg" @mousewheel="handelMousewheel">
    <div class="blogInfo">
      <div class="avatar-container">
        <img :src="blogInfo.avatar" />
      </div>
      <p class="name">{{ blogInfo.name }}</p>
      <p class="short-desc">{{ blogInfo.conciseDesc }}</p>
      <img
        src="@/assets/images/home-down.png"
        class="home-down"
        @click="slideToHome"
      />
    </div>
  </section>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import useridInfo from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

export default {
  name: "showcase",
  data() {
    return {
      bgImg: {
        backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
        backgroundPosition: "center",
      },
      blogInfo: {
        name: "",
        avatar: "",
        conciseDesc: "",
        detailDesc: "",
        id: "",
      },
    };
  },
  methods: {
    slideToHome() {
      const { path } = this.$route;
      const userText = path.split("/")[1];
      this.$router.push(`/${userText}/home`);
    },
    async getBlogInfo() {
      const userid = useridInfo.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
    handelMousewheel(e) {
      if (e.deltaY >= 0) {
        this.slideToHome();
      }
    },
  },
  async created() {
    this.getBlogInfo();
  },
};
</script>

<style lang="less" scoped></style>
