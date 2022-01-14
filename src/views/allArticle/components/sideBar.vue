<template>
	<div class="side-bar">
		<div class="item text-tiny p-1.5">
			<div>下午好~~ 忙碌的打工人,停下来休息一下吧~</div>
			<div class="flex">
				<div class="text flex-1">
					<div>现在是 <span class="text-s">{{ date.solarDate }}</span></div>
					<p>{{ date.lunarDate }} {{ date.Term }}</p>
					<p>{{ date.festival }} {{ date.lunarFestival }}</p>
				</div>
				<img
					class="animals"
					:src="require(`@/assets/images/twelve-animals-${date.animalIndex}.png`)"
				/>
			</div>
			<transition name="fade">
				<div
					v-if="showIt"
					class="poetry flex flex-col justify-center rounded"
					:style="{
						backgroundColor: `rgba(${colorEnum[showPoetryIndex % 3].bg})`,
						color: colorEnum[showPoetryIndex % 3].color,
					}"
				>
					<p>{{ poetryArr[showPoetryIndex].content }}</p>
					<p class="text-right">-- {{ poetryArr[showPoetryIndex].author }}</p>
				</div>
			</transition>
		</div>
		<div class="item text-base p-1.5">
			<div class="title text-base mb-1">文章分类</div>
			<ul class="tags-list flex flex-wrap">
				<li
					class="tags py-0.5 px-2 m-1 text-tiny rounded"
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
		<div class="item text-base p-1.5">
			<div class="title text-base mb-1">精选文章</div>
			<ul>
				<li
					class="latest-article-item text-tiny truncate leading-3"
					v-for="(article, index) in latestArticles"
					:key="article.article_id"
					@click="goToDetail(article.article_id)"
				>
					{{ index + 1 + "、" + article.title }}
				</li>
			</ul>
		</div>
		<div class="item text-base p-1.5">
			<div class="title text-base">最新留言</div>
			<div class="content text-tiny leading-4">
				别急哦，程序员正在边抓头发边开发中~~~
			</div>
		</div>
		<div class="item text-base p-1.5">
			<div class="title text-base">折跃门</div>
			<ul>
				<li v-for="(link, i) in links" :key="i" class="text-tiny" style="text-indent: .5rem;">
					<a :href="link.url" target="blank">{{ link.name }}</a>
				</li>
			</ul>
		</div>
		<div class="item text-base p-1.5">
			<div class="title text-base">
				此时一位不愿透露姓名的靓仔留下了他的联系方式
			</div>
			<div class="contact flex">
				<img src="../../../assets/images/wechat.png">
				<img src="../../../assets/images/wechat.png">
			</div>
		</div>
	</div>
</template>

<script>
import { getArticles } from "@/api/modules/home";
import { getArticleTagList } from "@/api/modules/article";
import useridIns from "@/utils/userid";
import { normalizeDate } from "@/utils/time";
import calendar from "@/utils/calendar";

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
			poetryArr: [
				{
					author: "苏轼《望江南·超然台作》",
					content: "休对故人思故国，且将新火试新茶。诗酒趁年华。",
				},
				{
					author: "辛弃疾《贺新郎·甚矣吾衰矣》",
					content: "我见青山多妩媚，料青山见我应如是。",
				},
				{
					author: "王昌龄《从军行七首·其四》",
					content: "黄沙百战穿金甲，不破楼兰终不还。",
				},
				{
					author: "郑思肖《画菊》",
					content: "宁可枝头抱香死，何曾吹落北风中。",
				},
				{
					author: "陆游《冬夜读书示子聿》",
					content: "纸上得来终觉浅，绝知此事要躬行。",
				},
				{
					author: "李贺《南园十三首·其五》",
					content: "男儿何不带吴钩，收取关山五十州。",
				},
				{
					author: "杜荀鹤《小松》",
					content: "时人不识凌云木，直待凌云始道高。",
				},
				{
					author: "杜荀鹤《小松》",
					content: "时人不识凌云木，直待凌云始道高。",
				},
			],
			showPoetryIndex: 0,
			articleTagsList: [],
			latestArticles: [],
			links: [
				{
					name: "github",
					url: "https://github.com",
				},
				{
					name: "vue.js",
					url: "https://cn.vuejs.org",
				},
				{
					name: "react",
					url: "https://react.docschina.org/",
				},
				{
					name: "echarts",
					url: "https://echarts.apache.org/",
				},
				{
					name: "lodash.js",
					url: "https://www.lodashjs.com/",
				},
			],
			colorEnum: [
				{ bg: "255, 107, 129, 0.3", color: "#fff" },
				{ bg: "123, 237, 159, 0.3", color: "#fff" },
				{ bg: "83, 82, 237, 0.3", color: "#fff" },
			],
			showIt: true,
			getDateTimer: null,
			changeTimer: null
		};
	},
	methods: {
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

			if(this.getDateTimer) clearInterval(this.getDateTimer);
			this.getDateTimer = setInterval(() => {
				this.date.solarDate = normalizeDate(new Date()) + " " + res.ncWeek;
				if(normalizeDate(new Date()).substr(11, 8) == "00:00:00") {
					this.date.lunarDate = `${res.gzYear}年 ${res.IMonthCn} ${res.IDayCn}`;
					this.date.Term = res.Term;
					this.date.festival = res.festival;
					this.date.lunarFestival = res.lunarFestival;
					this.date.animalIndex = animalArr.indexOf(res.Animal);
				}
			}, 1000)
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
				tagId: ''
			});
			this.latestArticles = res.data.records;
		},
		getTagArticles(id) {
			this.$EventBus.$emit('getTagArticles', id);
		},
		goToDetail(id) {
			this.$router.push({
				path: `article`,
				query: {
					id,
				},
			});
		},
		changePoetry() {
			if(this.changeTimer) clearInterval(this.this.changeTimer);
			
			this.changeTimer = setInterval(async () => {
				this.showIt = false;
				this.showPoetryIndex = parseInt(Math.random()*(this.poetryArr.length),10);
				await setTimeout(() => {
					this.showIt = true;
				}, 100)
			}, 5000);
		}
	},
	created() {
		this.getDate();
		this.getArticleTagsList();
		this.getlatestArticles();
		this.changePoetry();
	},
	beforeDestroy() {
		clearInterval(this.getDateTimer);
		this.getDateTimer = null;
		clearInterval(this.changeTimer);
		this.changeTimer = null;
	}
};
</script>

<style lang="less" scoped>
.side-bar {
	padding: 0 0.5rem 0 0;
	width: 25%;

	.item {
		margin: 1rem 0;
		width: 100%;
		// height: 400px;
		border-radius: 0.3rem;
		background-color: rgba(255, 255, 255, 0.3);

		.animals {
			width: 2.2rem;
			height: 2.2rem;
		}

		.poetry{
			margin: 2vh 0 1vh;
			padding: 0.4rem 0.2rem;
		}

		.latest-article-item {
			cursor: pointer;

			&:hover {
				text-decoration: underline;
				color: rgb(192, 111, 36);
			}
		}

		.tags-list{
			.tags{
				cursor: pointer;
			}
		}

		.contact{
			margin-top: .5rem;

			img{
				margin-right: .5rem;
				width: 4rem;
				height: 4rem;
			}
		}
	}
}

.fade-enter-active, .fade-leave-active {
  transition: all 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>