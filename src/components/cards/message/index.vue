<template>
  <layout>
    <div class="control-title">留言</div>
    <input type="text" v-model="message" />
    <button @click="sendMessage1">单独发送</button>
    <button @click="sendMessage2">广播</button>
  </layout>
</template>

<script>
import layout from "../layout/index.vue";
import useridIns from "@/utils/userid"

export default {
  components: { layout },
  data() {
    return {
      message: "",
    };
  },
  sockets: {
    message(msg) {
      console.log(msg, ">>>");
    }
  },
  methods: {
    sendMessage1() {
      const token = sessionStorage.getItem("io_token")
      this.$socket.emit("send-message", { message: this.message, token });
    },
    sendMessage2() {
      const token = sessionStorage.getItem("io_token")
      this.$socket.emit("send-message", { message: this.message });
    },
  },
};
</script>

<style lang="less" scoped></style>
