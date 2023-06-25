/*
 * @Author: zc-liyongjie v-liyongjie@sinochem.com
 * @Date: 2023-06-21 15:06:53
 * @LastEditors: zc-liyongjie v-liyongjie@sinochem.com
 * @LastEditTime: 2023-06-21 15:53:45
 * @FilePath: \vue-vod-testd:\jmEdu\common\varlet.config.mjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from '@varlet/cli'

export default defineConfig({
  logo: './logo.svg',
  useMobile: false,
  name: 'common',
  title: 'CommonUI',
  namespace: 'jm',
  pc: {
    header: {
      darkMode: null,
      i18n: null,
      playground: null,
    },
    menu: [
      {
        text: {
          'zh-CN': '开发指南',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '基本介绍',
        },
        doc: 'home',
        type: 3,
      },
      {
        text: {
          'zh-CN': '基础组件',
        },
        type: 1,
      },
      // {
      //   text: {
      //     'zh-CN': 'Button 按钮',
      //   },
      //   doc: 'button',
      //   type: 2,
      // },
      {
        text: {
          'zh-CN': 'Player 播放器',
        },
        doc: 'player',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Upload 上传(简易版)',
        },
        doc: 'upload',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Preview 文件预览',
        },
        doc: 'preview',
        type: 2,
      },
    ],
  },
  mobile: {
    header: {
      i18n: null,
      darkMode: null,
    },
  }
})
