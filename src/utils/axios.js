import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL
const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) config.headers['authorization'] = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  response => {
    const token = response.headers['authorization']
    if (token) localStorage.setItem('token', token)
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
