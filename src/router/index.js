import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'AllMovies',
    props: true,
    component: () => import('@/layouts/Layout.vue'),
    children: [
      {
        path: '',
        name: 'AllMovies',
        props: true,
        component: () => import('@/views/AllMovies.vue'),
      },
      {
        path: '/all-movies/:movieId',
        name: 'MovieOne',
        props: true,
        component: () => import('@/views/MovieOne.vue'),
      },
      {
        path: '/sessions',
        name: 'Sessions',
        props: true,
        component: () => import('@/views/Sessions.vue'),
      },
      {
        path: '/sessions/:movieId',
        name: 'Sessions',
        props: true,
        component: () => import('@/views/Sessions.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
