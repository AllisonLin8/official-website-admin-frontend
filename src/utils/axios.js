import axios from 'axios'

const baseURL = 'http://localhost:3000'

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  response => {
    const token = response.headers['authorization']
    // TODO 確認token是否刷新↓，完成後刪除
    console.log('這邊是新token', token)
    if (token) {
      localStorage.setItem('token', token)
    }
    return response
  },
  err => {
    const { status } = err.response
    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '#/login'
    }
    return Promise.reject(err)
  }
)

export const apiHelper = axiosInstance
