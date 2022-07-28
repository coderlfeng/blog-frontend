<template>
  <div
    class="article-info"
    :style="{ backgroundImage: `url(${$store.getters.mainBg})` }"
  >
    <nav-bar
      :avatar="blogInfo.avatar"
      :concise-desc="blogInfo.conciseDesc"
      ref="navbar"
    />
    <div class="container">
      <div class="main" ref="articleMain">
        <div class="article-title">
          <h3>
            <p class="title">
              <em>{{ article.title }}</em>
            </p>
          </h3>
          <p class="subtitle">
            {{ article.subTitle }}
          </p>
          <p class="updateTime">更新于： {{ article.updateTime }}</p>
        </div>
        <!-- <div v-html="article.content" class="content"></div> -->
        <mavon-editor
          :editable="false"
          :toolbarsFlag="false"
          :subfield="false"
          :boxShadow="false"
          previewBackground="#f5f5d5"
          defaultOpen="preview"
          v-model="article.content"
        />
        <!-- <ul class="article-tags">
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
        </ul> -->
        <div class="tag-list-box">
          <div class="tag-list-title">分类</div>
          <div class="tag-list-container">
            <a
              href="javascript:;"
              v-for="tag in article.tags"
              :key="tag.tagId"
              >{{ tag.tagName }}</a
            >
          </div>
        </div>
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

<style lang="less">
.hljs {
  background-color: #f6f8fa !important;
}
.markdown-body {
  border: none !important;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    border: none !important;
  }
}
</style>
