import Upload from '..'
import { createApp } from 'vue'

test('test upload use', () => {
  const app = createApp({}).use(Upload)
  expect(app.component(Upload.name)).toBeTruthy()
})
