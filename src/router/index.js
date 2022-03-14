import { createRouter, createWebHashHistory } from 'vue-router'
import StudentHomePage from '@/views/StudentHomePage.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    name: 'StudentHomePage',
    component: StudentHomePage
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/business',
    name: 'BusinessHomePage',
    component: () => import('../views/BusinessHomePage.vue')
  },
  {
    path: '/business/inprogress',
    name: 'BusinessInProgress',
    component: () => import('../views/BusinessInProgress.vue')
  },
  {
    path: '/business/completed',
    name: 'BusinessCompleted',
    component: () => import('../views/BusinessCompleted.vue')
  },
  {
    path: '/business/add_project',
    name: 'BusinessAddProject',
    component: () => import('../views/BusinessAddProject.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name:'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/:catchall(.*)',
    name:'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
