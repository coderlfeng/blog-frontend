<template>
    <div class="footer-container">
      <p>{{new Date().getFullYear()}} &copy; EXCELLENTLLD ==== share and enjoy</p>
      <p>蜀ICP备2021028558号</p>
      <p>本站原创内容转载请注明来源</p>
    </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less")
} else {
  import("./index-mobile.less")
}

export default {
    
}
</script>

<style lang="less" scoped>
</style>