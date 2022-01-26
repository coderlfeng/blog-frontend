<template>
  <div class="side-bar" :class="sideBarIsShow ? 'side-bar-show' : ''">
    <div class="item-list">
      <div class="item">
        <div>{{ timeZone }}好~~ 忙碌的打工人,停下来休息一下吧~</div>
        <div class="top">
          <div class="text">
            <div>
              现在是 <span class="">{{ date.solarDate }}</span>
            </div>
            <p>农历 {{ date.lunarDate }} {{ date.Term }}</p>
            <p>{{ date.festival }} {{ date.lunarFestival }}</p>
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="showIt"
            class="poetry"
            :style="{
              backgroundColor: `rgba(${colorEnum[showPoetryIndex % 3].bg})`,
              color: colorEnum[showPoetryIndex % 3].color,
              lineHeight: '30px',
            }"
          >
            <p>{{ poetry.content }}</p>
            <p class="poetry-author">
              -- {{ `${poetry.author} · 《${poetry.title}》` }}
            </p>
          </div>
        </transition>
      </div>
      <div class="item">
        <div class="title">文章分类</div>
        <ul class="tags-list">
          <li
            class="tags"
            v-for="(tag, index) in articleTagsList"
            :key="tag.tagId"
            @click="getTagArticles(tag.tagId)"
            :style="{
              backgroundColor: `rgba(${colorEnum[index % 3].bg})`,
              color: colorEnum[index % 3].color,
            }"
          >
            {{ tag.tagName }}
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">精选文章</div>
        <ul>
          <li
            class="latest-article-item"
            v-for="(article, index) in latestArticles"
            :key="article.article_id"
            @click="goToDetail(article.article_id)"
          >
            {{ index + 1 + "、" + article.title }}
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">最新留言</div>
        <div class="content">别急哦，程序员正在边抓头发边开发中~~~</div>
      </div>
      <div class="item" v-if="links.length > 0">
        <div class="title">折跃门</div>
        <ul>
          <li
            v-for="(link, i) in links"
            :key="i"
            class="text-tiny"
            style="text-indent: 10px"
          >
            <a :href="link.link" target="blank">{{ link.linkName }}</a>
          </li>
        </ul>
      </div>
      <div
        class="item"
        v-if="
          connectInfo.qqQrUrl ||
          connectInfo.wechatQrUrl ||
          connectInfo.weiboQrUrl
        "
      >
        <div class="title">此时一位不愿透露姓名的靓仔留下了他的联系方式</div>
        <div class="contact">
          <img :src="connectInfo.qqQrUrl" v-if="connectInfo.qqQrUrl" />
          <img :src="connectInfo.wechatQrUrl" v-if="connectInfo.wechatQrUrl" />
          <img :src="connectInfo.weiboQrUrl" v-if="connectInfo.weiboQrUrl" />
        </div>
      </div>
    </div>

    <div class="btn-close-sidebar" @click="sideBarIsShow = !sideBarIsShow">
      <i
        class="iconfont"
        :class="sideBarIsShow ? 'icon-dbright' : 'icon-bdleft'"
      ></i>
    </div>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
import { getLinks } from "@/api/modules/links";
import { getConnectInfo } from "@/api/modules/connect";
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
const shici = require("jinrishici");

export default {
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
      showPoetryIndex: 0,
      articleTagsList: [],
      latestArticles: [],
      // 友链
      links: [],
      colorEnum: [
        { bg: "255, 107, 129, 0.3", color: "#fff" },
        { bg: "123, 237, 159, 0.3", color: "#fff" },
        { bg: "83, 82, 237, 0.3", color: "#fff" },
      ],
      showIt: true,
      sideBarIsShow: false,
      getDateTimer: null,
      changeTimer: null,
      // 时区
      timeZone: "",
      connectInfo: {
        qqQrUrl: null,
        wechatQrUrl: null,
        weiboQrUrl: null,
      },
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
      console.log(data);
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
      this.$EventBus.$emit("getTagArticles", id);
    },
    goToDetail(id) {
      this.$router.push({
        path: `article`,
        query: {
          id,
        },
      });
    },
    showSideBar() {},
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
    this.loadShici();
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
