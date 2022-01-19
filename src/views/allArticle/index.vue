<template>
	<div
		class="home"
		ref="home"
		@click="hideMenu"
		@scroll="hideMenu"
	>
		<div class="home-container">
			<nav-bar
				:avatar="blogInfo.avatar"
				:concise-desc="blogInfo.conciseDesc"
				ref="navbar"
			/>
			<introduction/>
			<div class="home-main">
				<div class="home-main-right">
          			<articleList :showPage="true" :scrollBox="'home'"/>
        		</div>
				<sideBar/>
			</div>
		</div>

		<div
			class="toTop"
			:class="showToTop ? 'toTop-show' : ''"
			@click="toTop"
		>
			<div class="line"></div>
			<div class="text">toTop</div>
			<img :src="require('@/assets/images/toTop.png')" />
		</div>
	</div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less")
} else {
  import("./index-mobile.less")
}

import navBar from "@/components/navbar/index.vue";
import introduction from "@/components/introduction/index.vue";
import articleList from "@/components/articleList/index.vue"
import sideBar from "@/components/sideBar/index.vue"

import useridIns from "@/utils/userid";
import { getBlogInfo } from "@/api/modules/home";

export default {
	name: "home",
	components: {
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
      if(this.$refs.home.scrollTop > 400) {
				this.showToTop = true;
			}else {
				this.showToTop = false;
			}
		},
    // 回到顶部
		toTop() {
			this.showToTop = false;
			let h = this.$refs.home.scrollTop;
			this.toTopTimer = setInterval(() => {
				h -= 100;
				this.$refs.home.scrollTo(0, h);
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
</style>
