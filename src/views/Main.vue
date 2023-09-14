<template>
    <el-container>
        <Aside></Aside>
        <el-container direction="vertical">
            <Header></Header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Aside from '../components/main/Aside'
import Header from '../components/main/Header'
</script>