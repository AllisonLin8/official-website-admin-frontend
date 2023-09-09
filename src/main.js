import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from 'particles.vue3'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/app.css'

createApp(App)
  .use(Particles)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
