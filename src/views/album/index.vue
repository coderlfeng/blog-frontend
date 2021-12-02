<template>
  <div class="album">
    <waterfall
      ref="waterfall"
      :imgsArr="imgsArr"
      :gap="10"
      @scrollReachBottom="getAlbumImgs"
    >
      <div slot="waterfall-over"></div>
    </waterfall>
  </div>
</template>

<script>
import { getAlbumImgs } from "@/api/modules/album";
import waterfall from "vue-waterfall-easy";
export default {
  components: {
    waterfall,
  },
  data() {
    return {
      albumId: null,
      imgsArr: [],
      // 分页条件
      page: 1,
      size: 20,
    };
  },
  created() {
    this.albumId = this.$route.query.id;
    this.getAlbumImgs();
  },
  methods: {
    async getAlbumImgs() {
      const res = await getAlbumImgs({
        albumId: this.albumId,
        page: this.page,
        size: this.size,
      });
      const imgs = res.data.records.map((item) => {
        return {
          src: item.url,
          href: item.url,
        };
      });
      this.imgsArr.push(...imgs);
      this.page++;
      imgs.length < this.size && this.$refs["waterfall"].waterfallOver();
    },
  },
};
</script>

<style lang="less" scoped>
.album {
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 1000px) {
    background: url("../../assets/images/bg1.jpg") no-repeat center;
    /deep/ .vue-waterfall-easy-scroll {
      backdrop-filter: blur(10px);
    }
  }
  @media only screen and (min-width: 1000px) {
    padding: 0 10%;
    box-sizing: border-box;
    background: url("../../assets/images/bg1.jpg") no-repeat;
    /deep/ .vue-waterfall-easy-scroll {
      backdrop-filter: blur(20px);
    }
  }
  .vue-waterfall-easy-scroll {
    /deep/ .over {
      bottom: 0;
    }
  }
}
</style>
