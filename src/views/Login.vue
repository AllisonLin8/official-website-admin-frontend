<template>
    <div class="container d-flex flex-column justify-content-center vh-100">
        <Background />

        <div class="row d-flex justify-content-center w-100">
            <div class="col-md-6">
                <h1 class="text-center fw-bold text-primary-emphasis mb-5">企業官網後台管理</h1>

                <el-card :size="20">

                    <template #header>
                        <div class="card-header">
                            <span class="fs-4 fw-bold">登入</span>
                        </div>
                    </template>

                    <el-form
                        ref="loginFormRef"
                        :model="loginForm"
                        :rules="loginFormRules"
                        label-position="top"
                        label-width="120px"
                        status-icon
                        @keyup.enter="submitForm(loginFormRef)"
                    >
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="loginForm.email" />
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input v-model="loginForm.password" type="password" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(loginFormRef)">Submit</el-button>
                        </el-form-item>
                    </el-form>
                    
                </el-card>
            </div>
        </div>

        <a class="text-center mt-5 fs-6" @click="handleSignUp">Sign Up</a>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2023 - {{ new Date().getFullYear() }} by Allison Lin</p>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import Background from '@/components/Background.vue'

import store from '@/store'
import { adminApi } from '@/apis/admin'
import { Reminder } from '@/utils/helpers'


const router = useRouter()

const loginFormRef = ref()
const loginForm = reactive({
    email: '',
    password: '',
})

const loginFormRules = reactive({
    email: [{ required: true, message: '請輸入 Email！', trigger: 'blur' }],
    password: [{ required: true, message: '請輸入 Password！', trigger: 'blur' }],
})

const handleSignUp = () => {
    router.push('/signup')
}

const submitForm = async (loginFormRef) => {
    if (!loginFormRef) return
    await loginFormRef.validate((valid, fields) => {
        if (valid) {
            adminApi.users.login(loginForm)
                .then(res => {
                    if (res.data.status === 'success') {
                        // 3. 設置token：axios攔截器-axios.js
                        // 4. 跳轉畫面
                        store.commit('changeUserInfo', res.data.userInfo)
                        store.commit('changeRouterSetUp', false) // 每次登入都要檢查路由，防止使用者在沒有logout的情況下，使用連結直接到登入頁(這樣會保留上一個使用者的路由config)
                        router.push({ path: '/home' })
                        Reminder.fire({
                            icon: 'success',
                            title: res.data.msg
                        })
                    } else {
                        Reminder.fire({
                            icon: 'warning',
                            title: res.data.msg
                        })
                    }
                })
                .catch(err => {
                    Reminder.fire({
                        icon: 'warning',
                        title: err?.response?.data?.errors[0] || '發生未知錯誤，請稍後再試！'
                    })
                })
        }
    })
}
</script>