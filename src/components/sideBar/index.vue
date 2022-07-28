<template>
  <div class="side-bar" :class="sideBarIsShow ? 'side-bar-show' : ''">
    <div class="controls">
      <component
        v-for="controlId in controls"
        :key="controlId"
        :is="ID2C(controlId)"
      />
    </div>
  </div>
</template>

<script>
import ID2C from "@/constants/side-components";
import isPC from "@/utils/isPC";
import { getLinks } from "@/api/modules/links";
import { getConnectInfo } from "@/api/modules/connect";
import tag from "@/components/articleTag/index";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}

import { getArticles } from "@/api/modules/home";
import { getArticleTagList } from "@/api/modules/article";
import useridIns from "@/utils/userid";
import { normalizeDate } from "@/utils/time";
import calendar from "@/utils/calendar";
import { formatTimeZone } from "@/utils/time";
import articleType from "@/components/cards/articleType/index.vue";
import articleHot from "@/components/cards/articleHot/index.vue";
import links from "@/components/cards/links/index.vue";
import connect from "@/components/cards/connect/index.vue";
import timeControl from "@/components/cards/timeControl/index.vue";
import message from "@/components/cards/message/index.vue";
import introduce from "@/components/cards/introduce/index.vue";
const shici = require("jinrishici");

export default {
  components: {
    tag,
    articleType,
    articleHot,
    links,
    connect,
    timeControl,
    message,
    introduce,
  },
  data() {
    return {
      date: {
        solarDate: "",
        lunarDate: "",
        Term: "",
        festival: "",
        lunarFestival: "",
        animalIndex: 0,
      },
      poetry: {
        content: "",
        author: "",
        dynasty: "",
        title: "",
      },
      articleTagsList: [],
      // 精选文章
      latestArticles: [],
      // 友链
      links: [],
      showIt: true,
      sideBarIsShow: false,
      getDateTimer: null,
      changeTimer: null,
      // 时区
      timeZone: "",
      // 联系方式
      connectInfo: {
        qqQrUrl: null,
        wechatQrUrl: null,
        weiboQrUrl: null,
      },
      // 控件id
      controls: [1, 3, 4, 7],
      ID2C: ID2C,
    };
  },
  methods: {
    async getFriendLinks() {
      const bloggerId = useridIns.getUserId();
      const { data } = await getLinks({ bloggerId });
      this.links = data;
    },
    async getConnectInfo() {
      const bloggerId = useridIns.getUserId();
      const { data } = await getConnectInfo({ bloggerId });
      this.connectInfo = data;
    },
    loadShici() {
      this.showIt = false;
      shici.load((res) => {
        const {
          content,
          origin: { author, dynasty, title },
        } = res.data;
        this.poetry = { content, author, dynasty, title };
        this.showIt = true;
        setTimeout(() => {
          this.loadShici();
        }, 10000);
      });
    },
    getDate() {
      let animalArr = [
        "\u9f20",
        "\u725b",
        "\u864e",
        "\u5154",
        "\u9f99",
        "\u86c7",
        "\u9a6c",
        "\u7f8a",
        "\u7334",
        "\u9e21",
        "\u72d7",
        "\u732a",
      ];
      let YY = new Date().getFullYear();
      let MM = new Date().getMonth() + 1;
      let DD = new Date().getDate();
      let res = calendar.solar2lunar(YY, MM, DD);
      this.date.solarDate = normalizeDate(new Date()) + " " + res.ncWeek;
      this.date.lunarDate = `${res.gzYear}年 ${res.IMonthCn} ${res.IDayCn}`;
      this.date.Term = res.Term;
      this.date.festival = res.festival;
      this.date.lunarFestival = res.lunarFestival;
      this.date.animalIndex = animalArr.indexOf(res.Animal);

      if (this.getDateTimer) clearInterval(this.getDateTimer);
      this.getDateTimer = setInterval(() => {
        this.date.solarDate = normalizeDate(new Date()) + " " + res.ncWeek;
        if (normalizeDate(new Date()).substr(11, 8) == "00:00:00") {
          this.date.lunarDate = `${res.gzYear}年 ${res.IMonthCn} ${res.IDayCn}`;
          this.date.Term = res.Term;
          this.date.festival = res.festival;
          this.date.lunarFestival = res.lunarFestival;
          this.date.animalIndex = animalArr.indexOf(res.Animal);
        }
      }, 1000);
    },
    async getArticleTagsList() {
      const userid = useridIns.getUserId();
      const res = await getArticleTagList({ bloggerId: userid });
      this.articleTagsList = res.data;
    },
    async getlatestArticles() {
      const userid = useridIns.getUserId();
      const res = await getArticles({
        bloggerId: userid,
        page: 1,
        limit: 10,
        articleTitle: "",
        sortType: 1,
        tagId: "",
      });
      this.latestArticles = res.data.records;
    },
    getTagArticles(id) {
      const user = useridIns.getUser();
      this.$router.push({
        path: `/${user}/allarticle`,
        query: {
          tag: id,
        },
      });
    },
    goToDetail(id) {
      this.$router.push({
        path: `article`,
        query: {
          id,
        },
      });
    },
  },
  created() {
    this.getDate();
    this.getArticleTagsList();
    this.getlatestArticles();
    this.timeZone = formatTimeZone();
    this.getFriendLinks();
    this.getConnectInfo();
  },
  mounted() {
    // this.loadShici();
    document.querySelector(".home").addEventListener("scroll", () => {
      this.sideBarIsShow = false;
    });
  },
  beforeDestroy() {
    clearInterval(this.getDateTimer);
    this.getDateTimer = null;
    clearInterval(this.changeTimer);
    this.changeTimer = null;
  },
};
</script>

<style lang="less" scoped></style>
