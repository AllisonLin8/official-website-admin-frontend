<template>
    <el-page-header icon="null" title="使用者管理">
        <template #content>
            <span class="text-large font-600 mr-3"> 創建使用者 </span>
        </template>
    </el-page-header>

    <el-card :size="20" class="mt-5 col-10 mx-auto">
        <SignUpForm />
    </el-card>

</template>

<script setup>
import SignUpForm from '@/components/user/SignUpForm.vue'

</script>