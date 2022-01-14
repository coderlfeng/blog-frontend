<template>
	<div class="home-article px-2">
		<ul>
			<li
				v-for="(article, index) in articles"
				:key="article.article_id"
				class="flex article-item text-center py-2 px-2"
				:class="(index < showNum) ? (article.isActive ? 'article-item-active' : '') : 'article-item-hide'"
				@mouseenter="article.isActive = true"
				@mouseleave="article.isActive = false"
				@click="goToDetail(article.article_id)"
			>
				<div class="left-side">
					<img
						:src="article.coverUrl"
						referrerpolicy="no-referrer"
						class="rounded"
					/>
				</div>
				<div class="flex flex-col right-side">
					<ul
						class="
							flex
							justify-start
							items-center
							msm:hidden
							lg:flex
						"
					>
						<li
							v-for="(tag, index) in article.tags"
							:key="tag.tagId"
							class="
								article-tag
								rounded
								text-center
								leading-normal
								w-5
								text-tiny
							"
							:style="{
								backgroundColor: `rgba(${colorEnum[index % 3].bg})`,
								color: colorEnum[index % 3].color,
							}"
						>
							{{ tag.tagName }}
						</li>
					</ul>
					<p
						class="
							text-xl
							lg:text-base
							font-mono font-bold
							text-center
						"
					>
						{{ article.title }}
					</p>
					<div
						class="
							flex-1
							py-1
							article-subTitle
							text-tiny
							font-mono font-bold
							text-left
							overflow-hidden
						"
					>
						{{ article.subTitle }}
					</div>
					<div class="article-info flex">
						<span class="text-xs font-mono font-bold mr-2"
							>发布于：{{ article.createTime | formatTime }}</span
						>
						<span class="text-xs font-mono font-bold"
							>更新于：{{ article.updateTime | formatTime }}</span
						>
					</div>
				</div>
			</li>
		</ul>
		<LPagination :total="total" :size="size" :currentPage="currentPage" layout="total, jumper" @current-change="handelCurrentChange"/>
	</div>
</template>

<script>
import { getArticles } from "@/api/modules/home";
import useridIns from "@/utils/userid";
import { format } from "@/utils/time";

import LPagination from "@/components/pagination/index.vue"

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
			showNum: 0
		};
	},
	components: {
		LPagination,
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
				tagId: tagId
			});
			this.articles = res.data.records;
			this.total = res.data.total;
			this.articles.forEach((v, i) => {
				this.$set(this.articles[i], 'isActive', false);
			})

			this.$nextTick(() => {
				document.querySelector('.allarticle').scrollTo(0, 0);
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
			let navBar_H = document.querySelector('.navbar').offsetHeight;
			let introduction_H = document.querySelector('.introduction').offsetHeight;
			let articleItem_H = document.querySelectorAll(".article-item")[0].offsetHeight;
			let articleSide_H = body_H - navBar_H - introduction_H;
			this.showNum = Math.ceil(articleSide_H / (articleItem_H + 32));
		},
		handelScroll() {
			document.querySelector('.allarticle').addEventListener('scroll', () => {
				let articleItemsList = document.querySelectorAll(".article-item");
				for(let i = 0; i < articleItemsList.length; i ++) {
					if(i >= this.showNum) {
						(articleItemsList[i].offsetTop - document.querySelector('.allarticle').scrollTop - document.querySelector("body").offsetHeight / 100 * 12.5) <= document.querySelector("body").offsetHeight ? (this.showNum = i + 1) : this.showNum = this.showNum
					}
				}
			})
		},
		handelCurrentChange(val) {
			this.currentPage = val;
			this.getArticles();
		}
	},
	filters: {
		formatTime(val) {
			return format(val);
		},
	},
	created() {
		this.getArticles();
		this.$EventBus.$on('getTagArticles', id => {
			this.getArticles(id)
		});
	}
};
</script>

<style lang="less" scoped>
.home-article {
	width: 75%;

	.article-item {
		margin: 1rem 0;
		height: 25vh;
		border-radius: 0.4rem;
		background-color: #dfdfdf;
		box-shadow: 0px 0px 6px #ccc;
		transform: scale(1);
		transform-origin: center;
		transition: all .8s;
		cursor: pointer;

		.left-side {
			width: 35%;
			height: 100%;
			text-align: center;

			img {
				margin: 0 auto;
				height: 100%;
				border-radius: .4rem;
				transform: scale(1);
				transform-origin: center;
				transition: all .6s;
			}
		}

		.right-side {
			padding: 0 0 0 0.4rem;
			width: 65%;

			.article-subTitle{
				text-indent: 1rem;
			}
		}

		.article-info {
			width: 100%;
		}
	}
	.article-item-active{
		box-shadow: 0px 0px 12px #ccc;
		.left-side img{
			transform: scale(1.05);
			transform-origin: center;
		}
	}
	.article-item-hide{
		margin: calc(~"1rem + 12.5vh") auto;
		transform-origin: center;
		transform: scale(0.1);
		transition: all .8s;
	}

	.section-title {
		font-family: "微软雅黑";
	}
	.articleCover {
		object-fit: contain;
		margin: 0.5rem auto;
		height: 200px;
	}
	.article {
		cursor: pointer;
		transition: all 0.5s;
		&:hover {
			backdrop-filter: blur(4px);
		}
	}
	.article-tag {
		margin: 0.3rem 0.15rem;
	}
	@media screen and (max-width: 750px) {
		.recent-title {
			font-size: 1.8rem;
		}
		.articleInfo {
			color: #eee;
		}
	}
	@media screen and (min-width: 1000px) {
		.recent-title {
			font-size: 0.65rem;
		}
		.article-tag {
			margin: 0.11rem .15rem;
		}
		.articleInfo {
			color: #eee;
		}
	}
}
</style>
