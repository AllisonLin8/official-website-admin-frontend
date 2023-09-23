<template>
        <el-card :size="20" class="container mt-3 mx-auto mt-4">
            <div class="row">
                <el-page-header icon="null" title="使用者管理" class="mt-3 mb-5">
                    <template #content>
                        <span class="text-large font-600 mr-3">使用者清單</span>
                    </template>
                </el-page-header>
            </div>
            <div class="row">
                <el-table :stripe="true" :data="usersData" height="400" style="width: 100%">
                    <el-table-column fixed prop="id" label="ID" width="120" />
                    <el-table-column fixed prop="name" label="Name" width="150" />
                    <el-table-column label="Avatar" width="140">
                        <template #default="scope">
                            <div v-if="scope.row.avatar" class="d-flex align-items-center">
                                <el-avatar :size="50" :src="scope.row.avatar" />
                            </div>
                            <div v-else class="d-flex align-items-center">
                                <el-avatar :size="50"> user </el-avatar>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Role" width="140">
                        <template #default="scope">
                            <span v-if="scope.row.role === 'root'">
                                <el-tag class="ml-2" type="danger">{{ scope.row.role }}</el-tag>
                            </span>
                            <span v-else-if="scope.row.role === 'editor'">
                                <el-tag class="ml-2" type="success">{{ scope.row.role }}</el-tag>
                            </span>
                            <span v-else>
                                <el-tag class="ml-2" type="info">{{ scope.row.role }}</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="Email" style="width: 100%" />
                    <el-table-column fixed="right" label="Operations" width="220">
                        <template #default="scope">
                            <EditUser :row="scope.row" :roleOptions="roleOptions" />
                            <span v-if="scope.row.name !== 'root' && store.state.userInfo.role === 'root'">
                                <span v-if="!scope.row.isDeleted">
                                    <el-popconfirm
                                        title="你確定要刪除嗎？"
                                        cancel-button-text="取消"
                                        confirm-button-text="確定"
                                        @confirm="handleDelete(scope.row)"
                                    >
                                        <template #reference>
                                            <el-button size="small" type="danger">刪除</el-button>
                                        </template>
                                    </el-popconfirm>
                                </span>
                                <span v-else>
                                    <el-popconfirm
                                        cancel-button-text="取消"
                                        confirm-button-text="確定"
                                        title="你確定要取消刪除嗎？"
                                        @confirm="handleDelete(scope.row)"
                                    >
                                        <template #reference>                                        
                                            <el-button size="small" type="warning">取消刪除</el-button>
                                        </template>
                                    </el-popconfirm>
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import EditUser from '@/components/user/EditUser'

import store from '@/store'
import { adminApi } from '@/apis/admin'
import { Reminder } from '@/utils/helpers'

const usersData = ref([])
const roleOptions = ref({})

const getUsers = async () => {
    try {
        const res = await adminApi.users.getUsers()
        if (res.data.status === 'success') return usersData.value = res.data.users
    } catch (error) {
        return Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
    }
}

const getRoles = async () => {
    try {
        const res = await adminApi.roles.getRoles()
        if (res.data.status === 'success') return Object.assign(roleOptions.value, res.data.roles)
    } catch (error) {
        console.error(error)
    }
}

const handleDelete = async row => {
    try {
        const res = await adminApi.users.patchUserIsDeleted(row.id)
        if (res.data.status === 'success') {
            Reminder.fire({ icon: 'success', title: res.data.msg })
            row.isDeleted = !row.isDeleted
        }
        return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
    } catch (error) {
        return Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
    }
}

onMounted(() => {
    getUsers()
    getRoles()
})
</script>