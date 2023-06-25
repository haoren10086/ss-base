<script setup>
import { shallowRef, reactive } from 'vue'
import JmPlayer from '../index'
// import { IPlayerOptions } from "xgplayer";

const config = reactive({
  id: 'mse2',
  lang: 'zh',
  volume: 0,
  autoplay: false,
  playbackRate: [],
  url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
  poster: 'https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
})

const Player = shallowRef(null)

const onPause = () => {
  Player.value?.pause()
}

const onPlay = () => {
  Player.value?.play()
}
</script>

<template>
  <jm-player :config="config" @player="Player = $event" />
  <div style="margin-top: 15px">
    <button @click="onPlay" style="margin-right: 20px">PLay</button>
    <button @click="onPause">Pause</button>
  </div>
</template>
