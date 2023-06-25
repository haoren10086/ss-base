<template>
  <div class="jm-preview">
    <div class="m-pdf" v-if="suffixType.IsH5Pdf">
      <div id="pdf"></div>
    </div>
    <div class="m-pdf" v-else-if="suffixType.IsPcPdf">
      <iframe
        :src="'static/pdf/web/viewer.html?file=' + pdfUrl"
        frameborder="0"
        style="width: 100%; height: 440px"
      ></iframe>
    </div>
    <div class="jm-player" id="mse" v-else-if="suffixType.IsVideo"></div>
    <img :src="imgUrl" alt="" srcset="" v-else-if="suffixType.IsImg" />
    <audio :src="audioUrl" v-else-if="suffixType.IsAudio"></audio>
    <div v-else-if="suffixType.IsWord">
      <iframe :src="officeUrl" frameborder="0" style="width: 100%; height: 440px"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, reactive, ref, onBeforeUnmount, watch, nextTick } from 'vue'
// import { props } from './props'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'

export default defineComponent({
  name: 'JmPreview',
  props: {
    config: {
      type: String,
      require: true,
    },
  },
  setup(props, { emit }) {
    const pdfh5 = ref(null)
    const videoData = reactive({
      id: 'mse',
      lang: 'zh',
      volume: 0,
      autoplay: false,
      screenShot: true,
      playbackRate: [],
      url: '',
      poster: 'https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
    })
    const player = shallowRef<Player | null>(null)
    const suffixType = reactive<{
      IsVideo: boolean
      IsPcPdf: boolean
      IsH5Pdf: boolean
      IsImg: boolean
      IsWord: boolean
      IsAudio: boolean
    }>({
      IsVideo: false,
      IsPcPdf: false,
      IsH5Pdf: false,
      IsImg: false,
      IsWord: false,
      IsAudio: false,
    })
    const wordList = ref(['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'])
    const imgList = ref(['png', 'jpg', 'gif', 'jpeg'])
    const videoList = ref(['m3u8', 'mp4'])
    const audioList = ref(['mp3', 'wav'])
    const imgUrl = ref('')
    const pdfUrl = ref('')
    const audioUrl = ref('')
    const officeUrl = ref('')
    watch(
      () => props.config,
      (newVal, oldVal) => {
        console.log(newVal, oldVal)
        const links = newVal || ''
        suffixfun(links)
      }
    )
    const initPlayer = () => {
      const { url } = videoData
      if (url && url !== '') {
        player.value = new Player(videoData)
        emit('player', player.value)
      }
    }
    const isMobile = () => {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      return flag
    }
    const readH5Pdf = () => {
      pdfh5.value = new Pdfh5('#pdf', {
        pdfurl: props.config, // 打开pdf的路径
        maxZoom: 3, // 缩放倍数
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
      })
      // 监听pdf加载完成事件，加载失败、渲染成功都会触发
      pdfh5.value.on('complete', (status: string, msg: string, time: string) => {
        console.log('状态:' + status + '，信息:' + msg + '，耗时:' + time + '毫秒')
      })
    }
    const suffixfun = (url: string): void => {
      // console.log('url', url)
      const parts = url.split('/')
      const lastPart = parts[parts.length - 1]
      const filename = decodeURIComponent(lastPart)
      const extension = filename.substring(filename.lastIndexOf('.') + 1)
      dataReset()
      judgment(extension, url)
    }
    const judgment = (extension: string, url: string): void => {
      console.log(extension, url)
      suffixType.IsImg = imgList.value.some((ele) => ele === extension)
      suffixType.IsWord = wordList.value.some((ele) => ele === extension)
      suffixType.IsVideo = videoList.value.some((ele) => ele === extension)
      suffixType.IsAudio = audioList.value.some((ele) => ele === extension)
      if (extension === 'pdf') {
        if (isMobile()) {
          suffixType.IsH5Pdf = true
          nextTick(() => {
            readH5Pdf()
          })
          return
        }
        suffixType.IsPcPdf = true
        pdfUrl.value = url
        return
      }

      if (suffixType.IsImg) {
        imgUrl.value = url
        return
      }

      if (suffixType.IsWord) {
        readWord(url)
        return
      }

      if (suffixType.IsVideo) {
        videoData.url = url
        nextTick(() => {
          initPlayer()
        })
        return
      }

      if (suffixType.IsAudio) {
        audioUrl.value = url
      }
    }
    // 阅读word文件
    const readWord = (routeUrl: string): void => {
      const url = encodeURIComponent(routeUrl)
      officeUrl.value = 'http://view.officeapps.live.com/op/view.aspx?src=' + url
      // window.open(officeUrl, '_target')
    }
    // 重置状态
    const dataReset = () => {
      Object.keys(suffixType).forEach((key) => {
        suffixType[key] = false
      })
    }

    onBeforeUnmount(() => {
      player.value?.destroy()
    })
    return {
      suffixType,
      imgUrl,
      pdfUrl,
      audioUrl,
      officeUrl,
    }
  },
})
</script>

<style lang="less">
@import './preview.less';
</style>
