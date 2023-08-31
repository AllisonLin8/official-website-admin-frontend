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
import Header from '../components/main/Header'
import Aside from '../components/main/Aside'

</script>