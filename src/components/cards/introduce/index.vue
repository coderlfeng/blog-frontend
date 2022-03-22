<template>
  <layout class="introduce" v-html="detailDesc"></layout>
</template>

<script>
import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";
import layout from "../layout/index.vue";

import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}
export default {
  components: { layout },
  created() {
    this.getIntroduce();
  },
  data() {
    return { detailDesc: "" };
  },
  methods: {
    async getIntroduce() {
      const userid = useridIns.getUserId();
      const {
        data: { detailDesc },
      } = await getBlogInfo({ id: userid });
      this.detailDesc = detailDesc;
    },
  },
};
</script>

<style lang="scss" scoped></style>
