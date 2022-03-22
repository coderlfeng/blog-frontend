<template>
  <layout>
    <div class="control-title">友链</div>
    <ul class="links">
      <li class="link" v-for="{ id, link, linkName } in links" :key="id">
        <a :href="link" target="blank">{{ linkName }}</a>
      </li>
    </ul>
  </layout>
</template>

<script>
import layout from "../layout/index.vue";
import useridIns from "@/utils/userid";
import { getLinks } from "@/api/modules/links";

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
      links: [],
    };
  },
  created() {
    this.getFriendLinks();
  },
  methods: {
    async getFriendLinks() {
      const bloggerId = useridIns.getUserId();
      const { data } = await getLinks({ bloggerId });
      this.links = data;
    },
  },
};
</script>

<style lang="less" scoped></style>
