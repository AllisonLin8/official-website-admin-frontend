<template>
        <el-header class="d-flex justify-content-between">
                <!-- <button @click="handleCollapsed">click</button> -->
                <div class="left d-flex">
                        <div class="d-flex align-items-center">
                                <el-icon :size="25" @click="handleCollapsed"><Menu /></el-icon>
                        </div>
                        <div class="ms-3 d-flex align-items-center fw-bold fs-3">企業官網後台管理</div>
                </div>
                <div class="right d-flex">
                        <div class="d-flex align-items-center fw-bold fs-5">歡迎 {{ $store.state.userInfo.name }} 回來</div>
                        <el-dropdown trigger="click" class="d-flex align-items-center">
                                <span class="el-dropdown-link ms-3">
                                        <el-icon :size="30" id="custom-el-icon" color="#005089"><User /></el-icon>
                                </span>
                                <template #dropdown>
                                        <el-dropdown-menu>
                                                <el-dropdown-item @click="handleCenter">個人資料</el-dropdown-item>
                                                <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
                                        </el-dropdown-menu>
                                </template>
                        </el-dropdown>
                </div>
        </el-header>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Menu, User } from '@element-plus/icons-vue'
import { Reminder } from '@/utils/helpers'
const store = useStore()
const router = useRouter()
const handleCollapsed = () => {
        store.commit('changeCollapsed')
}
const handleCenter = () => {
        router.push('/center')
}
const handleLogout = () => {
        localStorage.removeItem('token')
        store.commit('clearUserInfo')
        Reminder.fire({
                icon: 'success',
                title: '登出成功！'
        })
        router.push('/login')
}
</script>

<style lang="scss" scoped>
        .el-header{
                background-color: #F5AB38;
                color: #005089;
                .left .el-icon{
                        cursor: pointer;
                }
        }
</style>