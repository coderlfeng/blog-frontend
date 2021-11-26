<template>
  <router-view />
</template>

<script>
import home from "@/views/home/index.vue";
export default {
  components: {
    home,
  },
};
</script>
<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
