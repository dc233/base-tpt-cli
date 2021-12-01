import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import user from './modules/user'
import home from './modules/home'

interface routesObjInterface {
  [propName: string]: RouteRecordRaw[]
}
const routesObj: routesObjInterface = {
  user,
  home,
}

// 通用路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue'),
  },
]

// 路由实例化
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
  routes: [...constantRoutes], // 静态路由和动态路由的临时合并
})

// 动态添加路由
export const addAsyncRoutes = (routeArr: Array<string>) => {
  const asyncRoutes: RouteRecordRaw[] = []
  routeArr.forEach((el) => {
    asyncRoutes.push(...routesObj[el])
  })
  asyncRoutes.forEach((el) => {
    router.addRoute(el)
  })
}

export default router
