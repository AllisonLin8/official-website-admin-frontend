<template>
  <div class="w-100">
    <div class="d-flex justify-content-end align-items-center mt-0 mb-2 me-2">
      <div class="me-5 text-secondary">總字數：{{ TextLength }}</div>
      <el-popconfirm
        title="你確定要清空嗎？"
        cancel-button-text="取消"
        confirm-button-text="確定"
        @confirm="clearContent"
      >
        <template #reference>
          <el-button size="small" type="danger">清空</el-button>
        </template>
      </el-popconfirm>
    </div>
    <QuillEditor
      theme="snow" 
      class="mx-auto"
      contentType="html"
      ref="myQuillEditor"
      placeholder="寫點什麼..."
      :toolbar="toolbarOptions"
      :modules="[uploadModule, BlotFormatterModule]"
      @update:content="onEditorChange($event)"
    />
  </div>
</template>

<script setup>
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from 'quill-blot-formatter'
import { QuillEditor } from '@vueup/vue-quill'
import { ref, watch, toRaw, onMounted } from 'vue'

import { adminApi } from '@/apis/admin'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

const TextLength = ref(0)
const myQuillEditor = ref(null)
const props = defineProps({
  submitAndClearEditor: Boolean,
  content: String,
})
const emit = defineEmits(['emitOnEditorChange', 'emitOnSubmitAndEditorClear'])

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

const clearContent = async () => {
  await myQuillEditor.value.setContents('')
}

const onEditorChange = async (e) => {
  TextLength.value = await myQuillEditor.value.getText().length - 1
  emit('emitOnEditorChange', e)
}

watch(() => props.submitAndClearEditor, async (newValue) => {
  // 監聽props.clearEditor本身的變化，提交表單改成true是一次、這邊改成false是一次
  emit('emitOnSubmitAndEditorClear', false)
  await toRaw(myQuillEditor).value.setContents('')
})

onMounted(async () => {
  // 在編輯頁時，確認content存在時，才將已存在的content設置到myQuillEditor上
  props.content && await toRaw(myQuillEditor).value.setContents(props.content)
})
</script>