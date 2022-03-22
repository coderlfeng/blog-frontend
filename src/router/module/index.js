import _ from "lodash";

const routes = [
  {
    path: "showcase",
    name: "showcase",
    component: () =>
      import(
        /* webpackChunkName: "showcase" */ "@/components/showcase/index.vue"
      ),
  },
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
  {
    path: "album",
    name: "album",
    component: () =>
      import(/* webpackChunkName: "album" */ "@/views/album/index.vue"),
  },
  {
    path: "allarticle",
    name: "allarticle",
    component: () =>
      import(/* webpackChunkName: "allArticle" */ "@/views/allArticle/index.vue"),
  },
];

export default (user) => {
  let dyn_routes = _.cloneDeep(routes);
  dyn_routes.forEach((route) => (route.name = `${user}_${route.name}`));
  return dyn_routes;
};
