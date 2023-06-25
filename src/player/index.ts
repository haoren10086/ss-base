// Component entry, the folder where the file exists will be exposed to the user
import Player from './Player.vue'
import type { App } from 'vue'

Player.install = function (app: App) {
  app.component(Player.name, Player)
}

export const _PlayerComponent = Player

export default Player
