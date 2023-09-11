<template>
  <div class="w-100">
    <div class="d-flex justify-content-end align-items-center mt-0 mb-2 me-2">
      <div class="me-5 text-secondary">總字數：{{ TextLength }}</div>
      <el-popconfirm
        title="你確定要清空嗎？"
        confirm-button-text="確定"
        cancel-button-text="取消"
        @confirm="resetContent"
      >
        <template #reference>
          <el-button size="small" type="danger">清空</el-button>
        </template>
      </el-popconfirm>
    </div>
    <QuillEditor
      ref="myQuillEditor"
      placeholder="寫點什麼..."
      theme="snow" 
      class="mx-auto"
      contentType="html"
      :toolbar="toolbarOptions"
      :modules="[uploadModule, BlotFormatterModule]"
      @update:content="onEditorChange($event)"
    />
  </div>
</template>

<script setup>
import { ref, watch, toRaw } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from 'quill-blot-formatter'

import { adminApi } from '@/apis/admin'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const TextLength = ref(0)
const myQuillEditor = ref(null)
const emit = defineEmits(['emitOnEditorChange', 'emitOnEditorClear'])

const props = defineProps({
  clearEditor: Boolean,
})

const toolbarOptions = [
    // 粗體 斜體 底線 刪除線 -----['bold', 'italic', 'underline', 'strike']
    ['bold', 'italic', 'underline', 'strike'],
    // 引用  代碼塊-----['blockquote', 'code-block']
    ['blockquote', 'code-block'],
    // 1、2 級標題-----[{ header: 1 }, { header: 2 }]
    [{ header: 1 }, { header: 2 }],
    // 有序、無序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{ list: 'ordered' }, { list: 'bullet' }],
    // 上標/下標-----[{ script: 'sub' }, { script: 'super' }]
    [{ script: 'sub' }, { script: 'super' }],
    // 縮排-----[{ indent: '-1' }, { indent: '+1' }]
    [{ indent: '-1' }, { indent: '+1' }],
    // 文本方向-----[{'direction': 'rtl'}]
    [{ direction: 'rtl' }],
    // 字體大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{ size: ['small', false, 'large', 'huge'] }],
    // 標題-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // 字體顏色、字體背景顏色-----[{ color: [] }, { background: [] }]
    [{ color: [] }, { background: [] }],
    // 字體種類-----[{ font: [] }]
    [{ font: [] }],
    // 對齊方式-----[{ align: [] }]
    [{ align: [] }],
    // 清除文本格式-----['clean']
    ['clean'],
    // 連結、圖片、視頻-----['link', 'image', 'video']
    ['link', 'image'],
    // ['table'] // 表格
]

const uploadModule = ref({
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: file => {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append("file", file)
        adminApi.news.upload(formData)
          .then(res => {
            resolve(res.data.imgUrl)
          })
          .catch(err => {
            reject("Upload failed")
            console.error("Error:", err)
          })
      })
    }
  }
})

const BlotFormatterModule = ref({
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {/* options */}
})

const resetContent = () => {
  myQuillEditor.value.setContents('')
}

const onEditorChange = (e) => {
  TextLength.value = myQuillEditor.value.getText().length - 1
  emit('emitOnEditorChange', e)
}

watch(() => props.clearEditor, async (newValue) => {
  // 監聽props.clearEditor本身的變化，提交表單改成true是一次、這邊改成false是一次
  emit('emitOnEditorClear', false)
  await toRaw(myQuillEditor).value.setContents('')
}, { deep: true })
</script>