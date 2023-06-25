import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

export * from './basicComponent'
export * from './button'

declare module 'vue' {
  export interface GlobalComponents {
    JmBasicComponent: typeof import('common')['_BasicComponentComponent']
    JmButton: typeof import('common')['_ButtonComponent']
  }

  export interface ComponentCustomProperties {
    
  }
}
