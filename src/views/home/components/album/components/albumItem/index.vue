<template>
  <div class="album-container relative">
    <!-- mobile -->
    <img
      :src="album.albumCover"
      :alt="album.albumName"
      class="album-img"
      :class="{ open: index === openIndex }"
      v-if="isSmallScreen"
      @click="open(index)"
    />
    <p class="album-name text-center" v-if="isSmallScreen">
      {{ album.albumName }}
    </p>

    <!-- pc -->
    <span class="album-btn absolute" v-if="!isSmallScreen">点击进入</span>
    <div class="cover" v-if="!isSmallScreen">
      <div
        class="front"
        :style="{ backgroundImage: `url(${album.albumCover})` }"
      ></div>
      <div class="back">
        <p class="cover-name font-bold">{{ album.albumName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSmallScreen: false,
    };
  },
  created() {
    this.getWidth();
  },
  methods: {
    getWidth() {
      const deviceWidth = screen.availWidth;
      this.isSmallScreen = deviceWidth > 800 ? false : true;
    },
  },
};
</script>

<style lang="less" scoped>
.album-container {
  background-color: #fff;
  .album-btn {
    z-index: 1;
  }
}
@media screen and (max-width: 750px) {
  .album-container {
    width: 15rem;
    height: 21rem;
    .album-img {
      width: 15rem;
      height: 21rem;
    }
    .album-name {
      width: 100%;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.6);
      bottom: 1.6rem;
      font-size: 1.8rem;
      padding: 0.2rem 0;
    }
  }
}
@media screen and (min-width: 1000px) {
  .album-container {
    width: 5rem;
    height: 7rem;
    box-shadow: 4px 4px 15px 0 #555;
    &:hover {
      .cover {
        transform: perspective(1500px) rotateY(-180deg);
      }
    }
    .cover {
      width: 100%;
      height: 100%;
      position: absolute;
      transform-style: preserve-3d;
      transform: perspective(1500px) rotateY(0deg);
      // background: url("../../../../../../assets/images/bg.png");
      transition: all 0.7s ease-in-out;
      transform-origin: left;
      z-index: 10;
      .front {
        width: 100%;
        height: 100%;

        position: absolute;
        background: url(../../../../../../assets/images/bg.png);
        background-size: 100% 100%;
        backface-visibility: hidden;
      }
      .back {
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: 100% 100%;
        backface-visibility: hidden;
        .cover-name {
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 0.6rem;
          bottom: 0.65rem;
          background-color: rgba(255, 255, 255, 0.6);
          justify-content: center;
        }
      }
    }
  }
}
</style>
