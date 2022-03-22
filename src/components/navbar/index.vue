<template>
  <div class="nav">
    <header
      class="navbar"
      :style="{
        boxShadow: showMenu ? 'null' : '0px 4px 4px 0px rgba(0, 0, 0, .12)',
      }"
    >
      <div class="nav-avatar-container">
        <img class="nav-avatar" :src="avatar" />
        <span class="concise-desc" :style="{ color: '#000' }">{{
          conciseDesc
        }}</span>
      </div>
      <ul class="menu">
        <li class="menu-item" @click="handlePath('allarticle')">文章</li>
        <!-- <li class="menu-item">相册</li> -->
      </ul>
      <i class="iconfont icon-list" @click.stop="changeMenuShow"></i>
    </header>
    <drawer :active.sync="showMenu" v-if="!isPC" />
  </div>
</template>

<script>
import Headroom from "headroom.js";

import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import searchInput from "@/components/search-input/index.vue";
import drawer from "./components/drawer.vue";

export default {
  props: ["avatar", "conciseDesc"],
  components: {
    searchInput,
    drawer,
  },
  data() {
    return {
      showMenu: false,
      isPC: isPC(),
    };
  },
  mounted() {
    // if (isPC()) {
    this.initHeadRoom();
    // }
  },
  methods: {
    changeMenuShow() {
      this.showMenu = !this.showMenu;
    },
    handlePath(path) {
      this.$router.push(path);
    },
    initHeadRoom() {
      const scroller = this.$parent.$el;
      const navEl = document.querySelector(".nav");
      const options = {
        offset: 200,
        tolerance: 10,
        classes: {
          initial: "headroom",
          pinned: "headroom--pinned",
          unpinned: "headroom--unpinned",
          top: "headroom--top",
          notTop: "headroom--not-top",
          bottom: "headroom--bottom",
          notBottom: "headroom--not-bottom",
          frozen: "headroom--frozen",
          pinned: "headroom--pinned foo bar",
        },
        scroller,
      };
      const nav = new Headroom(navEl, options);
      nav.init();
    },
  },
};
</script>

<style lang="less"></style>
