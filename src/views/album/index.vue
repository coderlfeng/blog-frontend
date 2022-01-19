<template>
  <div class="album">
    <div class="album-container">
      <navBar
				:avatar="blogInfo.avatar"
				:concise-desc="blogInfo.conciseDesc"
				ref="navbar"
			/>
      <div class="waterfall-container">
        <waterfall
          ref="waterfall"
          :imgsArr="imgsArr"
          :gap="10"
          @scrollReachBottom="getAlbumImgs"
        >
          <div slot="waterfall-over"></div>
        </waterfall>
      </div>
      <footBar/>
    </div>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less")
} else {
  import("./index-mobile.less")
}

import navBar from "@/components/navbar/index.vue"
import footBar from "@/components/footBar/index.vue"

import { getAlbumImgs } from "@/api/modules/album";
import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

import waterfall from "vue-waterfall-easy";
export default {
  components: {
    navBar,
    waterfall,
    footBar
  },
  data() {
    return {
      albumId: null,
      imgsArr: [],
      // 分页条件
      page: 1,
      size: 20,
      blogInfo: {}
    };
  },
  created() {
    this.albumId = this.$route.query.id;
    this.getAlbumImgs();
    this.getBlogInfo();
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
    async getBlogInfo() {
			const userid = useridIns.getUserId();
			const res = await getBlogInfo({ id: userid });
			this.blogInfo = res.data;
		},
  },
};
</script>

<style lang="less" scoped>
</style>
