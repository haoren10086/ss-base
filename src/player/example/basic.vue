<script setup>
import { reactive } from 'vue'
import JmPlayer from '../index'
// import { IPlayerOptions } from "xgplayer";

const config = reactive({
  id: 'mse',
  lang: 'zh',
  volume: 0,
  autoplay: false,
  screenShot: true,
  playbackRate: [],
  url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
  poster: 'https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
})
</script>

<template>
  <jm-player :config="config" />
</template>
