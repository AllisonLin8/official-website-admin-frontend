<template>
    <div class="container d-flex flex-column justify-content-center vh-100">

        <vue-particles
            id="tsparticles"
            :particlesInit="particlesInit"
            url="/particles.json"
        />

        <div class="row d-flex justify-content-center w-100">
            <div class="col-md-6">
                <h1 class="text-center fw-bold text-primary-emphasis mb-5">企業官網後台管理</h1>
                <el-card :size="20">
                    <template #header>
                        <div class="card-header">
                            <span class="fs-4 fw-bold">註冊</span>
                        </div>
                    </template>
                    <el-form
                        ref="signUpFormRef"
                        :model="signUpForm"
                        :rules="signUpFormRules"
                        label-position="top"
                        label-width="120px"
                        status-icon
                    >
                        <el-form-item label="Name" prop="name">
                            <el-input v-model="signUpForm.name" />
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="signUpForm.email" />
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input v-model="signUpForm.password" type="password" />
                        </el-form-item>
                        <el-form-item label="Confirm Password" prop="confirmPassword">
                            <el-input v-model="signUpForm.confirmPassword" type="password" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(signUpFormRef)">Submit</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </div>

        <a class="text-center mt-5 fs-6" @click="handleLogin">Log In</a>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2023 - {{ new Date().getFullYear() }} by Allison Lin</p>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loadSlim } from 'tsparticles-slim'

import { adminApi } from '@/apis/admin'
import { Reminder } from './../utils/helpers'

const particlesInit = async engine => {
    await loadSlim(engine)
}

const router = useRouter()

const handleLogin = () => {
    router.push('/login')
}

const signUpFormRef = ref()
const signUpForm = reactive({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
})

const signUpFormRules = reactive({
    name: [{ required: true, message: '請輸入 Name！', trigger: 'blur' }],
    email: [{ required: true, message: '請輸入 Email！', trigger: 'blur' }],
    password: [{ required: true, message: '請輸入 Password！', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '請輸入 Confirm Password！', trigger: 'blur' }],
})

const submitForm = async (signUpFormRef) => {
    if (!signUpFormRef) return
    await signUpFormRef.validate((valid, fields) => {
        if (valid) {
            adminApi.users.signUp(signUpForm)
                .then(res => {
                    if (res.data.status === 'success') {
                        router.push({ path: '/login' })
                        Reminder.fire({
                            icon: 'success',
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