import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index.vue";
import Schedule from "../views/schedule/schedule.vue";
import Detail from "../views/detail/detail.vue";
import Upload from "../views/upload/upload.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/schedule",
    name: "schedule",
    component: Schedule,
  },
  {
    path: "/detail/:flowId",
    name: "detail",
    component: Detail,
  },
  {
    path: "/upload",
    name: "upload",
    component: Upload,
  },
  { path: "*", redirect: "/home" },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
