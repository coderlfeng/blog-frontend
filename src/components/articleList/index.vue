<template>
	<div class="article">
		<ul class="articles-list">
			<li
				v-for="(article, index) in articles"
				:key="article.article_id"
				class="article-item"
				:class="index < showNum ? article.isActive ? 'article-item-active' : '' : 'article-item-hide'"
				@mouseenter="article.isActive = true"
				@mouseleave="article.isActive = false"
				@click="goToDetail(article.article_id)"
			>
				<div class="left-side">
					<img :src="article.coverUrl" referrerpolicy="no-referrer" />
				</div>
				<div class="right-side">
					<ul class="tags-list" v-if="isPC">
						<li
							v-for="(tag, i) in article.tags"
							:key="tag.tagId"
							class="article-tag"
							:style="{
								backgroundColor: `rgba(${
									colorEnum[i % 3].bg
								})`,
								color: colorEnum[i % 3].color,
							}"
						>
							{{ tag.tagName }}
						</li>
					</ul>
					<ul class="tags-list" v-if="!isPC">
						<li
							class="article-tag"
							:style="{
								backgroundColor: `rgba(${colorEnum[0].bg})`,
								color: colorEnum[0].color,
							}"
						>
							{{ article.tags[0].tagName }}
						</li>
						<li class="article-tag-more" v-if="article.tags.length > 1">
							<span>+{{article.tags.length - 1}}</span> 
							<!-- <i class="iconfont icon-right"></i> -->
							<!-- <ul class="tags-sub-list">
								<li
									v-for="(subTag, i) in article.tags"
									:key="subTag.tagId"
									class="article-sub-tag"
									:style="{
										backgroundColor: `rgba(${colorEnum[i % 3].bg})`,
										color: colorEnum[i % 3].color,
									}"
								>
									{{ subTag.tagName }}
								</li>
							</ul> -->
						</li>
					</ul>
					<p class="article-title">
						{{ article.title }}
					</p>
					<div class="article-subTitle">
						{{ article.subTitle }}
					</div>
					<div class="article-info">
						<span class="">更新于：{{ article.updateTime | formatTime }}</span>
					</div>
				</div>
			</li>
		</ul>
		<LPagination
			v-if="showPage"
			:total="total"
			:size="size"
			:currentPage="currentPage"
			layout="total, jumper"
			@current-change="handelCurrentChange"
		/>
	</div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
	import("./index-PC.less");
} else {
	import("./index-mobile.less");
}

import { getArticles } from "@/api/modules/home";
import useridIns from "@/utils/userid";
import { normalizeDate } from "@/utils/time";

import LPagination from "@/components/pagination/index.vue";

export default {
	data() {
		return {
			size: 10,
			currentPage: 1,
			total: 0,
			articles: [],
			colorEnum: [
				{ bg: "255, 107, 129, 0.3", color: "#fff" },
				{ bg: "123, 237, 159, 0.3", color: "#fff" },
				{ bg: "83, 82, 237, 0.3", color: "#fff" },
			],
			isPC: true,
			showNum: 0,
		};
	},
	components: {
		LPagination,
	},
	props: {
		scrollBox: {
			type: String,
		},
		showPage: {
			type: Boolean
		}
	},
	methods: {
		async getArticles(tagId) {
			const userid = useridIns.getUserId();
			const res = await getArticles({
				bloggerId: userid,
				page: this.currentPage,
				limit: this.size,
				articleTitle: "",
				sortType: 1,
				tagId: tagId,
			});
			this.articles = res.data.records;
			this.total = res.data.total;
			this.articles.forEach((v, i) => {
				this.$set(this.articles[i], "isActive", false);
			});

			this.$nextTick(() => {
				document.querySelector(`.${this.scrollBox}`).scrollTo(0, 0);
				this.scrollToMore();
				this.handelScroll();
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
		scrollToMore() {
			let body_H = document.querySelector("body").offsetHeight;
			let navBar_H = document.querySelector(".navbar").offsetHeight;
			let introduction_H =
				document.querySelector(".introduction").offsetHeight;
			let articleItem_H =
				document.querySelectorAll(".article-item")[0].offsetHeight;
			let articleSide_H = body_H - navBar_H - introduction_H;
			this.showNum = Math.ceil(articleSide_H / (articleItem_H + 32));
		},
		handelScroll() {
			document
				.querySelector(`.${this.scrollBox}`)
				.addEventListener("scroll", () => {
					let articleItemsList =
						document.querySelectorAll(".article-item");
					for (let i = 0; i < articleItemsList.length; i++) {
						if (i >= this.showNum) {
							articleItemsList[i].offsetTop -
								document.querySelector(`.${this.scrollBox}`)
									.scrollTop -
								(document.querySelector("body").offsetHeight /
									100) *
									12.5 <=
							document.querySelector("body").offsetHeight
								? (this.showNum = i + 1)
								: (this.showNum = this.showNum);
						}
					}
				});
		},
		handelCurrentChange(val) {
			this.currentPage = val;
			this.getArticles();
		},
	},
	filters: {
		formatTime(val) {
			return normalizeDate(val);
		},
	},
	created() {
		this.isPC = isPC();
		this.getArticles();
		this.$EventBus.$on("getTagArticles", (id) => {
			this.getArticles(id);
		});
	},
};
</script>

<style lang="less" scoped>
</style>
