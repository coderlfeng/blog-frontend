<template>
  <div class="home-article px-2">
    <p class="py-2 font-bold font-mono recent-title" :style="{color: '#eee'}">最近文章</p>
    <ul style="width: 100%;">
      <li v-for="article in articles" :key="article.article_id + Math.random()" class="flex py-1" @click="goToDetail(article.article_id)">
        <img :src="article.coverUrl" referrerpolicy="no-referrer" class="articleCover w-20 h-20 lg:w-7 lg:h-7 mr-2 rounded">
        <div class="articleInfo flex-1">
            <div class="text-xl lg:text-base font-mono font-bold">{{ article.title }}</div>
            <div class="text-base lg:text-tiny mt-3 lg:mt-1">{{ article.subTitle }}</div>
        </div>
        <ul
          class="
            flex flex-col
            justify-center
            items-center
            w-10
            msm:hidden
            lg:flex
          "
        >
          <li
            v-for="(tag, index) in article.tags"
            :key="tag.tagId + Math.random()"
            class="article-tag rounded text-center leading-normal w-6 text-tiny"
            :style="{
              backgroundColor: `rgba(${colorEnum[index % 3].bg})`,
              color: colorEnum[index % 3].color,
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
  width: 100%;
  .section-title {
    font-family: "微软雅黑";
  }
  .articleCover {
    display: inline-block;
    object-fit: contain;
  }
  .article {
    cursor: pointer;
    transition: all .5s;
    &:hover {
      backdrop-filter: blur(4px);
    }
  }
  .article-tag {
    margin: 0.3rem 0;
  }
  @media screen and (max-width: 750px) {
    .recent-title {
      font-size: 1.8rem;
    }
    .articleInfo {
      color: #eee;
    }
  }
  @media screen and (min-width: 1000px) {
    .recent-title {
      font-size: 0.65rem;
    }
    .article-tag {
      margin: 0.11rem 0;
    }
    .articleInfo {
      color: #eee;
    }
  }
}
</style>
