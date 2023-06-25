import type { App } from 'vue'
import Upload from './Upload.vue'

Upload.install = function (app: App) {
  app.component(Upload.name, Upload)
}

export const _UploadComponent = Upload

export default Upload
