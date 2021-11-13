const routes = [
  {
    path: "home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
  },
  {
    path: "article",
    name: "article",
    component: () =>
      import(/* webpackChunkName: "article" */ "@/views/article/index.vue"),
  },
];

module.exports = routes;
