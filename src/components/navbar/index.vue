<template>
  <header class="flex items-center justify-between px-4 py-3 bg-gray-400 navbar">
    <div>
      <img class="h-8 rounded-lg nav-avatar" :src="avatar" alt="MIRRORS" />
    </div>
    <div>
      <button
        type="button"
        class="text-gray-500 hover:text-white focus:text-white"
      >
        <svg
          class="fill-current text-white h-8 w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: ['avatar'],
  created() {
    console.log(this.avatar)
  }
};
</script>

<style lang="less">
.navbar {
  .nav-avatar {
    border-radius: 50%;
  }
}
</style>
