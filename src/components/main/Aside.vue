<template>
        <el-aside width="auto">
            <el-menu
            :router="true"
            :default-active="route.fullPath"
            :collapse="$store.state.isCollapsed"
            >
                <el-menu-item index="/home">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首頁</span>
                </el-menu-item>

                <el-menu-item index="/center">
                    <el-icon><Avatar /></el-icon>
                    <span>個人資料</span>
                </el-menu-item>

                <el-sub-menu index="/user-manage" v-root>
                    <template #title>
                        <el-icon><UserFilled /></el-icon>
                        <span>使用者管理</span>
                    </template>
                        <el-menu-item index="/user-manage/adduser">創建使用者</el-menu-item>
                        <el-menu-item index="/user-manage/userlist">使用者清單</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="/news-manage">
                    <template #title>
                        <el-icon><MessageBox /></el-icon>
                        <span>新聞管理</span>
                    </template>
                        <el-menu-item index="/news-manage/addnews">添加新聞</el-menu-item>
                        <el-menu-item index="/news-manage/newslist">新聞清單</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="/product-manage">
                    <template #title>
                        <el-icon><Reading /></el-icon>
                        <span>產品管理</span>
                    </template>
                        <el-menu-item index="/product-manage/addproduct">添加產品</el-menu-item>
                        <el-menu-item index="/product-manage/productlist">產品清單</el-menu-item>
                </el-sub-menu>

            </el-menu>
        </el-aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

import store from '@/store'
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading } from '@element-plus/icons-vue'
const route = useRoute()

const vRoot = {
    mounted(el) {
        if (store.state.userInfo.role !== 'root') return el.parentNode.removeChild(el)
    },
}
</script>

<style lang="scss" scoped>
.el-aside{
    height:100vh;
    .el-menu{
        height:100vh;
    }
}
</style>