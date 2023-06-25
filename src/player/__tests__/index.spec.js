import Player from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test player plugin', () => {
  const app = createApp({}).use(Player)
  expect(app.component(Player.name)).toBeTruthy()
})
