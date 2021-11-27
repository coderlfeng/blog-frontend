<template>
  <header
    class="
      sticky
      top-0
      flex
      items-center
      justify-between
      px-4
      py-1
      lg:py-0
      font-mono
      navbar
    "
  >
    <div class="flex items-center">
      <img
        class="h-10 w-10 lg:h-3 lg:w-3 rounded-lg nav-avatar mr-3"
        :src="avatar"
      />
      <span class="lg:text-base">{{ conciseDesc }}</span>
    </div>
    <search-input />
    <ul class="flex msm:hidden lg:flex">
      <li class="text-base ml-4">文章</li>
      <li class="text-base ml-4">相册</li>
    </ul>
    <div class="lg:hidden">
      <button
        type="button"
        class="text-gray-500 hover:text-white focus:text-white"
        @click.stop="showMenu = true"
      >
        <svg
          class="fill-current text-white h-6 w-6 lg:h-2 lg:w-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"
          />
        </svg>
      </button>
      <transition name="fade">
        <ul
          class="absolute right-5 w-20 bg-white bg-opacity-75 shadow-sm menu "
          v-show="showMenu"
        >
          <li class="text-base leading-relaxed ml-4 text-center px-2 menu-list">
            文章
          </li>
          <li class="text-base leading-relaxed ml-4 text-center px-2 menu-list">
            相册
          </li>
        </ul>
      </transition>
    </div>
  </header>
</template>

<script>
import searchInput from "@/components/search-input/index.vue"
export default {
  props: ["avatar", "conciseDesc"],
  components: {
    searchInput
  },
  data() {
    return {
      showMenu: false,
    };
  },
  created() {
    console.log(this.avatar);
  },
  methods: {
    hideMenu() {
      this.showMenu = false;
    },
  },
};
</script>

<style lang="less">
.navbar {
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  .nav-avatar {
    border-radius: 50%;
  }
  .menu {
    &::before {
      position: absolute;
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 0.75rem solid transparent;
      border-bottom: 10px solid rgba(255, 255, 255, 0.6);
      top: -1.5rem;
      right: 1.1rem;
    }
    .menu-list {
      letter-spacing: 3px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
