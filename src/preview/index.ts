// Component entry, the folder where the file exists will be exposed to the user
import Preview from './Preview.vue'
import type { App } from 'vue'

Preview.install = function (app: App) {
  app.component(Preview.name, Preview)
}

export const _PreviewComponent = Preview

export default Preview
