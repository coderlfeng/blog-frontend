<template>
  <transition name="fade">
    <div
      class="pwdPop"
      :style="{
        backgroundColor: showMask ? 'rgba(0,0,0,0.6)' : '',
      }"
      v-show="visible"
      @click="hideByMask && hide()"
    >
      <!-- 弹框组件 -->
      <div :style="{ width }" class="model" @click.stop>
        <img src="@/assets/images/cancel.png" class="cancel" @click="hide" />
        <slot name="header">
          <div class="header">{{ title }}</div>
        </slot>
        <slot> </slot>
        <slot name="footer">
          <div class="__default_footer">
            <lf-button type="primary" round @click="confirm">确认</lf-button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
	import("./index-PC.less");
} else {
	import("./index-mobile.less");
}

import lfButton from "@/components/button/index";
export default {
  components: {
    lfButton,
  },
  props: {
    width: {
      type: String,
      default: () => "400px",
    },
    showMask: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "title",
    },
    hideByMask: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="less" scoped>
</style>
