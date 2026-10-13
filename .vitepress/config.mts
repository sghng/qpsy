import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'qpsy',
  description: 'A documentation layer for quantitative psychology',
  lang: 'en-US',
  cleanUrls: true,
  srcExclude: ['README.md', 'AGENTS.md'],
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  markdown: {
    math: true,
  },
  themeConfig: {
    nav: [
      { text: 'Notation', link: '/notation' },
      { text: 'Topics', link: '/topics/' },
      { text: 'Modeling', link: '/modeling/' },
      { text: 'Research', link: '/research/' },
      { text: 'Writing', link: '/writing/' },
      { text: 'Registry', link: '/registry/' },
    ],
    sidebar: {
      '/topics/': [
        {
          text: 'Selected Topics',
          items: [
            { text: 'Overview', link: '/topics/' },
            { text: 'Cognitive Diagnosis Models', link: '/topics/cdm' },
            { text: 'Item Response Theory', link: '/topics/irt' },
          ],
        },
      ],
      '/modeling/': [
        {
          text: 'Statistical Modeling',
          items: [{ text: 'Overview', link: '/modeling/' }],
        },
      ],
      '/research/': [
        {
          text: 'Research',
          items: [
            { text: 'Overview', link: '/research/' },
            { text: 'Journals and Venues', link: '/research/venues' },
            { text: 'Peer Review', link: '/research/peer-review' },
          ],
        },
      ],
      '/writing/': [
        {
          text: 'Academic Writing',
          items: [{ text: 'Overview', link: '/writing/' }],
        },
      ],
      '/registry/': [
        {
          text: 'Registry',
          items: [{ text: 'Overview', link: '/registry/' }],
        },
      ],
    },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/sghng/qpsy' }],
  },
})
