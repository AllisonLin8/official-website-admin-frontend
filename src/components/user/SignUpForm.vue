<template>
    <el-form
        ref="signUpFormRef"
        :model="signUpForm"
        :rules="signUpFormRules"
        label-position="top"
        label-width="120px"
        status-icon
        @keyup.enter="submitForm(signUpFormRef)"
        >
        <el-form-item label="Name" prop="name">
            <el-input v-model="signUpForm.name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="signUpForm.email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input v-model="signUpForm.password" type="password" />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input v-model="signUpForm.confirmPassword" type="password" />
        </el-form-item>
        <el-form-item label="Role" prop="roleId" v-if="signUpForm.showRoleSelect">
            <el-select
            v-model="signUpForm.roleId"
            :filterable="true"
            allow-create
            clearable
            placeholder="選擇權限"
            class="w-100"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(signUpFormRef)" class="mt-3">Submit</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import store from '@/store'
import { adminApi } from '@/apis/admin'
import { Reminder } from '@/utils/helpers'

const router = useRouter()
const signUpFormRef = ref()
const signUpForm = reactive({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '',
    showRoleSelect: store?.state?.userInfo?.role === 'root',
})
const options = [
    {
    value: '1',
    label: 'root',
    },
    {
    value: '2',
    label: 'editor',
    },
    {
    value: '3',
    label: 'general',
    },
]
const signUpFormRules = reactive({
    name: [{ required: true, message: '請輸入 Name！', trigger: 'blur' }],
    email: [{ required: true, message: '請輸入 Email！', trigger: 'blur' }],
    password: [{ required: true, message: '請輸入 Password！', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '請輸入 Confirm Password！', trigger: 'blur' }],
})

const submitForm = async (signUpFormRef) => {
    if (!signUpFormRef) return
    await signUpFormRef.validate((valid, fields) => {
        if (valid) {
            adminApi.users.signUp(signUpForm)
                .then(res => {
                    if (res.data.status === 'success') {
                        const currentRoute = router.currentRoute.value
                        if (currentRoute.path === '/signup') {
                            router.push({ path: '/login' })
                        }
                        Reminder.fire({
                            icon: 'success',
                            title: res.data.msg
                        })
                    }
                })
                .catch(err => {
                    Reminder.fire({
                        icon: 'warning',
                        title: err?.response?.data?.errors[0] || '發生未知錯誤，請稍後再試！'
                    })
                })
        }
    })
}
</script>