<template>
  <layout>
    <div class="control-title">精选文章</div>
    <ul class="hot-articles">
      <li
        class="hot-articles-item"
        v-for="(article, index) in hotArticles"
        :key="article.article_id"
        @click="goToDetail(article.article_id)"
      >
        <span class="article-index">{{ index + 1 }}</span
        >{{ article.title }}
      </li>
    </ul>
  </layout>
</template>

<script>
import useridIns from "@/utils/userid.js";
import { getArticles } from "@/api/modules/home";
import layout from "../layout/index.vue";

import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}
export default {
  components: {
    layout,
  },
  data() {
    return {
      hotArticles: [],
    };
  },
  created() {
    this.getHotArticles();
  },
  methods: {
    // 获取精选文章
    async getHotArticles() {
      const userid = useridIns.getUserId();
      const res = await getArticles({
        bloggerId: userid,
        page: 1,
        limit: 10,
        articleTitle: "",
        sortType: 1,
        tagId: "",
      });
      this.hotArticles = res.data.records;
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
  },
};
</script>

<style lang="less" scoped></style>
