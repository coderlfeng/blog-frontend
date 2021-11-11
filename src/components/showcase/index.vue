<template>
  <section class="showcase" :style="bgImg">
    <img src="@/assets/images/home-down.png" class="home-down" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      bgImg: {
        backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
        backgroundPosition: "center",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.showcase {
//   @media only screen and (max-width: 800px) {
    position: relative;
    height: 100%;
    scroll-snap-align: start;
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
