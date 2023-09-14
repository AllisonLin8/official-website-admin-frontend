<template>
    <span v-if="props.row.name !== 'root' && store.state.userInfo.role === 'root'">
        <el-button 
            class="me-3"
            size="small"
            type="primary"
            @click="handleEdit(props.row)"
        >編輯</el-button>
    </span>
    <el-dialog 
        size="40%" 
        v-model="visibilityBinding" 
        :append-to-body="true"
        :before-close="handleClose"
        :modal-append-to-body="false"
        >
        <template #header>
            <h4>編輯使用者</h4>
        </template>
        <template #default>
            <div>
                <el-form
                status-icon
                label-width="150px"
                ref="editUserFormRef"
                :model="editUserForm"
                :rules="editUserFormRules"
                >
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="editUserForm.name" />
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="editUserForm.email" />
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input v-model="editUserForm.password" type="password" clearable />
                    </el-form-item>
                    <el-form-item label="Confirm Password" prop="confirmPassword">
                        <el-input v-model="editUserForm.confirmPassword" type="password" />
                    </el-form-item>
                    <el-form-item label="Role" prop="role">
                        <el-select
                            class="w-100"
                            value-key="id"
                            placeholder="選擇權限"
                            v-model="editUserForm.role"
                            :filterable="true"
                        >
                            <el-option
                                v-for="item in props.roleOptions"
                                :value="item"
                                :key="item.id"
                                :label="item.name"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetForm(editUserFormRef)">重置</el-button>
                <el-button type="primary" @click="submitForm(editUserFormRef)">確認</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

import store from '@/store'
import { adminApi } from '@/apis/admin'
import { Reminder, formErrReminder } from '@/utils/helpers'

const visibilityBinding = ref(false)
const props = defineProps({
    row: Object,
    roleOptions: Object,
}) 

const editUserFormRef = ref({})
const editUserForm = reactive({
    name: '',
    email: '',
    password:'',
    confirmPassword: '',
    roleId: '',
    role: '',
})
const editUserFormRules = reactive({
    name: [{ required: true, message: '請輸入 Name！', trigger: 'blur' }],
    email: [{ required: true, message: '請輸入 Email！', trigger: 'blur' }],
})

const handleEdit = row => {
    Object.assign(editUserForm, row)
    visibilityBinding.value = true
}

const handleClose = async (done) => {
    try {
        await ElMessageBox.confirm(
            '你確定要關閉表單？',
            '提醒',
            { confirmButtonText: '確定', cancelButtonText: '取消', type: 'warning', }
        )
        await done()
    } catch (error) {
        return // 只是關閉表單
    }
}

const submitForm = async (editUserFormRef) => {
    try {
        if (!editUserFormRef) return
        await editUserFormRef.validate(async (valid, fields) => {
            if (valid) {
                editUserForm.roleId = editUserForm.role.id
                try {
                    const res = await adminApi.users.putUser(props.row.id, editUserForm)
                    if (res.data.status === 'success') {
                        visibilityBinding.value = false
                        const { email, name, role } = res.data.updatedUser
                        props.row.name = name
                        props.row.email = email
                        props.row.role = role
                        return Reminder.fire({ icon: 'success', title: res.data.msg })
                    }
                    return Reminder.fire({ icon: 'warning', title: res.data.msg || '1發生未知錯誤，請稍後再試！' })
                } catch (error) {
                    return Reminder.fire({ icon: 'warning', title: error?.response?.data?.errors[0] || '2發生未知錯誤，請稍後再試！' })
                }
            }
            return formErrReminder(fields)
        })
    } catch (error) {
        console.error(error)
    }
}

const resetForm = async (editUserFormRef) => {
    if (!editUserFormRef) return
    await editUserFormRef.resetFields()
}
</script>