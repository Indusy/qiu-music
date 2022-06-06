import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend')
const Album = () => import('@/views/album')
const Singer = () => import('@/views/singer')
const SingerDetail = () => import('@/views/singer-detail')
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
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
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
