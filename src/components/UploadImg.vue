<template>
    <el-upload
        class="img-uploader"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="onImgChange"
    >
        <img v-if="props.img" :src="props.img" class="img" />
        <el-icon v-else class="img-uploader-icon"><Plus /></el-icon>
    </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
    img: String,
})

const emit = defineEmits(['emitImgChange'])

const onImgChange = (res) => {
    emit('emitImgChange', res.raw)
}
</script>

<style lang="scss">
.img-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.img-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
.img{
    width: 178px;
    height: 178px;
}
</style>