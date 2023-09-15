<template>
    <el-card :size="20" class="container mt-3 mx-auto mt-4">
        <el-page-header icon="null" title="產品管理" class="mt-3 mb-5">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加產品 </span>
            </template>
        </el-page-header>
        <el-form
            status-icon
            ref="productFormRef"
            label-width="120px"
            label-position="top"
            :model="productForm"
            :rules="productFormRules"
        >
            <el-form-item label="Title" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="Subtitle" prop="subtitle">
                <el-input v-model="productForm.subtitle" />
            </el-form-item>
            <el-form-item label="Variety" prop="variety">
                <el-select
                    class="w-100"
                    value-key="id"
                    placeholder="選擇類別"
                    v-model="productForm.variety"
                    :filterable="true"
                >
                    <el-option
                        v-for="item in varietyOptions"
                        :value="item"
                        :key="item.id"
                        :label="item.name"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Desc" prop="desc">
                <el-input v-model="productForm.desc" type="textarea" />
            </el-form-item>
            <el-form-item label="Cover" prop="cover">
                <UploadImg
                    :img="productForm.cover"
                    :file="productForm.file"
                    @emitImgChange="handleCoverChange"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(productFormRef)">儲存</el-button>
                <el-button @click="resetForm(productFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

import UploadImg from '@/components/UploadImg'

import { adminApi } from '@/apis/admin'
import { Reminder, formErrReminder } from '@/utils/helpers'

const varietyOptions = ref([])

const productFormRef = ref()
const productForm = reactive({
    title: '',
    subtitle: '',
    variety: '',
    desc: '',
    cover: '',
    file: null,
    varietyId: '',
})
const productFormRules = reactive({
    title: [{ required: true, message: '請輸入 Title！', trigger: 'blur' }],
    variety: [{ required: true, message: '請選擇 Variety！', trigger: 'blur' }],
    desc: [{ required: true, message: '請輸入 Desc！', trigger: 'blur' }],
    cover: [{ required: true, message: '請上傳 Cover！', trigger: 'blur' }],
})

const getVarieties = async () => {
    try {
        const res = await adminApi.varieties.getVarieties()
        if (res.data.status === 'success') return Object.assign(varietyOptions.value, res.data.varieties)
    } catch(error) {
        console.error(error)
    }
}

const handleCoverChange = async (file) => {
    productForm.cover = URL.createObjectURL(file)
    productForm.file = await file
}

const resetForm = async (productFormRef) => {
    if (!productFormRef) return
    await productFormRef.resetFields()
}

const submitForm = async (productFormRef) => {
    try {
        if (!productFormRef) return
        await productFormRef.validate(async (valid, fields) => {
            if (valid) {
                productForm.varietyId = productForm.variety.id
                const params = new FormData()
                for (let i in productForm) {
                    params.append(i, productForm[i])
                }
                try {
                    const res = await adminApi.products.postProduct(params)
                    if (res.data.status === 'success') {
                        Reminder.fire({ icon: 'success', title: res.data.msg })
                        productFormRef.resetFields()
                    } else {
                        return Reminder.fire({ icon: 'warning', title: res.data.msg || '發生未知錯誤，請稍後再試！' })
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

onMounted(() => {
    getVarieties()
})
</script>