import 'bootstrap'
import Particles from 'particles.vue3'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'

import '@/assets/app.css'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App)
  .use(Particles)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
