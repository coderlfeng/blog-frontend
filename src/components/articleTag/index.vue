<template>
  <button class="--article-tag" v-on="$listeners">
    <slot name="default"></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.--article-tag {
  width: 90px;
  height: 28px;
  color: #fff;
  border-radius: 5px;
  font-weight: 500;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;

  border: none;
  color: rgba(0, 0, 0, 0.75);
  &:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  &:hover {
    color: #000;
  }
  &:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  &:active {
    top: 2px;
  }
}
</style>
