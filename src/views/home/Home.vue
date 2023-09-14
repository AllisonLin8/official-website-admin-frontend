<template>
    <el-page-header icon="null" title="企業官網後台管理">
        <template #content>
            <span class="text-large font-600 mr-3">首頁</span>
        </template>
    </el-page-header>
    <el-card class="box-card my-5">
        <el-row>
            <el-col :span="4" class="d-flex justify-content-center align-items-center">
                <el-avatar class="border border-5" :size="100" :src="avatarUrl" />
            </el-col>
            <el-col :span="20" class="d-flex justify-content-start align-items-center">
                <h3 class="mb-0">
                    歡迎 <span class="fw-bolder">{{ $store.state.userInfo.name }}</span> 回來！{{ welcomeText }}
                </h3>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="box-card my-5">
        <template #header>
            <div class="card-header">
                <span>公司產品</span>
            </div>
        </template>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </el-card>
    <!-- 測試token是否刷新↓ -->
    <!-- <button @click="onclick">click</button> -->
</template>

<script setup>
import { computed } from 'vue'

import store from '@/store'

const userAvatar = store.state.userInfo.avatar
const circleAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const avatarUrl = computed(() => userAvatar ? userAvatar : circleAvatar)
const welcomeText = computed(() => new Date().getHours() < 15 ? '開心快樂每一天💚 ʕ๑•ɷ•๑ʔ 🎉' : '喝杯咖啡☕繼續努力 ฅʕ•Ⱉ•ʔฅ 💚')

// 測試token是否刷新↓
// import { adminApi } from '../../apis/admin'
// import { Reminder } from '../../utils/helpers'
// const onclick = ()=>{
//     adminApi.users.getHome()
//         .then(res => {
//             console.log('Home請求成功')
//             Reminder.fire({
//                 icon: 'success',
//                 title: res.data.msg
//             })
//         })
//         .catch(err => {
//             console.log('Home請求失敗')
//             Reminder.fire({
//                 icon: 'warning',
//                 title: '發生未知錯誤，請稍後再試！'
//             })
//         })
// }
</script>

<style lang="scss" scoped>
.el-carousel__item {
    h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }
    &:nth-child(2n) {
        background-color: #99a9bf;
    }
    &:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
}
</style>