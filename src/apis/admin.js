import { apiHelper } from '../utils/axios'

export const adminApi = {
  users: {
    // getHome() {
    //   // TODO 測試token是否刷新用
    //   return apiHelper.get('/adminapi/users/home')
    // },
    login(loginData) {
      return apiHelper.post('/adminapi/users/login', loginData)
    },
    signUp(signUpData) {
      return apiHelper.post('/adminapi/users/signup', signUpData)
    },
    patchUserProfile(id, newData) {
      return apiHelper.patch(`/adminapi/users/${id}/profile`, newData, {
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
    patchUserIsDeleted(id) {
      return apiHelper.patch(`/adminapi/users/${id}/isDeleted`)
    },
    putUser(id, newData) {
      return apiHelper.put(`/adminapi/users/${id}`, newData)
    },
  },
  roles: {
    getRoles() {
      return apiHelper.get('/adminapi/roles')
    },
  },
  news: {
    postContentImg(newData) {
      return apiHelper.post(`/adminapi/newslist/contentImg`, newData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    postNews(newData) {
      return apiHelper.post('/adminapi/newslist', newData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getNews(id, isDateFormatted) {
      return apiHelper.get(
        `/adminapi/newslist/${id}?isDateFormatted=${isDateFormatted}`
      )
    },
    getNewsList() {
      return apiHelper.get('/adminapi/newslist')
    },
    patchNewsIsPublished(id) {
      return apiHelper.patch(`/adminapi/newslist/${id}/isPublished`)
    },
    deleteNews(id) {
      return apiHelper.delete(`/adminapi/newslist/${id}`)
    },
    putNews(id, newsData) {
      return apiHelper.put(`/adminapi/newslist/${id}`, newsData, {
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
    postProduct(newData) {
      return apiHelper.post('/adminapi/products/', newData, {
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
    putProduct(id, newData) {
      return apiHelper.put(`/adminapi/products/${id}`, newData, {
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
