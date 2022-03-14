import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    component: About,
  },

  //Student routes

  {
    path: "/student",
    name: "StudentHome",
    component: () => import("../views/Students/StudentHome.vue"),
  },

  {
    path: "/student/signup",
    name: "StudentSignup",
    component: () => import("../views/Students/StudentSignup.vue"),
  },

  {
    path: "/student/login",
    name: "StudentLogin",
    component: () => import("../views/Students/StudentLogin.vue"),
  },
  {
    path: "/student/profileForm",
    name: "StudentProfileForm",
    component: () =>
      import("../views/Students/StudentProfileForm.vue"),
  },

  //Business routes

  {
    path: "/business",
    name: "BusinessHome",
    component: () => import("../views/Businesses/BusinessHome.vue"),
  },

  {
    path: "/business/signup",
    name: "BusinessSignup",
    component: () => import("../views/Businesses/BusinessSignup.vue"),
  },

  {
    path: "/business/login",
    name: "BusinessLogin",
    component: () => import("../views/Businesses/BusinessLogin.vue"),
  },

  {
    path: "/business/profileForm",
    name: "BusinessProfileForm",
    component: () => import("../views/Businesses/BusinessProfileForm.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
