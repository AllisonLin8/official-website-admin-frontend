<template>
    <div class="container d-flex flex-column justify-content-center vh-100">

        <vue-particles
            id="tsparticles"
            :particlesInit="particlesInit"
            url="/particles.json"
        />

        <div class="row d-flex justify-content-center w-100">
            <div class="col-md-6">
                <h1 class="text-center fw-bold text-primary-emphasis">企業官網後台管理</h1>
                <form>
                    <div class="mb-3 text-secondary-emphasis">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="email">
                    </div>

                    <div class="mb-3 text-secondary-emphasis">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password">
                    </div>
                    
                            <div class="mb-3 d-grid gap-2 col-3 mx-auto">
                        <button type="submit" class="border-3 rounded-pill border-primary-subtle btn btn-light btn-sm" @click.stop.prevent="handleSubmit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2023-    by Allison Lin</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadSlim } from 'tsparticles-slim'
import { Reminder } from './../utils/helpers'
import store from '@/store'
import { adminApi } from '@/apis/admin'
const particlesInit = async engine => {
    await loadSlim(engine)
}

const email = ref('')
const password = ref('')
const router = useRouter()
const handleSubmit = () => {
    // 1. 校驗表單
    if (!email.value || !password.value) {
        Reminder.fire({
        icon: 'warning',
        title: '請填入 email 和 password'
        })
        return
    }
    // 2. API驗證
    adminApi.users.login({ email:email.value, password:password.value })
        .then(res => {
            if (res.data.ActionType === 'OK') {
                // 3. 設置token：axios攔截器-axios.js
                // 4. 跳轉畫面
                store.commit('changeUserInfo', res.data.userInfo)
                router.push({ path: '/home' })
                Reminder.fire({
                    icon: 'success',
                    title: res.data.msg
                })
            } else {
                Reminder.fire({
                    icon: 'warning',
                    title: res.data.error
                })
            }
        })
        .catch(err => {
            Reminder.fire({
                    icon: 'warning',
                    title: '發生未知錯誤，請稍後再試！'
            })
            console.log(err)
        })
    
}


</script>