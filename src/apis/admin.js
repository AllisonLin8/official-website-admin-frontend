import { apiHelper } from '../utils/axios'

export const adminApi = {
  users: {
    getHome() {
      // TODO 測試token是否刷新用
      return apiHelper.get('/adminapi/users/home')
    },
    login(loginData) {
      return apiHelper.post('/adminapi/users/login', loginData)
    },
    signUp(signUpData) {
      return apiHelper.post('/adminapi/users/signup', signUpData)
    },
    upload(uploadData) {
      return apiHelper.post('/adminapi/users/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getUsers() {
      return apiHelper.get('/adminapi/users')
    },
    deleteUser(id) {
      return apiHelper.delete(`/adminapi/users/${id}`)
    },
  },
}
