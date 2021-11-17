import Vue from "vue";
import VueRouter from "vue-router";
import module_routes from "./module/index"
import useridIns from "@/utils/userid"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "lifeng",
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: "lifeng",
        name: "lifeng",
        redirect: "lifeng/showcase",
        component: () => import('@/views/layout/index.vue'),
        children: [
          ...module_routes
        ],
      },
      {
        path: "liuhuan",
        name: "liuhuan",
        redirect: "liuhuan/showcase",
        component: () => import('@/views/layout/index.vue'),
        children: [
          ...module_routes
        ],
      },
      {
        path: "dengyu",
        name: "dengyu",
        redirect: "dengyu/showcase",
        component: () => import('@/views/layout/index.vue'),
        children: [
          ...module_routes
        ],
      }
    ],
  },
  
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const newUser = to.path.split('/')[1]
  const oldUser = from.path.split('/')[1]
  newUser !== oldUser && useridIns.setByPath(to.path)
  next()
})

export default router;
