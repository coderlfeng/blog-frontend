<template>
  <layout>
    <div class="control-title">联系方式</div>
    <div class="connect">
      <img :src="connectInfo.qqQrUrl" v-if="connectInfo.qqQrUrl" />
      <img :src="connectInfo.wechatQrUrl" v-if="connectInfo.wechatQrUrl" />
      <img :src="connectInfo.weiboQrUrl" v-if="connectInfo.weiboQrUrl" />
    </div>
  </layout>
</template>

<script>
import layout from "../layout/index.vue";
import useridIns from "@/utils/userid";
import { getConnectInfo } from "@/api/modules/connect";

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
  created() {
    this.getConnectInfo();
  },
  data() {
    return {
      connectInfo: {
        // qq二维码
        qqQrUrl: "",
        // 微信二维码
        wechatQrUrl: "",
        // 微博二维码
        weiboQrUrl: "",
      },
    };
  },
  methods: {
    async getConnectInfo() {
      const bloggerId = useridIns.getUserId();
      const { data } = await getConnectInfo({ bloggerId });
      this.connectInfo = data;
    },
  },
};
</script>
