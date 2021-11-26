<template>
  <div class="article-info">
    <div class="article-title sticky top-0">
      <p class="text-center font-bold lg:text-lg title">{{ article.title }}</p>
      <p class="text-center lg:text-tiny subtitle">{{ article.updateTime }}</p>
    </div>
    <div v-html="article.content" class="px-3 content"></div>
    <ul class="flex article-tags">
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
</template>

<script>
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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.12);
  }
  @media only screen and (max-width: 600px) {
    .article-title {
      .title {
        font-size: 2rem;
        padding: 0.2rem 0;
      }
      .subtitle {
        font-size: 1.6rem;
        padding-bottom: 0.8rem;
      }
    }
    .content {
      font-size: 1.9rem !important;
      margin-top: 1rem;
    }
  }
  @media only screen and (min-width: 1000px) {
    padding: 0 10%;
    box-sizing: border-box;
    .article-title {
      .title {
        padding: 0.2rem 0;
      }
      .subtitle {
        padding-bottom: 0.3rem;
      }
    }
    .content {
      font-size: 0.48rem !important;
      padding: 0 !important;
      margin-top: 0.4rem;
    }
  }
  .article-tags {
    .article-tag {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      height: 2.8rem;
      // border: 1px solid #ccc;
      border-radius: 1.4rem;
      // margin-left: 1rem;
      margin: 2rem 0 2rem 1rem;
      @media only screen and (min-width: 1000px) {
        padding: 0 0.3rem;
        height: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        margin: 0.6rem 0 0.6rem 0.6rem;
      }
    }
  }
}
</style>
