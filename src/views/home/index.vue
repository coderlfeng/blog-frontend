<template>
    <div class="home">
        <showCase />
        <section class="home-main">
            溜了溜了
        </section>
    </div>
</template>

<script>
import showCase from "@/components/showcase/index"
    export default {
        name: 'home',
        components: {
            showCase
        },
        data() {
            return {
                home: {
                    backgroundImage: "url(" + require("@/assets/images/home.jpg") + ")",
                    backgroundPosition: 'center'
                }
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    .home-main {
        height: 1000px;
        scroll-snap-align: start;
    }
}
</style>