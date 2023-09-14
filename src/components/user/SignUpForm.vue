<template>
    <el-form
        status-icon
        label-width="120px"
        ref="signUpFormRef"
        label-position="top"
        :model="signUpForm"
        :rules="signUpFormRules"
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
        <el-form-item label="Role" prop="roleId" v-root>
            <el-select
                clearable
                allow-create
                class="w-100"
                value-key="id"
                placeholder="選擇權限"
                v-model="signUpForm.role"
                :filterable="true"
            >
                <el-option
                    v-for="item in roleOptions"
                    :value="item"
                    :key="item.id"
                    :label="item.name"
                />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(signUpFormRef)" class="mt-3">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'

import store from '@/store'
import { adminApi } from '@/apis/admin'
import { Reminder, formErrReminder } from '@/utils/helpers'

const router = useRouter()
const roleOptions = ref([])

const signUpFormRef = ref()
const signUpForm = reactive({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    roleId: '',
})
const signUpFormRules = reactive({
    name: [{ required: true, message: '請輸入 Name！', trigger: 'blur' }],
    email: [{ required: true, message: '請輸入 Email！', trigger: 'blur' }],
    password: [{ required: true, message: '請輸入 Password！', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '請輸入 Confirm Password！', trigger: 'blur' }],
})

const vRoot = {
    mounted(el) {
        if (store?.state?.userInfo?.role !== 'root') return el.parentNode.removeChild(el)
    },
}

const getRoles = async () => {
    try {
        const res = await adminApi.roles.getRoles()
        if (res.data.status === 'success') return roleOptions.value = res.data.roles
    } catch (error) {
        console.error(error)
    }
}

const submitForm = async (signUpFormRef) => {
    try {
        if (!signUpFormRef) return
        await signUpFormRef.validate(async (valid, fields) => {
            if (valid) {
                try {
                    signUpForm.roleId = signUpForm.role.id
                    const res = await adminApi.users.signUp(signUpForm)
                    if (res.data.status === 'success') {
                        const currentRoute = router.currentRoute.value
                        if (currentRoute.path === '/signup') router.push({ path: '/login' })
                        await resetForm(signUpFormRef)
                        return Reminder.fire({ icon: 'success', title: res.data.msg })
                    }
                } catch (error) {
                    return Reminder.fire({icon: 'warning',title: error?.response?.data?.errors[0] || '發生未知錯誤，請稍後再試！'})
                }
            } else {
                return formErrReminder(fields)
            }
        })
    } catch (error) {
        console.error(error)
    }
}

const resetForm = async (signUpFormRef) => {
    if (!signUpFormRef) return
    await signUpFormRef.resetFields()
}

onMounted(() => {
    const currentRoute = router.currentRoute.value
    if (currentRoute.path !== '/signup') return getRoles()
})
</script>