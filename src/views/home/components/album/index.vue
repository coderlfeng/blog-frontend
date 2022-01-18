<template>
  <div class="px-2 py-2 font-bold font-mono home-album">
    <p class="py-2 font-bold font-mono recent-title" :style="{ color: '#eee' }">
      相册
    </p>
    <ul class="flex flex-wrap justify-around">
      <li v-for="(album) in albums" :key="album.id" class="mb-3 album">
        <album-item :album="album"/>
      </li>
    </ul>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less")
} else {
  import("./index-mobile.less")
}

import { getBloggerAlbum } from "@/api/modules/album";
import useridIns from "@/utils/userid";
import albumItem from "./components/albumItem/index.vue"

export default {
  components: {
    albumItem
  },
  data() {
    return {
      albums: [],
      openIndex: null,
      isSmallScreen: false,
    };
  },
  created() {
    this.getWidth()
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      const bloggerId = useridIns.getUserId();
      const res = await getBloggerAlbum({ bloggerId, sort: 2, page: 1, size: this.isSmallScreen ? 4 : 10 });
      this.albums = res.data.records;
    },
    getWidth() {
      const deviceWidth = screen.availWidth;
      this.isSmallScreen = deviceWidth > 800 ? false : true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
