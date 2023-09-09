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
    getUser(id) {
      return apiHelper.get(`/adminapi/users/${id}`)
    },
    deleteUser(id) {
      return apiHelper.delete(`/adminapi/users/${id}`)
    },
    putUser(id, editData) {
      return apiHelper.put(`/adminapi/users/edit/${id}`, editData)
    },
  },
  roles: {
    getRoles() {
      return apiHelper.get('/adminapi/roles')
    },
  },
}
