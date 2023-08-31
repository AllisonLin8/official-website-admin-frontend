<template>
        <el-page-header icon="null" title="企業官網後台管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 首頁 </span>
            </template>
        </el-page-header>

        <el-card class="box-card my-5">
            <el-row>
                <el-col :span="4" class="d-flex justify-content-center align-items-center">
                    <el-avatar class="border border-5" :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20" class="d-flex justify-content-start align-items-center">
                    <h3 class="mb-0">歡迎 {{ $store.state.userInfo.name }} 回來！{{ welcomeText }}</h3>
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
</template>

<script setup>
import store from '@/store'
import { computed } from 'vue'
const userAvatar = store.state.userInfo.avatar
const circleAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const avatarUrl = computed(() => userAvatar ? userAvatar : circleAvatar)
const welcomeText = computed(() => new Date().getHours() < 15 ? '開心快樂每一天🎉 ʕ๑•ɷ•๑ʔ 💚':'喝杯咖啡☕繼續努力 ฅʕ•Ⱉ•ʔฅ 💚')
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>