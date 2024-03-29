<template>
  <div class="album-container">
    <!-- PC端 -->
    <ul class="list" ref="list" v-if="isPC">
      <li
        class="item"
        v-for="(album, index) in albums"
        :key="album.id"
        :style="{
          transform: `rotateY(${36 * (index + 3)}deg) translateZ(360px)`,
          backgroundImage: `url(${album.albumCover})`,
        }"
        @click="handelClick(album)"
        @mouseenter="stopRotate"
        @mouseleave="startRotate"
      >
        <img
          v-if="album.isPrivate"
          src="@/assets/images/lock.png"
          class="lock"
        />
        <div class="album-name">{{ album.albumName }}</div>
      </li>
      <li class="item-bg"></li>
    </ul>

    <!-- 移动端 -->
    <ul class="list" ref="list" v-if="!isPC">
      <li
        class="item"
        v-for="(album, index) in albums"
        :key="album.id"
        :style="{
          transform: `scale(${
            rotateArr[index] == 0 ? '1, 1' : '0.75, 0.75'
          }) translateX(${
            rotateArr[index] == 0
              ? '0'
              : rotateArr[index] == 1
              ? '40'
              : rotateArr[index] == 3
              ? '-40'
              : '0'
          }vw) translateZ(${
            rotateArr[index] == 0 ? '30' : rotateArr[index] == 2 ? '-30' : '-10'
          }vw)`,
          backgroundImage: `url(${album.albumCover})`,
        }"
        @click="handelClick(album)"
        @mouseenter="stopRotate"
        @mouseleave="startRotate"
      >
        <img
          v-if="album.isPrivate"
          src="@/assets/images/lock.png"
          class="lock"
        />
        <div class="album-name">{{ album.albumName }}</div>
      </li>
      <li class="item-bg"></li>
    </ul>

    <pwd-pop
      :visible.sync="showModel"
      title="请输入相册密码"
      :width="isPC ? '400px' : '80%'"
      :hideByMask="true"
      @confirm="validatePwd"
    >
      <lf-input v-model="password" placeholder="请输入相册密码" />
    </pwd-pop>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import { getBloggerAlbum } from "@/api/modules/album";
import { validateAlbumPwd } from "@/api/modules/album";
import useridIns from "@/utils/userid";

import pwdPop from "@/components/pwdPop/index";
import lfInput from "@/components/input/index";

export default {
  data() {
    return {
      isPC: true,
      albums: [],
      albumId: "",
      showModel: false,
      password: "",
      rotateDeg: 0,
      rotateArr: [],
      rotateTimer: null,
    };
  },
  components: {
    pwdPop,
    lfInput,
  },
  methods: {
    async getAlbums() {
      const bloggerId = useridIns.getUserId();
      const res = await getBloggerAlbum({
        bloggerId,
        sort: 2,
        page: 1,
        size: isPC() ? 10 : 4,
      });
      this.albums = res.data.records;
      for (let i = 0; i < this.albums.length; i++) {
        this.rotateArr.push(i);
      }
      this.$nextTick(() => {
        this.startRotate();
      });
    },
    startRotate() {
      if (this.albums.length <= 0) return;
      if (isPC()) {
        if (this.rotateTimer) clearInterval(this.rotateTimer);
        this.rotateTimer = setInterval(() => {
          this.rotateDeg++;
          this.$refs.list.style.transform = `rotateX(-10deg) rotateY(${
            this.rotateDeg * 0.2
          }deg) rotateX(10deg)`;
        }, 30);
      } else {
        if (this.rotateTimer) clearInterval(this.rotateTimer);
        this.rotateTimer = setInterval(() => {
          let a = this.rotateArr.splice(this.rotateArr.length - 1, 1);
          this.rotateArr.unshift(a[0]);
        }, 2000);
      }
    },
    stopRotate() {
      if (!isPC()) return;
      clearInterval(this.rotateTimer);
    },
    handelClick(data) {
      this.albumId = data.id;
      if (data.isPrivate) {
        this.showModel = true;
      } else {
        this.$router.push({
          path: "album",
          query: {
            id: data.id,
          },
        });
      }
    },
    // 验证密码
    async validatePwd() {
      const res = await validateAlbumPwd({
        albumId: this.albumId,
        password: this.password,
      });
      if (res.data.isRight) {
        this.showModel = false;
        this.$router.push({
          path: "album",
          query: {
            id: this.albumId,
          },
        });
      } else {
        this.$message({ type: "error", content: "密码错误" });
      }
    },
  },
  created() {
    this.isPC = isPC();
    this.getAlbums();
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.rotateTimer);
    this.rotateTimer = null;
  },
};
</script>

<style lang="less" scoped></style>
