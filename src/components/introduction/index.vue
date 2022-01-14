<template>
	<div class="introduction w-full p-2">
        <div class="icon-list icon-list-top">
            <img src="@/assets/images/arrow-bottom-dot.png">
            <img src="@/assets/images/arrow-bottom-dot.png">
            <img src="@/assets/images/arrow-bottom-dot.png">
        </div>
        <p class="introduction-contnet text-base">{{blogInfo.detailDesc}}</p>
        <div class="icon-list icon-list-bottom">
            <img src="@/assets/images/arrow-bottom-dot.png">
            <img src="@/assets/images/arrow-bottom-dot.png">
            <img src="@/assets/images/arrow-bottom-dot.png">
        </div>
    </div>
</template>

<script>
import { getBlogInfo } from "@/api/modules/home";
import useridIns from "@/utils/userid";

export default {
	data() {
		return {
            blogInfo: {}
        };
	},
	methods: {
		async getBlogInfo() {
			const userid = useridIns.getUserId();
			const res = await getBlogInfo({ id: userid });
			this.blogInfo = res.data;
		},
	},
    created() {
        this.getBlogInfo();
    }
};
</script>

<style lang="less" scoped>
.introduction {
	height: 30vh;
	background: url(../../assets/images/m-bg2.jpg) center no-repeat;

    .icon-list{
        display: flex;
        margin-bottom: 1rem;

        img{
            width: 1.5rem;
            height: 1.5rem;
            transform: rotateZ(-90deg);
        }
    }

    .icon-list-bottom{
        justify-content: flex-end;

        img{
            width: 1.5rem;
            height: 1.5rem;
            transform: rotateZ(90deg);
        }
    }

    .introduction-contnet{
        text-indent: 1.2rem;
    }
}
</style>