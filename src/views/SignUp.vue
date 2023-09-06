<template>
    <div class="container d-flex flex-column justify-content-center vh-100">
        <Background />
        <div class="row d-flex justify-content-center w-100">
            <div class="col-md-6">
                <h1 class="text-center fw-bold text-primary-emphasis mb-5">企業官網後台管理</h1>
                <el-card :size="20">
                    <template #header>
                        <div class="card-header">
                            <span class="fs-4 fw-bold">註冊</span>
                        </div>
                    </template>
                    <SignUpForm />
                </el-card>
            </div>
        </div>

        <a class="text-center mt-5 fs-6" @click="handleLogin">Log In</a>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2023 - {{ new Date().getFullYear() }} by Allison Lin</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import SignUpForm from '@/components/user/SignUpForm'
import Background from '@/components/Background.vue'

const router = useRouter()

const handleLogin = () => {
    router.push('/login')
}
</script>