<template>
  <el-card :size="20" class="container mt-3 mx-auto mt-4">
    <el-page-header title="新聞清單" class="mt-3 mb-5" @back="handleBack">
      <template #content>
        <span class="text-large font-600 mr-3">編輯新聞</span>
      </template>
    </el-page-header>
    <el-form
      status-icon
      ref="newsFormRef"
      label-width="120px"
      label-position="top"
      :model="newsForm"
      :rules="newsFormRules"
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="Content" prop="content">
        <Editor
          v-if="newsForm.content"
          :submitAndClearEditor="submitAndClearEditor"
          :content="newsForm.content"
          @emitOnSubmitAndEditorClear="handleSubmitAndEditorClear"
          @emitOnEditorChange="handleEditorChange"
        />
      </el-form-item>
      <el-form-item label="Category" prop="category">
        <el-select
          class="w-100"
          value-key="id"
          placeholder="選擇類別"
          v-model="newsForm.category"
          :filterable="true"
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
import { useRoute, useRouter } from 'vue-router'

import Editor from '@/components/Editor'
import UploadImg from '@/components/UploadImg'

import { adminApi } from '@/apis/admin'
import { Reminder, formErrReminder } from '@/utils/helpers'

const route = useRoute()
const router = useRouter()
const submitAndClearEditor = ref(false)
const categoryOptions = ref([])

const newsFormRef = ref()
const newsForm = reactive({
  id: '',
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

const getNews = async (id, isDateFormatted) => {
  try {
    const res = await adminApi.news.getNews(id, isDateFormatted)
    if (res.data.status === 'success') return Object.assign(newsForm, res.data.news)
    return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
  } catch (error) {
    return Reminder.fire({ icon: 'warning', title: '發生未知錯誤，請稍後再試！' })
  }
}

const getCategories = async () => {
  try {
    const res = await adminApi.categories.getCategories()
    if (res.data.status === 'success') return Object.assign(categoryOptions.value, res.data.categories)
  } catch(error) {
    return console.error(e)
  }
}

const handleCoverChange = async (file) => {
  newsForm.cover = URL.createObjectURL(file)
  newsForm.file = await file
}

const handleEditorChange = async (content) => {
  newsForm.content = await content
}

const submitForm = async (newsFormRef) => {
  try {
    if (!newsFormRef) return
    await newsFormRef.validate(async (valid, fields) => {
      if (valid) {
        if (newsForm.category.id) {
          newsForm.categoryId = newsForm.category.id // 使用者有挑選值的情況下
        } else {
          // newsForm.categoryId 等於哪個值要跟options裡核對 → 如：category: "通知公告"
          const foundObj = categoryOptions.value.find(obj => Object.values(obj).includes(newsForm.category))
          newsForm.categoryId = foundObj.id
        }
        delete newsForm.updatedAt
        const params = new FormData()
        for (let i in newsForm) {
          params.append(i, newsForm[i])
        }
        try {
          const res = await adminApi.news.putNews(newsForm.id, params)
          if (res.data.status === 'success') {
            Reminder.fire({ icon: 'success', title: res.data.msg })
            return router.push('/news-manage/newslist')
          } else {
            return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
          }
        } catch (error) {
          return Reminder.fire({ icon: 'warning', title: error?.response?.data?.errors[0] || '發生未知錯誤，請稍後再試！' })
        }
      } else {
        return formErrReminder(fields)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const handleSubmitAndEditorClear = async (value) => {
  submitAndClearEditor.value = await value
}

const handleBack = () => {
  router.back()
}

onMounted(() => {
  getCategories()
  getNews(route.params.id, false)
})
</script>