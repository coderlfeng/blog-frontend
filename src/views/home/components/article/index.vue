<template>
  <div class="home-article px-2">
    <p class="text-base py-2">最近文章</p>
    <ul>
      <li v-for="article in articles" :key="article.article_id" class="flex py-1" @click="goToDetail(article.article_id)">
        <img :src="article.coverUrl" referrerpolicy="no-referrer" class="articleCover w-20 h-20 lg:w-7 lg:h-7 mr-1 rounded">
        <div class="articleInfo">
            <div class="text-xl lg:text-base">{{ article.title }}</div>
            <div class="text-base lg:text-tiny">{{ article.subTitle }}</div>
        </div>
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
        sortType: 1,
      });
      this.articles = res.data.records;
    },
    goToDetail(id) {
      console.log(id)
      this.$router.push({
        path: `article`,
        query: {
          id
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.home-article {
    .articleCover {
        display: inline-block;
        object-fit: contain;
    }
}
</style>
