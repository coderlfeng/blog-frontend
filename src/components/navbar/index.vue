<template>
	<div class="nav">
		<header
			class="navbar"
			:style="{
				boxShadow: isShowMenu
					? 'null'
					: '0px 4px 4px 0px rgba(0, 0, 0, .12)',
			}"
		>
			<div class="nav-avatar-container">
				<img class="nav-avatar" :src="avatar" />
				<span class="concise-desc" :style="{ color: '#000' }">{{
					conciseDesc
				}}</span>
			</div>
			<ul class="menu">
				<li class="menu-item" @click="handlePath('allarticle')">文章</li>
				<li class="menu-item">相册</li>
			</ul>
			<i class="iconfont icon-list" @click.stop="changeMenuShow"></i>
		</header>
		<transition name="height">
			<ul
				class="nav-menu"
				v-if="isShowMenu"
			>
				<li class="" @click="handlePath('allarticle')">文章</li>
				<li class="">相册</li>
			</ul>
		</transition>
	</div>
</template>

<script>
import isPC from '@/utils/isPC'
if(isPC()) {
  import("./index-PC.less")
}else {
  import("./index-mobile.less")
}

import searchInput from "@/components/search-input/index.vue";

export default {
	props: ["avatar", "conciseDesc"],
	components: {
		searchInput,
	},
	data() {
		return {
			isShowMenu: false,
		};
	},
	created() {
		// console.log(this.avatar);
	},
	methods: {
		changeMenuShow() {
			this.isShowMenu = !this.isShowMenu;
		},
		handlePath(path) {
			this.$router.push({
				path,
			});
		},
	},
};
</script>

<style lang="less">
</style>
