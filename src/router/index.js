import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '@/views/Main'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'

import store from '@/store/index'
import routesConfig from './config'

const routes = [
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'login', component: Login },
  { path: '/main', name: 'main', component: Main },
]

const router = createRouter({ history: createWebHashHistory(), routes })

// 每次路由跳轉前，執行以下動作
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  const isLoginPage = to.name === 'login'
  const isSignupPage = to.name === 'signup'

  // 1. 要去login或signup頁
  if (isLoginPage || isSignupPage) {
    // 且token有效的情況下，回到首頁(使用者有登入的情況下無法前往login或signup頁)
    if (isLoggedIn) return next('home')
    return next()
  } else {
    // 2. 要去main頁，故需判斷是否授權(是否登入)
    if (isLoggedIn) {
      if (!store.state.isRouterSetUp) {
        // 已登入，如果是第一次登入訪問，才需要添加路由
        router.removeRoute('main') // 要先刪除所有嵌套路由
        configRouter() // 加入路由
        return next({ path: to.fullPath }) // 由於新設定才剛生效，故需要重新走一次原本想去的路由
      } else {
        return next() // 已登入，不是第一次登入並訪問就不需要再添加路由
      }
    } else {
      return next({ path: '/login' }) // 未登入，重定向至login頁
    }
  }
})

const configRouter = () => {
  // 先加入main
  if (!router.hasRoute('main'))
    router.addRoute({ path: '/main', name: 'main', component: Main })
  // 再嵌套路由
  routesConfig.forEach(route => {
    checkPermission(route) && router.addRoute('main', route)
  })
  store.commit('changeRouterSetUp', true)
}

const checkPermission = route => {
  if (route.requireRoot) return store.state.userInfo.role === 'root'
  return true
}

export default router
