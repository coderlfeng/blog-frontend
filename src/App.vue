<template>
  <div id="app" @scroll="scrollHandle">
    <!-- <home /> -->
    <router-view />
  </div>
</template>

<script>
import home from "@/views/home/index.vue"
export default {
  components: {
    home
  },
  methods: {
    scrollHandle(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100vh;
}
</style>
