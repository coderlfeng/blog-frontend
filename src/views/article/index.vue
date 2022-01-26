<template>
  <div class="article-info" :style="{ backgroundImage: `url(${$store.getters.mainBg})` }">
    <div class="container">
      <nav-bar
        :avatar="blogInfo.avatar"
        :concise-desc="blogInfo.conciseDesc"
        ref="navbar"
      />
      <div class="main" ref="articleMain">
        <div class="article-title">
          <p class="title">
            {{ article.title }}
          </p>
          <p class="subtitle">
            {{ article.subTitle }}
          </p>
          <p class="updateTime">Update： {{ article.updateTime }}</p>
        </div>
        <div v-html="article.content" class="content"></div>
        <ul class="article-tags">
          <li
            v-for="(tag, index) in article.tags"
            :key="tag.tagId"
            class="article-tag"
            :style="{
              backgroundColor: `rgba(${colorEnum[index % 3].bg})`,
              color: colorEnum[index % 3].color,
            }"
          >
            {{ tag.tagName }}
          </li>
        </ul>
      </div>
      <footBar />
    </div>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import navBar from "@/components/navbar/index.vue";
import footBar from "@/components/footBar/index.vue";

import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";
import { getArticleInfo } from "@/api/modules/article";
import { format } from "@/utils/time";
export default {
  data() {
    return {
      article: {},
      colorEnum: [
        { bg: "255, 107, 129, 0.3", color: "#000" },
        { bg: "123, 237, 159, 0.3", color: "#000" },
        { bg: "83, 82, 237, 0.3", color: "#000" },
      ],
      blogInfo: {},
      background: null,
    };
  },
  components: {
    navBar,
    footBar,
  },
  created() {
    this.getArticleInfo();
    this.getBlogInfo();
    setTimeout(() => {
      this.getArticleBg();
    }, 0);
  },
  computed: {
    articleBg() {
      return this.background
        ? this.background
        : require("@/assets/images/bg1.jpg");
    },
  },
  methods: {
    getArticleBg() {
      this.background = isPC()
        ? this.$store.state.theme.principalPcBg
        : this.$store.state.theme.principalMobileBg;
    },
    async getArticleInfo() {
      const { id } = this.$route.query;
      const res = await getArticleInfo({ id });
      res.data.updateTime = format(res.data.updateTime);
      this.article = res.data;
    },
    async getBlogInfo() {
      const userid = useridIns.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
  },
  mounted() {
    this.$refs.articleMain.style.minHeight =
      document.querySelector("body").offsetHeight -
      document.querySelector(".nav").offsetHeight -
      document.querySelector(".footer-container").offsetHeight +
      "px";
  },
};
</script>

<style lang="less" scoped></style>
