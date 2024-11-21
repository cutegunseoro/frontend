import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '@/views/IntroView.vue'
import HomeView from '@/views/HomeView.vue'
import PlanView from '@/views/PlanView.vue'
import AddView from '@/views/AddView.vue'
import RecordView from '@/views/RecordView.vue'
import CalendarView from '@/views/CalendarView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegistView from '@/views/auth/RegistView.vue'
import PlaybackView from '@/views/PlaybackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroView,
    },

    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },

    {
      path: "/plan",
      name: "plan",
      component: PlanView,
    },

    {
      path: "/add",
      name: "add",
      component: AddView,
    },

    {
      path: "/record",
      name: "record",
      component: RecordView,
    },

    {
      path: '/history',
      name: 'history',
      component: CalendarView,
    },

    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/regist",
      name: "regist",
      component: RegistView,
    },

    {
      path: "/playback",
      name: "playback",
      component: PlaybackView
    }

  ],
})

export default router
