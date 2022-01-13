<template>
	<div class="allarticle box-border" ref="allarticle" @click="hideMenu" @scroll="hideMenu">
		<div class="allarticle-container">
			<nav-bar
				:avatar="blogInfo.avatar"
				:concise-desc="blogInfo.conciseDesc"
				ref="navbar"
			/>
			<introduction></introduction>
            <div class="allarticle-main">
                <articleList></articleList>
                <sideBar></sideBar>
            </div>
		</div>

		<div class="toTop" :class="showToTop ? 'toTop-show' : ''" @click="toTop">
			<div class="line"></div>
			<div class="text">toTop</div>
			<img src="../../assets/images/toTop.png">
		</div>
	</div>
</template>

<script>
import showCase from "@/components/showcase/index";
import navBar from "@/components/navbar/index.vue";
import introduction from "@/components/introduction/index.vue";
import articleList from "./components/articleList.vue"
import sideBar from "./components/sideBar.vue"

import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

export default {
	name: "allarticle",
	components: {
		showCase,
		navBar,
		introduction,
        articleList,
        sideBar
	},
	data() {
		return {
			home: {
				backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
				backgroundPosition: "center",
			},
			blogInfo: {},
			showToTop: false,
			toTopTimer: null
		};
	},
	created() {
		this.getBlogInfo();
	},
	methods: {
		async getBlogInfo() {
			const userid = useridIns.getUserId();
			const res = await getBlogInfo({ id: userid });
			this.blogInfo = res.data;
		},
		hideMenu() {
			this.$refs.navbar && this.$refs.navbar.hideMenu();
			if(this.$refs.allarticle.scrollTop > 400) {
				this.showToTop = true;
			}else {
				this.showToTop = false;
			}
		},
		// 回到顶部
		toTop() {
			this.showToTop = false;
			let h = this.$refs.allarticle.scrollTop;
			this.toTopTimer = setInterval(() => {
				h -= 100;
				this.$refs.allarticle.scrollTo(0, h);
				if(h <= 0) {
					clearInterval(this.toTopTimer);
					return;
				};
			}, 20)
		}
	},
};
</script>

<style lang="less" scoped>
.allarticle {
	height: 100vh;
	overflow-y: scroll;
	background: url("../../assets/images/bg1.jpg") no-repeat;
	background-size: cover;
	background-position: center;
	@media only screen and (max-width: 1000px) {
		.allarticle-container {
			backdrop-filter: blur(1px);
		}
	}
	@media only screen and (min-width: 1000px) {
		padding: 0 10%;
		box-sizing: border-box;
		background: url("../../assets/images/bg1.jpg") no-repeat;
		.allarticle-container {
			backdrop-filter: blur(20px);
			box-shadow: 15px 0 20px -1px rgba(255, 255, 255, 0.3),
				-15px 0 20px -1px rgba(255, 255, 255, 0.3);
		}
	}

    .allarticle-main{
        display: flex;
    }

	.toTop{
		position: fixed;
		bottom: 10vh;
		transform: translateY(-90vh);
		right: 1vw;
		width: 5vw;
		cursor: pointer;
		z-index: 9999;
		transition: all .5s;

		.line{
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%) translateY(-100%);
			width: 1px;
			height: 90vh;
			border: 1px solid #ccc;
			z-index: 99;
		}

		.text{
			display: none;
			position: absolute;
			top: 52%;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.4rem;
			color: #fff;
		}

		&:hover .text{
			display: block;
		}
	}

	.toTop-show{
		transform: translateY(0vh);
	}
}
</style>
