import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend')
const Singer = () => import('@/views/singer')
const TopList = () =>import('@/views/top-list')
const Search = () =>import('@/views/search')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: TopList
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
