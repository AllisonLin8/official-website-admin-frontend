<template>
    <div>
        <el-page-header icon="null" title="企業官網後台管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 個人資料 </span>
            </template>
        </el-page-header>
            <el-row class="my-5" :gutter="20">
                <el-col :span="8">
                    <el-card class="box-card d-flex flex-column justify-content-center align-items-center text-center">
                        <el-avatar class="border border-5" :size="100" :src="avatarUrl" />
                        <h3 class="mb-3 fw-bold fs-1">{{ $store.state.userInfo.name }}</h3>
                        <h3 class="fs-5 bg-info bg-opacity-10 border border-info rounded">{{ $store.state.userInfo.role }}</h3>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card :size="20">
                        <template #header>
                            <div class="card-header">
                                <span class="fs-4 fw-bold">個人資訊</span>
                            </div>
                        </template>
                        <el-form
                            ref="userFormRef"
                            :model="userForm"
                            :rules="userFormRules"
                            label-position="top"
                            label-width="120px"
                            status-icon
                            @keyup.enter="submitForm(userFormRef)"
                            @keyup.esc="resetForm(userFormRef)"
                        >
                            <el-form-item label="Name" prop="name">
                                <el-input v-model="userForm.name" />
                            </el-form-item>
                            
                            <el-form-item label="Intro" prop="intro">
                                <el-input v-model="userForm.intro" type="textarea" />
                            </el-form-item>
                            
                            <el-form-item label="Avatar" prop="avatar">
                                <UserUpload 
                                    :avatar="userForm.avatar"
                                    :file="userForm.file"
                                    @emitAvatarChange="handleAvatarChange"
                                />
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm(userFormRef)">更新</el-button>
                                <el-button @click="resetForm(userFormRef)">取消</el-button>
                            </el-form-item>

                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'

import store from '@/store'
import { adminApi } from '@/apis/admin'
import { Reminder, formErrReminder } from '@/utils/helpers'
import UserUpload from '@/components/user/UserUpload'

const { name, intro, avatar } = store.state.userInfo

const circleAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const avatarUrl = computed(() => avatar ? avatar : circleAvatar)

const userFormRef = ref()
const userForm = reactive({
    name,
    intro,
    avatar,
    file: null,
})

const userFormRules = reactive({
    name: [
        { required: true, message: '請輸入名稱！', trigger: 'blur' },
        { min: 3, max: 20, message: '名稱長度需介於 3 至 20 字', trigger: 'blur' },
    ],
})

const handleAvatarChange = (file) => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const resetForm = (userFormRef) => {
    if (!userFormRef) return
    userFormRef.resetFields()
}

const submitForm = async (userFormRef) => {
    if (!userFormRef) return
    await userFormRef.validate((valid, fields) => {
        if (valid) {
            const params = new FormData()
            for (let i in userForm) {
                params.append(i, userForm[i])
            }
            adminApi.users.upload(params)
                .then(res => {
                    if (res.data.status === 'success') {
                        store.commit('changeUserInfo', res.data.userInfo)
                    }
                    Reminder.fire({
                        icon: 'success',
                        title: res.data.msg
                    })
                })
                .catch(err => {
                    Reminder.fire({
                        icon: 'warning',
                        title: err?.response?.data?.errors[0] || '發生未知錯誤，請稍後再試！'
                    })
                })
        } else {
            formErrReminder(fields)
        }
    })
}
</script>