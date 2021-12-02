<template>
  <transition name="transform">
    <span
      v-if="isShow"
      class="message"
      :style="{
        backgroundColor: showOpt.bgcolor,
        color: showOpt.color,
        border: `1px solid ${showOpt.border}`,
      }"
    >
      <img :src="showOpt.icon" />
      <span>{{ content }}</span>
    </span>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      content: "",
      type: "",
    };
  },
  computed: {
    showOpt() {
      let obj = {
        bgcolor: "",
        color: "",
        border: "",
      };
      switch (this.type) {
        case "error":
          obj.bgcolor = "#fef0f0";
          obj.color = "#f66c81";
          obj.border = "#fde3e3";
          obj.icon = require("@/assets/images/error.png")
          break;
        case "success":
          obj.bgcolor = "#f0f9eb";
          obj.color = "#67c28a";
          obj.border = "#e1f3d8";
          obj.icon = require("@/assets/images/success.png")
          break;
        case "warning":
          obj.bgcolor = "#fdf6ec";
          obj.color = "#efb43c";
          obj.border = "#faecd8";
          obj.icon = require("@/assets/images/warning.png")
          break;
        default:
          obj.bgcolor = "#edf2fc";
          obj.color = "#909399";
          obj.border = "#ebeef5";
          obj.icon = require("@/assets/images/info.png")
          break;
      }
      return obj;
    },
  },
  watch: {
    isShow(val) {
      setTimeout(() => {
        this.$destroy();
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  top: 6%;
  left: 50%;
  transform: translate(-50%);
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 7px;
  }
}
.transform-enter-active, .transform-leave-active {
  transition: all .3s ease-in-out;
}
.transform-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
.transform-enter {
    transform: translateX(-10px);
    opacity: 0;
}
.transform-enter-to {
    transform: translateX(0);
    opacity: 1;
}

</style>
