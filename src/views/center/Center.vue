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
                        <h3 class="fw-bold fs-1">{{ $store.state.userInfo.name }}</h3>
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
                        >
                            <el-form-item label="Name" prop="name">
                                <el-input v-model="userForm.name" />
                            </el-form-item>
                            
                            <el-form-item label="Intro" prop="intro">
                                <el-input v-model="userForm.intro" type="textarea" />
                            </el-form-item>
                            
                            <el-form-item label="Avatar" prop="avatar">
                                <!-- <el-input v-model="userForm.avatar" /> -->
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                >
                                    <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                                </el-upload>
                            </el-form-item>
                            
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
    </div>
</template>
<script setup>
import store from '@/store'
import { computed, ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const userAvatar = store.state.userInfo.avatar
const circleAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const avatarUrl = computed(() => userAvatar ? userAvatar : circleAvatar)

const { name, intro, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    name,
    intro,
    avatar,
})

const userFormRules = reactive({
    name: [
        { required: true, message: '請輸入名稱！', trigger: 'blur' },
        { min: 1, max: 20, message: '名稱長度需介於1至20字', trigger: 'blur' },
    ],
})

</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>