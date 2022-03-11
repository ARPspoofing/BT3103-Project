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
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name:'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
