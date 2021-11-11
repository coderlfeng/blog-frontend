import Vue from "vue";
import VueRouter from "vue-router";
import lifeng_routes from "./lifeng/index"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/lifeng",
    component: () => import('@/views/home/index.vue'),
    children: [
      ...lifeng_routes
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
