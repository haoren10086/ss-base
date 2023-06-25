### 介绍

前端文件上传和大文件切片上传（暂时不支持文件预览）


### 基本使用
```html
<template>
  <jm-upload 
    :useSlice="true"
    @click="handleClick"
    @drop.prevent="onDrop"></jm-upload>
</template>

<script setup lang="ts">
  const handleClick = (e: MouseEvent) => {
    console.log(e)
  }
  const onDrop = (e: DragEvent) => {
    console.log(e)
  }
</script>
```

```vue
import BasicUse from '../example/BasicUse'
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `useSlice` | 是否切片上传 | boolean | `false` |
| `sliceSize` | 切片大小 | Number | `1024*1024*1` |
| `width` | 组件宽度 | String | `300` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击组件时触发 | `event: Event` |
| `drop` | 文件拖动到组件中触发 | `event: Event` |