<template>
  <div
    class="introduction"
    :style="{ backgroundImage: `url(${$store.getters.descBg})` }"
  >
    <div class="icon-lists icon-list-top">
      <img src="@/assets/images/arrow-bottom-dot.png" />
      <img src="@/assets/images/arrow-bottom-dot.png" />
      <img src="@/assets/images/arrow-bottom-dot.png" />
    </div>
    <p class="introduction-contnet">{{ blogInfo.detailDesc }}</p>
    <div class="icon-lists icon-list-bottom">
      <img src="@/assets/images/arrow-bottom-dot.png" />
      <img src="@/assets/images/arrow-bottom-dot.png" />
      <img src="@/assets/images/arrow-bottom-dot.png" />
    </div>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import { getBlogInfo } from "@/api/modules/home";
import useridIns from "@/utils/userid";

export default {
  data() {
    return {
      blogInfo: {},
      background: null,
    };
  },
  methods: {
    async getBlogInfo() {
      const userid = useridIns.getUserId();
      const res = await getBlogInfo({ id: userid });
      this.blogInfo = res.data;
    },
  },
  created() {
    this.getBlogInfo();
  },
};
</script>

<style lang="less" scoped></style>
