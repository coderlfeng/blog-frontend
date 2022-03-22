<template>
  <div class="--control-item">
    <slot></slot>
  </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}
export default {

};
</script>

<style lang="less" scoped></style>
