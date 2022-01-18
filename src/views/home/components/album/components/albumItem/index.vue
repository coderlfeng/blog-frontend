<template>
  <div
    class="album-container relative"
    @click="goToAlbum"
    :style="{
      '--hover': !!self_private ? '' : 'perspective(1500px) rotateY(-180deg)',
      backgroundImage: isSmallScreen ? `url(${album.albumCover})` : '',
    }"
  >
    <!-- mobile -->
    <p class="album-name text-center" v-if="isSmallScreen">
      {{ album.albumName }}
    </p>
    <img
      src="@/assets/images/lock.png"
      class="lock absolute"
      v-if="!!self_private && isSmallScreen"
    />

    <!-- pc -->
    <!-- <span class="album-btn absolute" v-if="!isSmallScreen">点击进入</span> -->
    <div class="album-cover" v-if="!isSmallScreen">
      <p>创建于</p>
      <p>{{ format(album.createTime) }}</p>
      <p>更新于</p>
      <p>{{ format(album.updateTime) }}</p>
      <p @click="goToAlbum">进入</p>
    </div>
    <div class="cover" v-if="!isSmallScreen">
      <div
        class="front"
        :style="{ backgroundImage: `url(${album.albumCover})` }"
      ></div>
      <div class="back">
        <img
          src="@/assets/images/lock.png"
          class="lock absolute"
          v-if="!!self_private"
        />
        <p class="cover-name font-bold">{{ album.albumName }}</p>
      </div>
    </div>
    <pwd-pop
      :visible.sync="showModel"
      title="请输入相册密码"
      :width="isSmallScreen ? deviceWidth * 0.8 + 'px' : '400px'"
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
  import("./index-PC.less")
} else {
  import("./index-mobile.less")
}

import pwdPop from "@/components/pwdPop/index";
import lfInput from "@/components/input/index";
import { format } from "@/utils/time";
import { validateAlbumPwd } from "@/api/modules/album";

export default {
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  components: {
    pwdPop,
    lfInput,
  },
  data() {
    return {
      isSmallScreen: false,
      self_private: 1,
      format: format,
      showModel: false,
      password: "",
      deviceWidth: 0,
    };
  },
  created() {
    this.getWidth();
    this.self_private = JSON.parse(JSON.stringify(this.album.isPrivate));
  },
  methods: {
    // 获取屏幕宽度
    getWidth() {
      const deviceWidth = screen.availWidth;
      this.deviceWidth = deviceWidth;
      this.isSmallScreen = deviceWidth > 800 ? false : true;
    },

    // 跳转逻辑
    goToAlbum() {
      if (!!this.self_private) {
        this.showModel = true;
        return false;
      }
      this.$router.push({
        path: "album",
        query: {
          id: this.album.id,
        },
      });
    },

    // 验证密码
    async validatePwd() {
      // console.log(this.password);
      // if (this.password == 123456) {
      //   this.self_private = 0;
      //   this.showModel = false;
      // }
      const res = await validateAlbumPwd({
        albumId: this.album.id,
        password: this.password,
      });
      if (res.data.isRight) {
        this.self_private = 0;
        this.showModel = false;
      } else {
        this.$message({type: 'error', content: '密码错误'})
      }
    },
  },
};
</script>

<style lang="less">
</style>
