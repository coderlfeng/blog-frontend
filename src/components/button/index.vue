<template>
  <button
    class="__button"
    v-on="$listeners"
    :style="{
      backgroundColor: btnBgColor,
      color: btnColor,
      borderRadius: round ? '100000px' : '',
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnBgColor() {
      let color = "#fff";
      switch (this.type) {
        case "primary":
          color = "#00a8ff";
          break;
        default:
          color = "#ffffff";
          break;
      }
      return color;
    },
    btnColor() {
      let color = "#fff";
      return color;
    },
  },
};
</script>

<style lang="less" scoped>
.__button {
  text-align: center;
  background-color: pink;
  font-size: 14px;
  padding: 3px 14px;
  // border-radius: 40px;
}
</style>
