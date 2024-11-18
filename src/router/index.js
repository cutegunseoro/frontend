import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RecordView from '@/views/RecordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegistView from '@/views/auth/RegistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/regist",
      name: "regist",
      component: RegistView
    },

    {
      path: "/record",
      name: "record",
      component: RecordView,
    },

    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    }
  ],
})

export default router
