<template>
    <el-button
        circle
        size="small"
        type="success"
        :icon="View"
        @click="handlePreview(props.row)"
    />
    <el-drawer 
        size="60%" 
        v-model="visibilityBinding" 
        :append-to-body="true"
        :before-close="handleClose"
        :modal-append-to-body="false"
    >
        <template #header>
            <h4>預覽新聞</h4>
        </template>
        <template #default>
            <div>
                <h3 class="mb-4 mx-3">{{ news.title }}</h3>
                <ul class="text-secondary d-flex">
                    <li class="me-5">初稿時間：{{ news.createdAt }}</li>
                    <li>更新時間：{{ news.updatedAt }}</li>
                </ul>
                <el-divider border-style="dashed" />
                <div v-html="news.content" class="mx-3"></div>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { View } from '@element-plus/icons-vue'

import { adminApi } from '@/apis/admin'
import { Reminder } from '@/utils/helpers'

const visibilityBinding = ref(false)
const props = defineProps({
    row: Object,
}) 
const news = ref({})

const handlePreview = async row => {
    try {
        visibilityBinding.value = true
        const res = await adminApi.news.getNews(row.id)
        if (res.data.status === 'success') return news.value = res.data.news
    } catch (error) {
        Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
    }
}

const handleClose = async (done) => { await done() }
</script>