# 播放器

### 介绍
该组件是基于 xgplayer 封装的 Vue 组件，为了便于后续统一的封装处理，如：样式的自定义以及属性的定制。<br/>
XGPLAYER是一款带解析器、能节省流量的HTML5视频播放器。它基于所有内容组件化的原则设计了一个单独的、可拆卸的 UI 组件。在功能上它摆脱了视频加载、缓冲和格式对视频依赖的支持，它还集成了对 FLV、HLS 和 dash 的按需和实时支持。


### 基本使用
```html
<template>
  <jm-player :config="config"></jm-player>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const config = reactive({
  id: "mse",
  lang: "zh",
  volume: 0,
  autoplay: false,
  screenShot: true,
  url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4",
  poster: "https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
})
</script>
```

```vue
import Basic from '../example/basic'
```

### 播放器实例
"Player"是从组件暴露的 xgplayer 实例，您可以使用"Player"访问 xgplayer 的 API，如下所示。

```html
<template>
  <jm-player :config="config" @player="Player=$event"></jm-player>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const config = reactive({
  id: "mse",
  volume: 0,
  autoplay: false,
  url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4",
  poster: "https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
})
const Player = ref(null)
const onPause = () => {
  Player.value?.pause()
}
const onPlay = () => {
  Player.value?.play();
}
</script>

```

```vue
import Index from '../example/index'
```


### 属性

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `id` | 选择器 id | _string_ | `-` |
| `url` | 视频源 url | _string \| Object[]_ | `-` |
| `width` | 播放器宽度，传入number类型参数则播放器内部默认添加单位px，<br/>传入string类型参数则直接赋值给播放器容器width样式属性 | _Number \| String_ | `-` |
| `height` | 播放器高度，传入number类型参数则播放器内部默认添加单位px，<br/>传入string类型参数则直接赋值给播放器容器height样式属性 | _string \| Object[]_ | `-` |
| `autoplay` | 是否自动播放，不是所有场景配置了自动播放都可以成功自动起播的<br/>[具体说明请看自动播放相关知识](https://h5player.bytedance.com/guide/extends/aautoplay.html#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE) | _string \| Object[]_ | `-` |
| `volume` | 默认音量, 取值范围0 ~ 1 | _number_ | `0.6` |
| `loop` | 是否循环播放 | _boolean_ | `false` |

[查看更多属性](https://h5player.bytedance.com/config/)

### API

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `play` | 播放 | `-` |
| `pause` | 暂停 | `-` |
| `reload` | 重新加载视频 | `-` |

[查看更多API](https://h5player.bytedance.com/api/)
