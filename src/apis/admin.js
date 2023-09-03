import { apiHelper } from '../utils/axios'

export const adminApi = {
  users: {
    getHome() {
      // TODO 測試token是否刷新用
      return apiHelper.get('/adminapi/users/home')
    },
    login({ email, password }) {
      return apiHelper.post('/adminapi/users/login', { email, password })
    },
    upload(newData) {
      return apiHelper.post('/adminapi/users/upload', newData)
    },
  },
}
