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
          text: 'Method Families',
          items: [
            { text: 'Overview', link: '/topics/' },
            { text: 'Cognitive Diagnosis Models', link: '/topics/cdm' },
            { text: 'Item Response Theory', link: '/topics/irt' },
          ],
        },
        {
          text: 'Quantitative Foundations',
          items: [
            { text: 'Overview', link: '/topics/foundations/' },
            { text: 'Descriptive Statistics', link: '/topics/foundations/descriptive-statistics' },
            { text: 'Probability', link: '/topics/foundations/probability' },
            { text: 'Sampling Distributions', link: '/topics/foundations/sampling-distributions' },
            { text: 'Hypothesis Testing', link: '/topics/foundations/hypothesis-testing' },
            { text: 'P-Values', link: '/topics/foundations/p-values' },
            { text: 'Effect Sizes', link: '/topics/foundations/effect-sizes' },
            { text: 'Statistical Power', link: '/topics/foundations/statistical-power' },
            { text: 'Confidence Intervals', link: '/topics/foundations/confidence-intervals' },
            { text: 'Sign Test', link: '/topics/foundations/sign-test' },
            { text: 't Tests', link: '/topics/foundations/t-tests' },
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
