<template>
  <div class="upload-box-wrap" :style="`width:${width}px`">
    <section class="upload-box" @click="handleClick" @drop.prevent="onDrop" @dragover.prevent="onDragover">
      <input ref="inputRef" type="file" class="hidden" @change="handleChange" @click.stop />
      <i class="icon"></i>
      <span class="text">将文件拖到此处，或<em>点击上传</em></span>
      <!-- 进度条 -->
      <div v-if="uploadObj.uploading" class="progress">
        <div class="progress-value" :style="{ width: `${uploadObj.uploadPencent}%` }">
          {{ uploadObj.uploadPencent }}%
        </div>
      </div>
      <div v-if="uploadObj.isProcessing" class="processing">正在解析文件,请稍候...</div>
    </section>
    <div class="upload-file-list" v-if="fileName">
      <div class="list-name">{{ fileName }}</div>
      <i class="icon-success">√</i>
      <i class="icon-del">x</i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, shallowRef } from 'vue'
import SparkMD5 from 'spark-md5'
import uploadService from './api/services/uploadService'

const props = defineProps({
  // 是否使用分片上传
  useSlice: {
    type: Boolean,
    default: true,
  },
  // 默认每个切片大小1M
  sliceSize: {
    type: Number,
    default: 1024 * 1024 * 1,
  },
  // 并发池大小
  maxPoolsSize: {
    type: Number,
    default: 6,
  },
  // 宽度
  width: {
    type: String,
    default: '300',
  },
})
const upload = () => {
  return {
    isProcessing: false, // 开始切片
    uploading: false, // 上传状态
    uploadPencent: 0, // 上次进度
    fileHash: '', // 文件hash
    suffix: '', // 文件后缀名
    alreadyList: [] as string[], // 已经上传的切片
    chunkSize: 0, // 切片大小
    chunkNum: 0, // 切片数量
    successNum: 0, // 切片上传成功数量
    pools: [] as Promise<any>[], // 并发池
  }
}
const inputRef = shallowRef<HTMLInputElement>()
const fileName = ref('')
const uploadObj = reactive(upload())

const handleClick = (e: MouseEvent) => {
  console.log(e)
  if (uploadObj.isProcessing) {
    // eslint-disable-next-line no-alert
    alert('正在解析文件，请稍候')
    return
  }
  if (uploadObj.uploading) {
    // eslint-disable-next-line no-alert
    alert('正在上传文件，请稍候')
    return
  }
  inputRef.value!.value = ''
  inputRef.value!.click()
}

const handleChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files) return
  props.useSlice ? sliceUpload(files[0]) : uploadFiles(files[0])
}

// 单独上传
const uploadFiles = async (file: File) => {
  if (!file) return
  try {
    uploadObj.uploading = true
    // 限制上传文件大小
    // if (file.size > 2 * 1024 * 1024) {
    // }
    const res = await uploadService.upload(file, (progress) => {
      const { loaded, total } = progress
      uploadObj.uploadPencent = Math.round((loaded / total!) * 100)
    })
    fileName.value = res.data.originalFilename
    console.log('res', res)
  } finally {
    uploadObj.uploading = false
  }
}

// 分片上传
const sliceUpload = async (file: File) => {
  uploadObj.isProcessing = true
  uploadObj.suffix = /\.([\w]+)$/.exec(file.name)![1]
  uploadObj.fileHash = await getFileHash(file)
  uploadObj.chunkSize = props.sliceSize
  uploadObj.chunkNum = Math.ceil(file.size / uploadObj.chunkSize)
  // 检测文件是否存在
  const res = await uploadService.uploadAlready(uploadObj.fileHash)
  if (res.success) {
    uploadObj.alreadyList = res.data.fileList
  }
  const chunks = createChunks(file)
  uploadObj.isProcessing = false
  uploadObj.uploading = true
  await uploadChunks(chunks)
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const files = e.dataTransfer?.files
  if (!files || files.length === 0) return
  props.useSlice ? sliceUpload(files[0]) : uploadFiles(files[0])
}

const onDragover = (e: DragEvent) => {
  e.preventDefault()
}

// 创建分片
const createChunks = (file: File) => {
  const chunks = Array.from({ length: uploadObj.chunkNum }, (_: unknown, index: number) => {
    return {
      file: file.slice(index * uploadObj.chunkSize, (index + 1) * uploadObj.chunkSize),
      filename: `${uploadObj.fileHash}_${index + 1}.${uploadObj.suffix}`,
    }
  })
  return chunks
}

// 一个切片上传完成后执行的方法
const chunkUploadComplete = async () => {
  uploadObj.successNum++
  console.log(uploadObj.successNum)
  uploadObj.uploadPencent = Math.round((uploadObj.successNum / uploadObj.chunkNum) * 100)

  if (uploadObj.successNum < uploadObj.chunkNum) return
  // 全部切片上传完成
  uploadObj.uploadPencent = 100
  try {
    // 执行合并api
    const res = await uploadService.uploadMerge(uploadObj.fileHash, uploadObj.chunkNum)
    console.log('res', res)
    res.success && (fileName.value = res.data.originalFilename)
  } catch (e) {
    console.log('文件合并失败')
  } finally {
    reset()
  }
}

// 上传所有切片
const uploadChunks = async (chunks: any[]) => {
  for (let index = 0; index < chunks.length; index++) {
    const chunkItem = chunks[index]
    // 已经上传过的
    if (uploadObj.alreadyList.length > 0 && uploadObj.alreadyList.includes(chunkItem.filename)) {
      chunkUploadComplete()
      return
    }
    const formData = new FormData()
    formData.append('file', chunkItem.file)
    formData.append('filename', chunkItem.filename)
    const task = uploadService.uploadChunk(formData)
    uploadObj.pools.push(task)
    task
      .then((res) => {
        if (res.success) {
          chunkUploadComplete()
        }
        // 执行完成,从池中移除
        const item = uploadObj.pools.findIndex((x) => x === task)
        uploadObj.pools.splice(item)
      })
      .catch(() => {
        console.log('单个切片上传失败')
      })

    if (uploadObj.pools.length >= props.maxPoolsSize) {
      // 等待并发池执行完一个任务后
      await Promise.race(uploadObj.pools)
    }
  }
}

// 获取文件hash值
const getFileHash = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = (ev) => {
      const buffer = ev.target?.result
      const hash = new SparkMD5.ArrayBuffer().append(buffer! as ArrayBuffer).end()
      resolve(hash)
    }
  })
}

// 重置参数
const reset = () => {
  Object.assign(uploadObj, upload())
}
</script>

<style lang="less">
@import './upload.less';
</style>
