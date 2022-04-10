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
    name: "About",
    component: About,
  },

  //Student routes

  {
    path: "/student/home",
    name: "StudentHomePage",
    component: () => import("../views/Students/StudentHomePage.vue"),
  },

  {
    path: "/student/about",
    name: "StudentAbout",
    component: () => import("../views/Students/StudentAbout.vue"),
  },
  {
    path: "/student/signup",
    name: "StudentSignup",
    component: () => import("../views/Students/StudentSignup.vue"),
  },

  {
    path: "/student/searchresult/:searched",
    name: "StudentSearchResult",
    component: () => import("../views/Students/StudentSearchResult.vue"),
  },

  {
    path: "/student/searchresult2/:searched",
    name: "StudentSearchResult2",
    component: () => import("../views/Students/StudentSearchResult2.vue"),
  },

  {
    path: "/project",
    name: "IndividualProjectInfo",
    component: () => import("../views/Businesses/IndividualProjectInfo.vue"),
  },
  {
    path: "/project/new_apps",
    name: "IndividualProjectNewApps",
    component: () => import("../views/Businesses/IndividualProjectNewApps.vue"),
  },
  {
    path: "/project/acc_apps",
    name: "IndividualProjectAccApps",
    component: () => import("../views/Businesses/IndividualProjectAccApps.vue"),
  },
  {
    path: "/project/rej_apps",
    name: "IndividualProjectRejApps",
    component: () => import("../views/Businesses/IndividualProjectRejApps.vue"),
  },
  {
    path: "/project/student_profileInfo",
    name: "BusinessViewStudentInfo",
    component: () => import("../views/Businesses/BusinessViewStudentInfo.vue"),
  },
  {
    path: "/project/student_projectinfo",
    name: "StudentViewProjectInfo",
    component: () => import("../views/Students/StudentViewProjectInfo.vue"),
  },
  {
    path: "/project/business_editproj",
    name: "BusinessEditProject",
    component: () => import("../views/Businesses/BusinessEditProject.vue"),
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
    meta: {
      auth: true,
    },
  },
  {
    path: "/student/navBar",
    name: "StudentNavBar",
    component: () => import("../components/StudentNavBar.vue"),
  },
  {
    path: "/student/landingpage",
    name: "StudentLandingPage",
    component: () => import("../views/Students/StudentLandingPage.vue"),
  },
  {
    path: "/student/inprogress",
    name: "StudentInProgressProjects",
    component: () => import("../views/Students/StudentInProgressProjects.vue"),
  },
  {
    path: "/student/completed",
    name: "StudentCompletedProjects",
    component: () => import("../views/Students/StudentCompletedProjects.vue"),
  },
  {
    path: "/student/landingpage",
    name: "StudentLandingPage",
    component: () => import("../views/Students/StudentLandingPage.vue"),
  },
  {
    path: "/student/offeredapplications",
    name: "OfferedApplications",
    component: () => import("../views/Students/OfferedApplications.vue"),
  },
  {
    path: "/student/pendingapplications",
    name: "PendingApplications",
    component: () => import("../views/Students/PendingApplications.vue"),
  },
  {
    path: "/student/rejectedapplications",
    name: "RejectedApplications",
    component: () => import("../views/Students/RejectedApplications.vue"),
  },
  {
    path: "/student/management",
    name: "StudentManagement",
    component: () => import("../views/Students/StudentManagement.vue"),
  },
  {
    path: "/student/managementloading",
    name: "managementLoading",
    component: () => import("../components/managementLoading.vue"),
  },
  {
    path: "/business/managementloading",
    name: "businessManagementLoading",
    component: () => import("../components/businessManagementLoading.vue"),
  },
  {
    path: "/student/management/ToDo:taskId",
    name: "ToDoView",
    component: () => import("../views/Students/ToDoView.vue"),
  },
  {
    path: "/student/applyconfirm",
    name:"ApplyConfirm",
    component: () => import("../components/ApplyConfirm.vue")
  }, 
  //Business routes
  {
    path: "/business/inprogress",
    name: "BusinessInProgress",
    component: () => import("../views/Businesses/BusinessInProgress.vue"),
  },

  {
    path: "/business/about",
    name: "BusinessAbout",
    component: () => import("../views/Businesses/BusinessAbout.vue"),
  },

  {
    path: "/business/home",
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
    path: "/business/verify",
    name: "BusinessVerify",
    component: () => import("../components/VerifyEmail.vue"),
  },

  {
    path: "/business/loading",
    name: "businessLoading",
    component: () => import("../components/GoogleLoading.vue"),
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
    path: "/business/management",
    name: "BusinessManagement",
    component: () => import("../views/Businesses/BusinessManagement.vue"),
  },
  {
    path: "/business/management/ToDo:taskId",
    name: "BusinessToDoView",
    component: () => import("../views/Businesses/BusinessToDoView.vue"),
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
