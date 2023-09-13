<template>
    <el-card :size="20" class="container mt-3 mx-auto mt-4">
        <div class="row">
            <el-page-header icon="null" title="案例管理" class="mt-3 mb-5">
                <template #content>
                    <span class="text-large font-600 mr-3"> 案例清單 </span>
                </template>
            </el-page-header>
        </div>
        <div class="row">
            <el-table :stripe="true" :data="newsData" height="400" style="width: 100%">
                <el-table-column fixed label="Cover" width="80">
                    <template #default="scope">
                            <el-avatar :size="50" :src="scope.row.cover" />
                    </template>
                </el-table-column>
                <el-table-column fixed prop="title" label="Title" style="width: 100%" />
                <el-table-column prop="category" label="Category" width="110" />
                <el-table-column label="Is Published" width="150">
                    <template #default="scope">
                        <el-switch 
                            v-model="scope.row.isPublished"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="Yes"
                            inactive-text="No"
                            @change="handleIsPublishChange(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" label="Updated At" width="150" />
                <el-table-column prop="createdAt" label="Created At" width="150" />
                <el-table-column fixed="right" label="Operations" width="150">
                    <template #default="scope">
                        <PreviewNews :row="scope.row"/>
                        <el-button
                            circle
                            :icon="Edit"
                            size="small"
                            @click="handleEdit(scope.row)"
                        />
                        <el-popconfirm
                            title="你確定要刪除嗎？"
                            confirm-button-text="確定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button circle :icon="Delete" size="small" type="danger" />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Edit, Delete } from '@element-plus/icons-vue'

import { adminApi } from '@/apis/admin'
import { Reminder } from '@/utils/helpers'
import PreviewNews from '@/components/news/PreviewNews'

const newsData = ref([])
const router = useRouter()

const getNewsList = async () => {
    try {
        const res = await adminApi.news.getNewsList()
        if (res.data.status === 'success') return newsData.value = res.data.news
        return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
    } catch (error) {
        return Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
    }
}

const handleIsPublishChange = async row => {
    try {
        const res = await adminApi.news.patchNews(row.id)
        if (res.data.status === 'success') return Reminder.fire({ icon: 'success', title: res.data.msg })
    } catch (error) {
        Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
    }
}

const handleEdit = async row => {
    router.push(`/news-manage/editnews/${row.id}`)
}

const handleDelete = async row => {
    try {
        const res = await adminApi.news.deleteNews(row.id)
        if (res.data.status === 'success') {
            Reminder.fire({ icon: 'success', title: res.data.msg })
            getNewsList()
        } else if (res.data.status === 'warning') {
            Reminder.fire({ icon: 'warning', title: res.data.msg })
        }
    } catch (error) {
        Reminder.fire({ icon: 'error', title: '發生未知錯誤，請稍後再試！' })
    }
}

onMounted(() => {
    getNewsList()
})
</script>