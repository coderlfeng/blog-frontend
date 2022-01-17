<template>
  <section class="showcase" :style="bgImg" @mousewheel="handelMousewheel">
    <div class="blogInfo">
      <div class="avatar-container flex justify-center">
        <img :src="blogInfo.avatar"/>
      </div>
      <p class="name">{{ blogInfo.name }}</p>
      <p class="">{{ blogInfo.conciseDesc }}</p>
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
  name: 'showcase',
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
      // this.$emit("slideToHome");
      this.$router.push({
        path: '/lifeng/home'
      })
    },
    async getBlogInfo() {
      const userid = useridInfo.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
    handelMousewheel(e) {
      if(e.deltaY >= 0) {
        this.slideToHome();
      };
    }
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
    bottom: 0;
    padding-bottom: 100px;
    width: 100%;
    backdrop-filter: blur(2px);
    .avatar-container {
      img {
        margin: 0px auto;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .name {
      padding: 20px 0;
      font-family: 'Microsoft Yahei', Courier, monospace;
    }
  }
  .home-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    display: inline-block;
    width: 35px;
    height: 35px;
    transform: translateX(-50%);
    cursor: pointer;
  }
  //   }
}
</style>
