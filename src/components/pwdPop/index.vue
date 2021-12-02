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
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.pwdPop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .model {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 13px;
    box-sizing: border-box;
  }
  .cancel {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 15px;
    right: 15px;
  }
  .header {
    width: 100%;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .__default_footer {
    text-align: right;
    margin-top: 15px;
  }
}
</style>
