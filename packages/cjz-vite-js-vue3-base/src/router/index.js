import { createRouter, createWebHashHistory } from 'vue-router'

import user from './modules/user'
import home from './modules/home'

const routesObj = {
  user,
  home
}

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue')
  }
]

export const asyncRoutes = []

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // 路由项
  routes: [...constantRoutes] // 静态路由和动态路由的临时合并
})

// 动态添加路由
export const addAsyncRoutes = (routeArr) => {
  const asyncRoutes = []
  routeArr.forEach((el) => {
    asyncRoutes.push(...routesObj[el])
  })
  asyncRoutes.forEach((el) => {
    router.addRoute(el)
  })
}

export default router
