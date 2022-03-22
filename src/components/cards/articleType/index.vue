<template>
  <layout>
    <div class="control-title">文章分类</div>
    <div class="tag-list">
      <tag
        class="tag"
        :key="tag.tagId"
        v-for="tag in articleTagsList"
        @click="getTagArticles(tag.tagId)"
        >{{ tag.tagName }}</tag
      >
    </div>
  </layout>
</template>

<script>
import layout from "../layout/index.vue";
import tag from "@/components/articleTag/index.vue";
import useridIns from "@/utils/userid.js";
import { getArticleTagList } from "@/api/modules/article";

import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}
export default {
  components: {
    layout,
    tag,
  },
  data() {
    return {
      articleTagsList: [],
    };
  },
  created() {
    this.getArticleTagsList();
  },
  methods: {
    // 获取所有标签
    async getArticleTagsList() {
      const userid = useridIns.getUserId();
      const res = await getArticleTagList({ bloggerId: userid });
      this.articleTagsList = res.data;
    },

    // 获取指定标签文章
    getTagArticles(id) {
      console.log(id);
      const user = useridIns.getUser();
      this.$router.push({
        path: `/${user}/allarticle`,
        query: {
          tag: id,
        },
      });
    },
  },
};
</script>
