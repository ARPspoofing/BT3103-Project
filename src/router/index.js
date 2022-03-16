import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import StudentHomePage from "@/views/Students/StudentHomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/",
    name: "StudentHomePage",
    component: StudentHomePage,
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
    path: "/project",
    name: "IndividualProjectInfo",
    component: () => import("../views/IndividualProjectInfo.vue"),
  },
  {
    path: "/project/new_apps",
    name: "IndividualProjectNewApps",
    component: () => import("../views/IndividualProjectNewApps.vue"),
  },
  {
    path: "/project/acc_apps",
    name: "IndividualProjectAccApps",
    component: () => import("../views/IndividualProjectAccApps.vue"),
  },
  {
    path: "/project/rej_apps",
    name: "IndividualProjectRejApps",
    component: () => import("../views/IndividualProjectRejApps.vue"),
  },

  {
    path: "/student/login",
    name: "StudentLogin",
    component: () => import("../views/Students/StudentLogin.vue"),
  },
  {
    path: "/student/profileForm",
    name: "StudentProfileForm",
    component: () => import("../views/Students/StudentProfileForm.vue"),
  },

  {
    path: "/student/landingpage",
    name: "StudentLandingPage",
    component: () => import("../views/Students/StudentLandingPage.vue"),
  },

  //Business routes
  {
    path: "/business/inprogress",
    name: "BusinessInProgress",
    component: () => import("../views/Businesses/BusinessInProgress.vue"),
  },

  {
    path: "/student/signup",
    name: "StudentSignup",
    component: () => import("../views/Students/StudentSignup.vue"),
  },

  {
    path: "/business",
    name: "BusinessHomePage",
    component: () => import("../views/Businesses/BusinessHomePage.vue"),
  },
  {
    path: "/business/completed",
    name: "BusinessCompleted",
    component: () => import("../views/Businesses/BusinessCompleted.vue"),
  },

  {
    path: "/business/add_project",
    name: "BusinessAddProject",
    component: () => import("../views/Businesses/BusinessAddProject.vue"),
  },

  {
    path: "/business/home",
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

  {
    path: "/business/landingpage",
    name: "BusinessLandingPage",
    component: () => import("../views/Businesses/BusinessLandingPage.vue"),
  },

  {
    path: "/:catchall(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
