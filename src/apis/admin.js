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
  news: {
    upload(uploadData) {
      return apiHelper.post('/adminapi/news/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    postNews(newsData) {
      return apiHelper.post('/adminapi/news/', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getNews(id, isDateFormatted) {
      return apiHelper.get(
        `/adminapi/news/${id}?isDateFormatted=${isDateFormatted}`
      )
    },
    getNewsList() {
      return apiHelper.get('/adminapi/newslist')
    },
    patchNews(id) {
      return apiHelper.patch(`/adminapi/news/publish/${id}`)
    },
    deleteNews(id) {
      return apiHelper.delete(`/adminapi/news/${id}`)
    },
    putNews(newsData) {
      return apiHelper.put('/adminapi/news/', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },
  categories: {
    getCategories() {
      return apiHelper.get('/adminapi/categories')
    },
  },
  products: {
    postProduct(newsData) {
      return apiHelper.post('/adminapi/products/', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getProducts(length) {
      return apiHelper.get(`/adminapi/products?length=${length}`)
    },
    deleteProduct(id) {
      return apiHelper.delete(`/adminapi/products/${id}`)
    },
    getProduct(id, isDateFormatted) {
      return apiHelper.get(
        `/adminapi/products/${id}?isDateFormatted=${isDateFormatted}`
      )
    },
    putProduct(newsData) {
      return apiHelper.put('/adminapi/products/', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },
  varieties: {
    getVarieties() {
      return apiHelper.get('/adminapi/varieties')
    },
  },
}
