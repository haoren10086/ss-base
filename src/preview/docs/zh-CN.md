# 文档预览

### 介绍
改组件是基于视频预览使用的是xgplayer，pdf的预览使用的是pdfh5.js，文档预览使用的是http://view.officeapps.live.com/op/view.aspx对doc、ppt、xlsx进行预览，img标签对图片进行预览

### 基本使用
```html
<script setup lang="ts">
import JmPreview from '../index'
// import { AppType } from '@varlet/cli/client'
import {ref} from 'vue'
const config =ref('');
const viewlook=(link:string)=>{
  config.value= link;
}
</script>

<template>
  <jm-preview :config="config" />
</template>
```

### 文档预览组件实例
```html
<script setup lang="ts">
import JmPreview from '../index'
// import { AppType } from '@varlet/cli/client'
import {ref} from 'vue'
const config =ref('');
const viewlook=(link:string)=>{
  config.value= link;
}
</script>

<template>
  <jm-preview :config="config" />
  <button @click="viewlook('pdf链接')">查看pdf</button>
  <button @click="viewlook('word链接')">查看文档(doc、ppt/xls)</button>
  <button @click="viewlook('video链接')">查看视频</button>
  <button @click="viewlook('img链接')">查看图片</button>
  <button @click="viewlook('audio链接')">查看图片</button>
</template>
```
```vue
import Index from '../example/index'
```