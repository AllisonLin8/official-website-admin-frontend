<template>
    <div class="container d-flex flex-column justify-content-center vh-100 mt-5">
        <Background />
        <div class="row d-flex justify-content-center w-100 mt-5">
            <div class="col-md-6">
                <el-card :size="20">
                    <template #header>
                        <div class="card-header text-center">
                            <h5 class="text-center fw-bold text-primary-emphasis my-3">企業官網後台管理</h5>
                            <span class="fs-4 fw-bold">註冊</span>
                        </div>
                    </template>
                    <SignUpForm />
                </el-card>
            </div>
        </div>
        <a class="text-center mt-3 fs-6" @click="handleLogin">Log In</a>
        <p class="my-5 text-muted text-center">&copy; 2023 - {{ new Date().getFullYear() }} by Allison Lin</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import Background from '@/components/Background.vue'
import SignUpForm from '@/components/user/SignUpForm'

const router = useRouter()

const handleLogin = () => {
    router.push('/login')
}
</script>