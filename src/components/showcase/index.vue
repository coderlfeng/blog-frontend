<template>
  <section class="showcase" :style="bgImg">
    <div class="blogInfo">
      <div class="avatar-container">
        <img :src="blogInfo.avatar" alt="" />
      </div>
      <p class="name">{{ blogInfo.name }}</p>
      <p class="conciseDesc">{{ blogInfo.conciseDesc }}</p>
    </div>
    <img
      src="@/assets/images/home-down.png"
      class="home-down"
      @click="slideToHome"
    />
  </section>
</template>

<script>
import useridInfo from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";
export default {
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
  async created() {
    this.getBlogInfo();
  },
  methods: {
    slideToHome() {
      this.$emit("slideToHome");
    },
    async getBlogInfo() {
      const userid = useridInfo.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.showcase {
  //   @media only screen and (max-width: 800px) {
  position: relative;
  height: 100%;
  scroll-snap-align: start;
  .blogInfo {
    text-align: center;
    position: absolute;
    bottom: 0px;
    height: 30%;
    width: 100%;
    backdrop-filter: blur(2px);
    .avatar-container {
      text-align: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 5px 0;
      }
    }
    .name {
      padding: 5px 0;
      font-family: 'Microsoft Yahei', Courier, monospace;
    }
  }
  .home-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 35px;
    height: 35px;
    transform: translateX(-50%);
  }
  //   }
}
</style>
