<template>
  <div class="home-article">
    <h2>最近文章</h2>
    <ul>
      <li v-for="article in articles" :key="article.article_id" class="flex py-1">
        <img :src="article.coverUrl" referrerpolicy="no-referrer" class="articleCover">
        <div class="articleInfo">
            <div class="text-sm">{{ article.title }}</div>
            <div class="text-sm">{{ article.subTitle }}</div>
        </div>
        <!-- <div>{{article.createTime}}</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { getArticles } from "@/api/modules/home";
import useridIns from "@/utils/userid";
export default {
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const userid = useridIns.getUserId();
      const res = await getArticles({
        bloggerId: userid,
        page: 1,
        limit: 10,
        articleTitle: "",
        sortType: 2,
      });
      this.articles = res.data.records;
    },
  },
};
</script>

<style lang="less" scoped>
.home-article {
    .articleCover {
        display: inline-block;
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
}
</style>
