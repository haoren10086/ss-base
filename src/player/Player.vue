<template>
  <div class="jm-player" :id="config.id"></div>
</template>

<script lang="ts">
import { onMounted, watch, onBeforeUnmount, defineComponent, shallowRef, PropType } from 'vue'
import Player from 'xgplayer'
// import { props } from './props'
import 'xgplayer/dist/index.min.css'

export default defineComponent({
  name: 'JmPlayer',
  props: {
    class: [String, Object, Array] as PropType<unknown>,
    config: {
      type: Object,
      default() {
        return { id: 'mse', url: '' }
      },
    },
  },
  setup(props, { emit }) {
    const player = shallowRef<Player | null>(null)
    const initPlayer = () => {
      const { url } = props.config
      if (url && url !== '') {
        player.value = new Player(props.config)
        emit('player', player.value)
      }
    }
    watch(
      () => props.config.url,
      (url) => {
        url && initPlayer()
      },
      {
        deep: true,
      }
    )
    onMounted(() => {
      initPlayer()
    })
    onBeforeUnmount(() => {
      player.value?.destroy()
    })
  },
})
</script>

<style lang="less">
@import './Player.less';
</style>
