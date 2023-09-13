<template>
    <el-card :size="20" class="container mt-3 mx-auto mt-4">
        <el-page-header icon="null" title="案例管理" class="mt-3 mb-5">
            <template #content>
                <span class="text-large font-600 mr-3"> 創建案例 </span>
            </template>
        </el-page-header>
        <el-form
        ref="newsFormRef"
        :model="newsForm"
        :rules="newsFormRules"
        label-position="top"
        label-width="120px"
        status-icon
        >
            <el-form-item label="Title" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="Content" prop="content">
                <Editor
                :clearEditor="clearEditor"
                @emitOnEditorChange="handleEditorChange"
                @emitOnEditorClear="handleEditorClear"
                />
            </el-form-item>
            <el-form-item label="Category" prop="category">
                <el-select
                v-model="newsForm.category"
                placeholder="選擇類別"
                :filterable="true"
                value-key="id"
                class="w-100"
                >
                    <el-option
                        v-for="item in categoryOptions"
                        :value="item"
                        :key="item.id"
                        :label="item.name"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Cover" prop="cover">
                <UploadImg
                    :img="newsForm.cover"
                    :file="newsForm.file"
                    @emitImgChange="handleCoverChange"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(newsFormRef)">儲存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

import Editor from '@/components/Editor'
import UploadImg from '@/components/UploadImg'

import { adminApi } from '@/apis/admin'
import { Reminder, formErrReminder } from '@/utils/helpers'

let categoryOptions = ref([])
const clearEditor = ref(false)
const newsFormRef = ref()
const newsForm = reactive({
    title: '',
    content: '',
    category: '',
    cover: '',
    file: null,
    categoryId: '',
})
const newsFormRules = reactive({
    title: [{ required: true, message: '請輸入 Title！', trigger: 'blur' }],
    content: [{ required: true, message: '請輸入 Content！', trigger: 'blur' }],
    category: [{ required: true, message: '請選擇 Category！', trigger: 'blur' }],
    cover: [{ required: true, message: '請上傳 Cover！', trigger: 'blur' }],
})

const getCategories = async () => {
    try {
        const res = await adminApi.categories.getCategories()
        if (res) {
            categoryOptions.value = res.data.categories
        } else {
            console.error(res)
        }
    } catch(e) {
        console.error(e)
    }
}

const handleCoverChange = (file) => {
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

const handleEditorChange = (content) => {
    newsForm.content = content
}

const submitForm = async (newsFormRef) => {
    if (!newsFormRef) return
    await newsFormRef.validate((valid, fields) => {
        if (valid) {
            newsForm.categoryId = newsForm.category.id
            delete newsForm.cover
            delete newsForm.category
            const params = new FormData()
            for (let i in newsForm) {
                params.append(i, newsForm[i])
            }
            adminApi.news.postNews(params)
                .then(res => {
                    if (res.data.status === 'success') {
                        Reminder.fire({
                            icon: 'success',
                            title: res.data.msg
                        })
                        newsFormRef.resetFields()
                        clearEditor.value = true
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
                        title: err?.response?.data?.errors[0] || '發生未知錯誤，請稍後再試！'
                    })
                })
        } else {
            formErrReminder(fields)
        }
    })
}

const handleEditorClear = (value) => {
    clearEditor.value = value
}

onMounted(getCategories)
</script>