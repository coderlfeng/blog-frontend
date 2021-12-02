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
.home-album {
  .album-container {
    background-color: #fff;
    .album-name {
      width: 100%;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.6);
      left: 0;
    }
  }
  @media screen and (max-width: 750px) {
    .recent-title {
      font-size: 1.8rem;
    }
    .album {
      flex: 0 0 50%;
      display: flex;
      justify-content: center;
      .album-container {
        width: 15rem;
        height: 21rem;
        .album-img {
          width: 15rem;
          height: 21rem;
        }
        .album-name {
          bottom: 2.4rem;
          font-size: 0.6rem;
        }
      }
    }
  }
  @media screen and (min-width: 1000px) {
    .recent-title {
      font-size: 0.65rem;
    }
    .album {
      flex: 0 0 20%;
      display: flex;
      justify-content: center;
      .album-container {
        width: 5rem;
        height: 7rem;
        .album-img {
          width: 5rem;
          height: 7rem;
        }
        .album-name {
          bottom: 0.7rem;
          font-size: 0.6rem;
        }
      }
    }
  }
  .open {
      animation: open 1s;
  }
  @keyframes open {
    0% {
      transform: rotate3d(0, 1, 0, 0deg);
    }
    10% {
      transform: rotate3d(0, 1, 0, 60deg);
    }
    55% {
      transform: rotate3d(0, 1, 0, -160deg);
    }
    93% {
      transform: rotate3d(0, 1, 0, -160deg);
    }
    100% {
      transform: rotate3d(0, 1, 0, 0deg);
    }
  }
}
</style>
