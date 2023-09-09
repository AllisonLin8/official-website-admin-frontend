import { createRouter, createWebHashHistory } from 'vue-router'
import SignUp from '../views/SignUp'
import Login from '../views/Login'
import Main from '../views/Main'
import routesConfig from './config'
import store from '../store/index'

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 每次路由跳轉前，執行以下動作
router.beforeEach((to, from, next) => {
  // 如果不是要去login或signup頁
  if (to.name === 'login' || to.name === 'signup') {
    // 且token有效的情況下
    if (localStorage.getItem('token')) {
      return next('home') // 回到首頁(使用者有登入的情況下無法前往login或signup頁)
    }
    next()
  } else {
    // 就是要去main頁，故需判斷是否授權(已登入)
    if (localStorage.getItem('token')) {
      // 已登入
      if (!store.state.isRouterSetUp) {
        // 如果是第一次登入訪問，才需要添加路由，但要先刪除所有嵌套路由
        router.removeRoute('main')
        configRouter() // 加入路由
        next({
          // 由於新設定才剛生效，故需要重新走一次原本想去的路由
          path: to.fullPath,
        })
      } else {
        // 不是第一次登入訪問就不需要再添加路由
        next()
      }
    } else {
      // 未登入
      next({
        // 重定向至login頁
        path: '/login',
      })
    }
  }
})

const configRouter = () => {
  // 先加入main
  if (!router.hasRoute('main')) {
    router.addRoute({ path: '/main', name: 'main', component: Main })
  }
  // 再嵌套路由
  routesConfig.forEach(route => {
    checkPermission(route) && router.addRoute('main', route)
  })
  store.commit('changeRouterSetUp', true)
}

const checkPermission = route => {
  if (route.requireRoot) store.state.userInfo.role === 'root'
  return true
}
export default router
