<template>
	<div class="side-bar">
		<div class="item">1</div>
		<div class="item">2</div>
		<div class="item">3</div>
		<div class="item">4</div>
	</div>
</template>

<script>
import { getArticleTagList } from "@/api/modules/article"
import useridIns from "@/utils/userid";

export default {
    data() {
        return {
            articleTagsList: []
        }
    },
    methods: {
        async getArticleTagsList() {
			const userid = useridIns.getUserId();
			const res = await getArticleTagList({ bloggerId: userid, });
			this.articleTagsList = res.data.records;
            console.log(this.articleTagsList);
		},
    },
    created() {
        this.getArticleTagsList();
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
		height: 400px;
		border-radius: 0.3rem;
		background-color: rgba(255, 255, 255, 0.3);
	}
}
</style>