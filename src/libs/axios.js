/* eslint-disable import/no-cycle */
import Vue from 'vue'
import axios from 'axios'
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'

// axios
// import store from '@/store'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================

  // baseURL: 'http://localhost:8000',
  baseURL: 'https://app-1ad2453f-8d62-42dc-a256-907c9681b7eb.cleverapps.io',
  // 'http://192.168.1.121:8000',

  // timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

axiosIns.interceptors.response.use(response => response, error => {
  const status = error.response ? error.response.status : null

  if (status === 401) {
    localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
    // Remove userData from localStorage
    localStorage.removeItem('userData')
    router.push({ name: 'auth-login' })

    // Reset ability

    // will loop if refreshToken returns 401

    // Redirect to login page
  }

  return Promise.reject(error)
})
// request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['Authorization'] = 'Bearer ' + getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

axiosIns.interceptors.response.use(
  response => response,
  error => error,
)

Vue.prototype.$http = axiosIns

export default axiosIns
