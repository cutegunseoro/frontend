import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '@/views/IntroView.vue'
// auth tab
import LoginView from '@/views/auth/LoginView.vue'
import RegistView from '@/views/auth/RegistView.vue'
// home tab
import HomeView from '@/views/HomeView.vue'
// plan tab
import PlanView from '@/views/plan/PlanView.vue'
import PlanAreaView from '@/views/plan/PlanAreaView.vue'
import PlanPeriodView from '@/views/plan/PlanPeriodView.vue'
// camera tab
import RecordView from '@/views/camera/RecordView.vue'
import PlaybackView from '@/views/camera/PlaybackView.vue'
// travel tab
import TravelListView from '@/views/travel/TravelListView.vue'
import TravelView from '@/views/travel/TravelView.vue'
// profile tab
import ProfileView from '@/views/profile/ProfileView.vue'

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
      path: "/plan/area",
      name: "planArea",
      component: PlanAreaView,
    },

    {
      path: "/plan/period",
      name: "planPeriod",
      component: PlanPeriodView,
    },

    {
      path: "/record",
      name: "record",
      component: RecordView,
    },

    {
      path: "/playback",
      name: "playback",
      component: PlaybackView
    },

    {
      path: '/history',
      name: 'history',
      component: TravelListView,
    },

    {
      path: "/history/:travelId",
      name: "historyDetail",
      component: TravelView,
      props: true,
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
  ],
})

export default router
