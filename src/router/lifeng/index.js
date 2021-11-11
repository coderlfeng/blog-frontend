const routes = [
  {
    path: "/lifeng",
    name: "home",
    redirect: "/lifeng/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
      },
    ],
  },
];

module.exports = routes;
