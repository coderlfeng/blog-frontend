<template>
  <!-- 此组件只有在移动端上展示 -->
  <div :class="{ 'menu-drawer': true, active: active ? true : false }">
    <div class="drawer-left" @click="$emit('update:active', false)"></div>
    <div class="drawer-right">
      <!-- 菜单 -->
      <ul class="fun-menu">
        <li class="fun-item" @click="handlePath('allarticle')">文章</li>
      </ul>
      <component
        v-for="controlId in controls"
        :is="ID2C(controlId)"
        :key="controlId"
      />
    </div>
  </div>
</template>

<script>
import "./drawer.less";
import ID2C from "@/constants/side-components";
import articleType from "@/components/cards/articleType/index.vue";
import articleHot from "@/components/cards/articleHot/index.vue";
import links from "@/components/cards/links/index.vue";
import connect from "@/components/cards/connect/index.vue";
import timeControl from "@/components/cards/timeControl/index.vue";
import message from "@/components/cards/message/index.vue";
import introduce from "@/components/cards/introduce/index.vue";
export default {
  props: {
    active: {
      type: Boolean,
    },
  },
  components: {
    articleType,
    articleHot,
    links,
    connect,
    timeControl,
    message,
    introduce,
  },
  data() {
    return {
      ID2C,
      controls: [1, 2, 3, 4, 5, 7],
    };
  },
  methods: {
    handlePath(path) {
      this.$router.push(path);
    },
  },
};
</script>
