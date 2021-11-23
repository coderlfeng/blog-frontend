<template>
  <div class="home-article px-2">
    <p class="text-base py-2 font-bold font-mono">最近文章</p>
    <ul>
      <li v-for="article in articles" :key="article.article_id" class="flex py-1" @click="goToDetail(article.article_id)">
        <img :src="article.coverUrl" referrerpolicy="no-referrer" class="articleCover w-20 h-20 lg:w-7 lg:h-7 mr-1 rounded">
        <div class="articleInfo">
            <div class="text-xl lg:text-base">{{ article.title }}</div>
            <div class="text-base lg:text-tiny">{{ article.subTitle }}</div>
        </div>
        <ul class="flex flex-col justify-center items-center w-10 msm:hidden lg:flex">
          <li
            v-for="(tag, index) in article.tags"
            :key="tag.tagId"
            class="article-tag rounded text-center leading-normal w-6 text-tiny"
            :style="{
              backgroundColor: `rgba(${colorEnum[index].bg})`,
              color: colorEnum[index].color,
            }"
          >
            {{ tag.tagName }}
          </li>
        </ul>
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
      colorEnum: [
        { bg: "255, 107, 129, 0.3", color: "#fff" },
        { bg: "123, 237, 159, 0.3", color: "#fff" },
        { bg: "83, 82, 237, 0.3", color: "#fff" },
      ],
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
  .section-title {
    font-family: "微软雅黑";
  }
  .articleCover {
    display: inline-block;
    object-fit: contain;
  }
  .article-tag {
    margin: 0.3rem 0;
  }
  @media screen and (min-width: 1000px) {
    .article-tag {
      margin: 0.11rem 0;
    }
  }
}
</style>
