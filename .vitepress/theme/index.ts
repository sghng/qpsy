import DefaultTheme from 'vitepress/theme'
import RegistryTable from './RegistryTable.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('RegistryTable', RegistryTable)
  },
}
