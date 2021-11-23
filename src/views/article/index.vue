<template>
  <div class="article-info">
    <div class="article-title sticky top-0">
      <p class="text-center font-bold lg:text-lg title">{{ article.title }}</p>
      <p class="text-center lg:text-tiny subtitle">{{ article.updateTime }}</p>
    </div>
    <div v-html="article.content" class="px-3 content"></div>
  </div>
</template>

<script>
import { getArticleInfo } from "@/api/modules/article";
import { format } from "@/utils/time";
export default {
  data() {
    return {
      article: {},
    };
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    async getArticleInfo() {
      const { id } = this.$route.query;
      const res = await getArticleInfo({ id });
      res.data.updateTime = format(res.data.updateTime);
      console.log(res.data);
      this.article = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.article-info {
  .article-title {
    background-color: #fff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  @media only screen and (max-width: 600px) {
    .article-title {
      .title {
        font-size: 2rem;
        padding: 1rem 0;
      }
      .subtitle {
        font-size: 1.6rem;
        padding-bottom: 0.8rem;
      }
    }
    .content {
      font-size: 1.9rem !important;
    }
  }
  @media only screen and (min-width: 1000px) {
    padding: 0 10%;
    box-sizing: border-box;
    .article-title {
      .title {
        padding: 0.6rem 0;
      }
      .subtitle {
        padding-bottom: 0.3rem;
      }
    }
    .content {
      font-size: 0.48rem !important;
      padding: 0!important;
    }
  }
}
</style>
