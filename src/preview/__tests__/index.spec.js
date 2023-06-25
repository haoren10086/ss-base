import Preview from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test preview plugin', () => {
  const app = createApp({}).use(Preview)
  expect(app.component(Preview.name)).toBeTruthy()
})
