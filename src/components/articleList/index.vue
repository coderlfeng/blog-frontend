<template>
  <div class="article">
    <ul class="articles-list">
      <li
        v-for="(article, index) in articles"
        :key="article.article_id"
        class="article-item"
        :ref="'article' + (index + 1)"
        @mouseenter="article.isActive = true"
        @mouseleave="article.isActive = false"
        @click="goToDetail(article.article_id)"
      >
        <div class="left-side">
          <img :src="article.coverUrl" referrerpolicy="no-referrer" />
        </div>
        <div class="right-side">
          <p class="article-title">
            {{ article.title }}
          </p>
          <div class="article-subTitle">
            {{ article.subTitle }}
          </div>
          <ul class="tags-list" v-if="!isPC && !$route.query.tag">
            <li
              class="article-tag"
              :style="{
                backgroundColor: `rgba(${colorEnum[0].bg})`,
                color: colorEnum[0].color,
              }"
            >
              {{ article.tags[0] ? article.tags[0].tagName : "" }}
            </li>
            <li class="article-tag-more" v-if="article.tags.length > 1">
              <span>+{{ article.tags.length - 1 }}</span>
            </li>
          </ul>
          <ul class="tags-list" v-if="isPC && !$route.query.tag">
            <li
              v-for="(tag, i) in article.tags"
              :key="tag.tagId"
              class="article-tag"
              :style="{
                backgroundColor: `rgba(${colorEnum[i % 3].bg})`,
                color: colorEnum[i % 3].color,
              }"
            >
              {{ tag.tagName }}
            </li>
          </ul>
          <div class="article-item-info">
            <span class="">更新于：{{ article.updateTime | formatTime }}</span>
          </div>
        </div>
      </li>
    </ul>
    <LPagination
      v-if="showPage"
      :total="total"
      :size="size"
      :currentPage="currentPage"
      layout="total, jumper"
      @current-change="handelCurrentChange"
    />
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import { getArticles } from "@/api/modules/home";
import useridIns from "@/utils/userid";
import { normalizeDate } from "@/utils/time";

import LPagination from "@/components/pagination/index.vue";

export default {
  data() {
    return {
      size: 10,
      currentPage: 1,
      total: 0,
      articles: [],
      colorEnum: [
        { bg: "255, 107, 129, 0.3", color: "#fff" },
        { bg: "123, 237, 159, 0.3", color: "#fff" },
        { bg: "83, 82, 237, 0.3", color: "#fff" },
      ],
      isPC: true,
      showNum: 0,
      observer: null
    };
  },
  components: {
    LPagination,
  },
  props: {
    scrollBox: {
      type: String,
    },
    showPage: {
      type: Boolean,
    },
    tag: {
      type: [Number, String]
    }
  },
  filters: {
    formatTime(val) {
      return normalizeDate(val);
    },
  },
  created() {
    this.isPC = isPC();
    this.getArticles();
    this.$EventBus.$on("getTagArticles", (id) => {
      this.getArticles(id);
    });
  },
  methods: {
    createObserver() {
      const { $refs } = this;
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      };
      this.observer = new IntersectionObserver(this.handleIntersect, options);
      Object.keys($refs).forEach((key) => {
        $refs[`${key}`][0] && this.observer.observe($refs[`${key}`][0]);
      });
    },

    // 视口相交处理
    handleIntersect(entries) {
      entries.forEach((article) => {
        article.target.style.transform = `scale(${article.intersectionRatio})`;
      });
    },

    // 获取文章
    async getArticles(tagId) {
      const userid = useridIns.getUserId();
      const res = await getArticles({
        bloggerId: userid,
        page: this.currentPage,
        limit: this.size,
        articleTitle: "",
        sortType: 1,
        tagId: this.tag,
      });
      this.articles = res.data.records;
      this.total = res.data.total;
      this.$nextTick(() => {
        this.createObserver();
      });
    },

    // 查看文章详情
    goToDetail(id) {
      this.$router.push({
        path: `article`,
        query: {
          id,
        },
      });
    },

    handelCurrentChange(val) {
      this.currentPage = val;
      this.getArticles();
    },
  },
};
</script>

<style lang="less" scoped></style>
