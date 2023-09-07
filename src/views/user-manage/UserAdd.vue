<template>
    <el-card :size="20" class="mt-3 col-10 mx-auto mt-4">
        <el-page-header icon="null" title="使用者管理" class="mt-3 mb-5">
            <template #content>
                <span class="text-large font-600 mr-3"> 創建使用者 </span>
            </template>
        </el-page-header>
        <SignUpForm />
    </el-card>
</template>

<script setup>
import SignUpForm from '@/components/user/SignUpForm.vue'

</script>