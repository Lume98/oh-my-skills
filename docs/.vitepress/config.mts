import { defineConfig } from 'vitepress'
import skills from './skills.json'

const sidebarItems = skills.map(s => ({
  text: s.name,
  link: `/skills/${s.name}`,
}))

export default defineConfig({
  title: 'Oh My Skills',
  description: 'Claude Code Skills 集合',
  lang: 'zh-CN',
  base: '/oh-my-skills/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Skills', link: '/skills/' },
    ],
    sidebar: {
      '/skills/': [
        {
          text: 'Skills',
          items: sidebarItems,
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lume98/oh-my-skills' },
    ],
    footer: {
      message: 'Built with VitePress',
    },
  },
})
