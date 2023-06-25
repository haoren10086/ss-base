<!--
 * @Author: zc-liyongjie v-liyongjie@sinochem.com
 * @Date: 2023-06-21 15:07:46
 * @LastEditors: zc-liyongjie v-liyongjie@sinochem.com
 * @LastEditTime: 2023-06-25 18:04:31
 * @FilePath: \vue-vod-testd:\jmEdu\common\src\preview\example\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import JmPreview from '../index'
// import { AppType } from '@varlet/cli/client'
import { ref } from 'vue'

const config = ref('')
const pdflink = ref(
  'https://projects-service-1302510758.cos.ap-beijing.myqcloud.com/lvsuan/2023-06-07-06-32-49-20230606-2.6V-ForinnBase%20GroundPool%20%E5%85%A8%E9%97%AA%E5%AD%98%E5%82%A8-%E4%BA%A7%E5%93%81%E5%BD%A9%E9%A1%B5.pdf'
)
const videoLink = ref('https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4')
const viewlook = (link: string) => {
  config.value = link
}
</script>

<template>
  <jm-preview :config="config" />
  <button @click="viewlook(pdflink)">查看pdf</button>
  <button @click="viewlook('word链接')">查看文档(doc、ppt/xls)</button>
  <button @click="viewlook(videoLink)">查看视频</button>
  <button @click="viewlook('img链接')">查看图片</button>
  <button @click="viewlook('audio链接')">查看音频</button>
</template>
