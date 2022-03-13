import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
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
    path: '/ProfileForm',
    name: 'ProfileForm',
    component: () => import('../views/ProfilePage/ProfileForm.vue')
  },
  {
    path: '/forgetpassword',
    name: 'forgetPassword',
    component: () => import('../views/ForgetPassword.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
