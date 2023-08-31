<template>
        <el-aside width="auto">
            <!-- :width="$store.state.isCollapsed ? '64px' : '200px'" -->
            <el-menu
            :collapse="$store.state.isCollapsed"
            :router="true"
            :default-active="route.fullPath"
            >
                <el-menu-item index="/home">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首頁</span>
                </el-menu-item>

                <el-menu-item index="/center">
                    <el-icon><Avatar /></el-icon>
                    <span>個人資料</span>
                </el-menu-item>

                <el-sub-menu index="/user-manage">
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
                        <span>案例管理</span>
                    </template>
                        <el-menu-item index="/news-manage/addnews">添加案例</el-menu-item>
                        <el-menu-item index="/news-manage/newslist">案例清單</el-menu-item>
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
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>
.el-aside{
    height:100vh;
    .el-menu{
        height:100vh;
    }
}
</style>