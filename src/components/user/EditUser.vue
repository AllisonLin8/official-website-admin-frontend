<template>
    <span v-if="props.row.name !== 'root' && store.state.userInfo.role === 'root'">
        <el-button 
            size="small"
            type="primary"
            @click="handleEdit(props.row)"
            class="me-3"
        >編輯</el-button>
    </span>
    <el-dialog 
            v-model="visibilityBinding" 
            size="40%" 
            :before-close="handleClose"
            :append-to-body="true"
            :modal-append-to-body="false"
            >
            <template #header>
                <h4>編輯使用者</h4>
            </template>
            <template #default>
                <div>
                    <el-form
                    ref="editUserFormRef"
                    :model="editUserForm"
                    :rules="editUserFormRules"
                    label-width="150px"
                    status-icon
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
                        v-model="editUserForm.role"
                        placeholder="選擇權限"
                        :filterable="true"
                        value-key="id"
                        class="w-100"
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

const initRow = reactive({
    name: '',
    email: '',
    role: '',
})

const editUserFormRef = ref({})
let editUserForm = reactive({
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

const handleEdit = async row => {
    initRow.name = row.name
    initRow.email = row.email
    initRow.role = row.role
    editUserForm = initRow
    visibilityBinding.value = true
}

const handleClose = async (done) => {
    ElMessageBox.confirm('你確定要關閉表單？')
        .then(() => {
            done()
        })
        .catch(() => {
            // 只是關閉表單
            return
        })
}

const submitForm = async (editUserFormRef) => {
    if (!editUserFormRef) return
    editUserFormRef.validate(async (valid, fields) => {
        if (valid) {
            editUserForm.roleId = editUserForm.role.id
            await adminApi.users.putUser(props.row.id, editUserForm)
                .then(res => {
                    if (res.data.status === 'success') {
                        visibilityBinding.value = false
                        const { email, name, role } = res.data.updatedUser
                        props.row.name = name
                        props.row.email = email
                        props.row.role = role
                        Reminder.fire({
                        icon: 'success',
                            title: res.data.msg
                        })
                    } else {
                        Reminder.fire({
                        icon: 'warning',
                        title: res.data.msg || '發生未知錯誤，請稍後再試！'
                        })
                    }
                })
                .catch(err => {
                    Reminder.fire({
                        icon: 'warning',
                        title: err?.response?.data.msg || '發生未知錯誤，請稍後再試！'
                    })
                })
        } else {
            formErrReminder(fields)
        }
    })
}

const resetForm = async (editUserFormRef) => {
    if (!editUserFormRef) return
    await editUserFormRef.resetFields()
}
</script>