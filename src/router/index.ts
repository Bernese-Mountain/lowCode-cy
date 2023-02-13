import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { createRouterGuards } from './router-guards'
import { PageEnum } from '@/enums/pageEnum'
import { Layout } from '@/router/constant'
import  test from '@/test/test.vue'

const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.TEST,
    component: test,
    meta: {
      title: 'Root',
    },
  }
]

export const lowCode: RouteRecordRaw = {
  path: '/',
  name: 'lowCode',
  redirect: '/lowCode',
  component: () => import('@/views/lowCode'),
  // meta: {
  //   title: '登录',
  // },
};


export const constantRouter: any[] = [ ...RootRoute ];

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  // createRouterGuards(router)
}
export default router
