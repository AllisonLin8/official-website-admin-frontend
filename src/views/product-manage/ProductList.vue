<template>
    <el-card :size="20" class="container mt-3 mx-auto mt-4">
        <div class="row">
            <el-page-header icon="null" title="產品管理" class="mt-3 mb-5">
                <template #content>
                    <span class="text-large font-600 mr-3">產品清單</span>
                </template>
            </el-page-header>
        </div>
        <div class="row">
            <el-table :stripe="true" :data="productsData" height="400" style="width: 100%">
                <el-table-column fixed label="Cover" width="80">
                    <template #default="scope">
                        <el-avatar :size="50" :src="scope.row.cover" />
                    </template>
                </el-table-column>
                <el-table-column fixed prop="title" label="Title" width="180" />
                <el-table-column fixed prop="desc" label="Desc" style="width: 100%" />
                <el-table-column prop="variety" label="Variety" width="150" />
                <el-table-column prop="createdAt" label="Created At" width="150" />
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default="scope">
                        <el-button
                            circle
                            size="small"
                            :icon="Edit"
                            @click="handleEdit(scope.row)"
                        />
                        <el-popconfirm
                            title="你確定要刪除嗎？"
                            cancel-button-text="取消"
                            confirm-button-text="確定"
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

const router = useRouter()
const productsData = ref([])

const getProducts = async () => {
    try {
        const res = await adminApi.products.getProducts()
        if (res.data.status === 'success') return productsData.value = res.data.products
        return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
    } catch (error) {
        return Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
    }
}

const handleEdit = async row => {
    router.push(`/product-manage/editproduct/${row.id}`)
}

const handleDelete = async row => {
    try {
        const res = await adminApi.products.deleteProduct(row.id)
        if (res.data.status === 'success') {
            Reminder.fire({ icon: 'success', title: res.data.msg })
            return await getProducts()
        }
        return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
    } catch (error) {
        return Reminder.fire({ icon: 'error', title: '發生未知錯誤，請稍後再試！' })
    }
}

onMounted(() => {
    getProducts()
})
</script>