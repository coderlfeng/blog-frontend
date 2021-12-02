import Vue from "vue";
import message from "./index.vue";

const messageConstructor = Vue.extend(message);

const showMessage = ({ type, content, duration = 2000 }) => {
    // 创建一个message组件
  const messageDom = new messageConstructor({
    el: document.createElement("span"),
    data() {
      return {
        isShow: true, // 是否显示
        content, // 文本内容
        type, // 类型
      };
    },
  });
  // 把这个组件插入body
  if (document.body.append) {
    document.body.append(messageDom.$el);
  } else {
    document.body.appendChild(messageDom.$el);
  }
  // 超过时间后，销毁message组件
  setTimeout(() => {
    messageDom.isShow = false
  }, duration)
};

export default {
    install(Vue, option) {
        Vue.prototype.$message = showMessage
    }
}
